import * as vscode from 'vscode';
import { FMConnection, FMCredentials, FMDataApiClient, FMSchema } from './fmDataApi';

export class FMConnectionManager {
    private context: vscode.ExtensionContext;
    private schema: FMSchema | null = null;
    private activeConnection: FMConnection | null = null;
    private statusBar: vscode.StatusBarItem;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBar.command = 'filemaker.switchConnection';
        this.updateStatusBar();
        this.statusBar.show();
        context.subscriptions.push(this.statusBar);
    }

    private updateStatusBar() {
        if (this.activeConnection && this.schema) {
            this.statusBar.text = `$(database) FM: ${this.activeConnection.name}`;
            this.statusBar.tooltip = `Connected to ${this.activeConnection.database} on ${this.activeConnection.server}\nClick to switch connection`;
            this.statusBar.backgroundColor = undefined;
        } else if (this.activeConnection) {
            this.statusBar.text = `$(sync~spin) FM: Connecting...`;
            this.statusBar.tooltip = 'Fetching FileMaker schema...';
        } else {
            this.statusBar.text = `$(database) FM: Not connected`;
            this.statusBar.tooltip = 'Click to connect to FileMaker Server';
            this.statusBar.command = 'filemaker.connect';
        }
    }

    async connect(): Promise<void> {
        // Get existing connections from config
        const config = vscode.workspace.getConfiguration('filemaker');
        const connections: FMConnection[] = config.get('connections') || [];

        // Ask for connection name
        const name = await vscode.window.showInputBox({
            prompt: 'Connection profile name (e.g. "dev", "production")',
            placeHolder: 'dev',
            value: 'dev'
        });
        if (!name) return;

        // Ask for server URL
        const server = await vscode.window.showInputBox({
            prompt: 'FileMaker Server URL',
            placeHolder: 'https://myserver.com',
        });
        if (!server) return;

        // Ask for database name
        const database = await vscode.window.showInputBox({
            prompt: 'Database name',
            placeHolder: 'MyDatabase',
        });
        if (!database) return;

        // Ask for username
        const username = await vscode.window.showInputBox({
            prompt: 'FileMaker username',
            placeHolder: 'admin',
        });
        if (!username) return;

        // Ask for password (stored in SecretStorage)
        const password = await vscode.window.showInputBox({
            prompt: 'FileMaker password',
            password: true,
        });
        if (!password) return;

        const connection: FMConnection = { name, server, database };

        // Save credentials securely
        await this.context.secrets.store(`filemaker.${name}.username`, username);
        await this.context.secrets.store(`filemaker.${name}.password`, password);

        // Save connection config (no credentials)
        const existing = connections.filter(c => c.name !== name);
        existing.push(connection);
        await config.update('connections', existing, vscode.ConfigurationTarget.Global);
        await config.update('activeConnection', name, vscode.ConfigurationTarget.Global);

        // Connect and fetch schema
        await this.activateConnection(connection, { username, password });
    }

    async switchConnection(): Promise<void> {
        const config = vscode.workspace.getConfiguration('filemaker');
        const connections: FMConnection[] = config.get('connections') || [];

        if (connections.length === 0) {
            const action = await vscode.window.showInformationMessage(
                'No connections configured.',
                'Add Connection'
            );
            if (action === 'Add Connection') await this.connect();
            return;
        }

        const items = connections.map(c => ({
            label: c.name,
            description: `${c.database} @ ${c.server}`,
            connection: c
        }));

        items.push({
            label: '$(add) Add new connection',
            description: '',
            connection: null as any
        });

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a FileMaker connection'
        });

        if (!selected) return;
        if (!selected.connection) {
            await this.connect();
            return;
        }

        const username = await this.context.secrets.get(`filemaker.${selected.connection.name}.username`);
        const password = await this.context.secrets.get(`filemaker.${selected.connection.name}.password`);

        if (!username || !password) {
            vscode.window.showErrorMessage(`No credentials found for "${selected.connection.name}". Please reconnect.`);
            return;
        }

        await config.update('activeConnection', selected.connection.name, vscode.ConfigurationTarget.Global);
        await this.activateConnection(selected.connection, { username, password });
    }

    async refreshSchema(): Promise<void> {
        if (!this.activeConnection) {
            vscode.window.showWarningMessage('No active FileMaker connection. Use "FileMaker: Connect to Server" first.');
            return;
        }

        const username = await this.context.secrets.get(`filemaker.${this.activeConnection.name}.username`);
        const password = await this.context.secrets.get(`filemaker.${this.activeConnection.name}.password`);

        if (!username || !password) {
            vscode.window.showErrorMessage('Credentials not found. Please reconnect.');
            return;
        }

        await this.activateConnection(this.activeConnection, { username, password });
    }

    async disconnect(): Promise<void> {
        this.activeConnection = null;
        this.schema = null;
        this.updateStatusBar();
        vscode.window.showInformationMessage('FileMaker: Disconnected.');
    }

    private async activateConnection(connection: FMConnection, credentials: FMCredentials): Promise<void> {
        this.activeConnection = connection;
        this.schema = null;
        this.updateStatusBar();

        const client = new FMDataApiClient(connection, credentials);

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `FileMaker: Connecting to ${connection.database}...`,
            cancellable: false
        }, async (progress) => {
            progress.report({ message: 'Logging in...' });
            const loggedIn = await client.login();

            if (!loggedIn) {
                vscode.window.showErrorMessage(`FileMaker: Could not connect to "${connection.name}". Check your credentials and server URL.`);
                this.activeConnection = null;
                this.updateStatusBar();
                return;
            }

            progress.report({ message: 'Fetching schema...', increment: 20 });
            this.schema = await client.buildSchema();
            await client.logout();

            this.updateStatusBar();

            vscode.window.showInformationMessage(
                `FileMaker: Connected to "${connection.database}" — ${this.schema.tables.length} tables, ${this.schema.layouts.length} layouts, ${this.schema.scripts.length} scripts.`
            );
        });
    }

    getSchema(): FMSchema | null {
        return this.schema;
    }

    getActiveConnection(): FMConnection | null {
        return this.activeConnection;
    }

    showStatus(): void {
        if (!this.activeConnection || !this.schema) {
            vscode.window.showInformationMessage('FileMaker Dev Tools: Not connected to any server.');
            return;
        }
        vscode.window.showInformationMessage(
            `Connected: ${this.activeConnection.database} @ ${this.activeConnection.server} | ` +
            `${this.schema.tables.length} tables · ${this.schema.layouts.length} layouts · ${this.schema.scripts.length} scripts | ` +
            `Last updated: ${this.schema.lastUpdated.toLocaleTimeString()}`
        );
    }
}
