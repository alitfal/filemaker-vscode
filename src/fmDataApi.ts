import * as vscode from 'vscode';
import * as https from 'https';
import * as http from 'http';

// ── Types ─────────────────────────────────────────────────────────────────
export interface FMConnection {
    name: string;
    server: string;
    database: string;
}

export interface FMSchema {
    tables: string[];
    fields: Record<string, string[]>;  // table -> fields
    layouts: string[];
    scripts: string[];
    lastUpdated: Date;
}

export interface FMCredentials {
    username: string;
    password: string;
}

// ── FileMaker Data API client ─────────────────────────────────────────────
export class FMDataApiClient {
    private token: string | null = null;
    private connection: FMConnection;
    private credentials: FMCredentials;

    constructor(connection: FMConnection, credentials: FMCredentials) {
        this.connection = connection;
        this.credentials = credentials;
    }

    private async request(method: string, path: string, body?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = new URL(path, this.connection.server);
            const isHttps = url.protocol === 'https:';
            const lib = isHttps ? https : http;

            const bodyStr = body ? JSON.stringify(body) : '';
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`;
            } else {
                const creds = Buffer.from(`${this.credentials.username}:${this.credentials.password}`).toString('base64');
                headers['Authorization'] = `Basic ${creds}`;
            }

            if (bodyStr) {
                headers['Content-Length'] = String(Buffer.byteLength(bodyStr));
            }

            const options = {
                hostname: url.hostname,
                port: url.port || (isHttps ? 443 : 80),
                path: url.pathname + url.search,
                method,
                headers,
                rejectUnauthorized: false  // Allow self-signed certs
            };

            const req = lib.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch {
                        reject(new Error(`Invalid JSON response: ${data}`));
                    }
                });
            });

            req.on('error', reject);
            if (bodyStr) req.write(bodyStr);
            req.end();
        });
    }

    async login(): Promise<boolean> {
        try {
            const db = encodeURIComponent(this.connection.database);
            const result = await this.request(
                'POST',
                `/fmi/data/v2/databases/${db}/sessions`,
                {}
            );
            if (result.response?.token) {
                this.token = result.response.token;
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    async logout(): Promise<void> {
        if (!this.token) return;
        try {
            const db = encodeURIComponent(this.connection.database);
            await this.request('DELETE', `/fmi/data/v2/databases/${db}/sessions/${this.token}`);
            this.token = null;
        } catch {}
    }

    async getLayouts(): Promise<string[]> {
        try {
            const db = encodeURIComponent(this.connection.database);
            const result = await this.request('GET', `/fmi/data/v2/databases/${db}/layouts`);
            return (result.response?.layouts || []).map((l: any) => l.name);
        } catch {
            return [];
        }
    }

    async getLayoutMetadata(layoutName: string): Promise<{ fields: any[], tableOccurrence: string }> {
        try {
            const db = encodeURIComponent(this.connection.database);
            const layout = encodeURIComponent(layoutName);
            const result = await this.request('GET', `/fmi/data/v2/databases/${db}/layouts/${layout}`);
            return {
                fields: result.response?.fieldMetaData || [],
                tableOccurrence: result.response?.metaData?.table || layoutName
            };
        } catch {
            return { fields: [], tableOccurrence: layoutName };
        }
    }

    async getScripts(): Promise<string[]> {
        try {
            const db = encodeURIComponent(this.connection.database);
            const result = await this.request('GET', `/fmi/data/v2/databases/${db}/scripts`);
            return (result.response?.scripts || []).map((s: any) => s.name);
        } catch {
            return [];
        }
    }

    async buildSchema(): Promise<FMSchema> {
        const schema: FMSchema = {
            tables: [],
            fields: {},
            layouts: [],
            scripts: [],
            lastUpdated: new Date()
        };

        // Get layouts
        const layouts = await this.getLayouts();
        schema.layouts = layouts;

        // Get fields from each layout
        const tablesSeen = new Set<string>();
        for (const layout of layouts) {
            const meta = await this.getLayoutMetadata(layout);
            const table = meta.tableOccurrence;

            if (!tablesSeen.has(table)) {
                tablesSeen.add(table);
                schema.tables.push(table);
                schema.fields[table] = [];
            }

            for (const field of meta.fields) {
                const fieldName = field.name;
                if (fieldName && !schema.fields[table].includes(fieldName)) {
                    schema.fields[table].push(fieldName);
                }
            }
        }

        // Get scripts
        schema.scripts = await this.getScripts();

        return schema;
    }
}
