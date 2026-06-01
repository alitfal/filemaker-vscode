import * as vscode from 'vscode';
import { FMSchema } from './fmDataApi';

export class FMCompletionProvider implements vscode.CompletionItemProvider {
    private getSchema: () => FMSchema | null;

    constructor(getSchema: () => FMSchema | null) {
        this.getSchema = getSchema;
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.CompletionItem[] {
        const schema = this.getSchema();
        if (!schema) return [];

        const lineText = document.lineAt(position).text;
        const textBefore = lineText.substring(0, position.character);

        // ── Table::Field completion ───────────────────────────────────────
        // Triggered when user types :: after a table name
        const tableFieldMatch = textBefore.match(/(\w+)::(\w*)$/);
        if (tableFieldMatch) {
            const tableName = tableFieldMatch[1];
            const fields = schema.fields[tableName];
            if (fields) {
                return fields.map(field => {
                    const item = new vscode.CompletionItem(field, vscode.CompletionItemKind.Field);
                    item.detail = `${tableName}::${field}`;
                    item.documentation = new vscode.MarkdownString(`**Field** in table \`${tableName}\``);
                    item.sortText = '0' + field; // Sort fields first
                    return item;
                });
            }
        }

        // ── Table name completion ─────────────────────────────────────────
        // Suggest table names that can be followed by ::
        const wordMatch = textBefore.match(/(\w+)$/);
        if (wordMatch && !textBefore.endsWith('::')) {
            const partial = wordMatch[1].toLowerCase();
            const tableItems = schema.tables
                .filter(t => t.toLowerCase().startsWith(partial))
                .map(table => {
                    const item = new vscode.CompletionItem(table + '::', vscode.CompletionItemKind.Class);
                    item.detail = `Table: ${table}`;
                    item.documentation = new vscode.MarkdownString(
                        `**Table** \`${table}\`\n\nFields: ${(schema.fields[table] || []).slice(0, 5).join(', ')}${(schema.fields[table] || []).length > 5 ? '...' : ''}`
                    );
                    item.insertText = table + '::';
                    item.command = { command: 'editor.action.triggerSuggest', title: 'Trigger field suggestions' };
                    item.sortText = '1' + table;
                    return item;
                });

            // ── Layout name completion ────────────────────────────────────
            // Suggest layouts after "Go to Layout", "New Window", etc.
            const layoutTriggers = [
                /Go to Layout\s*\[\s*"(\w*)$/i,
                /Using layout:\s*"(\w*)$/i,
                /New Window\s*\[.*Using layout:\s*"(\w*)$/i,
            ];

            for (const trigger of layoutTriggers) {
                const match = textBefore.match(trigger);
                if (match) {
                    return schema.layouts.map(layout => {
                        const item = new vscode.CompletionItem(layout, vscode.CompletionItemKind.Module);
                        item.detail = `Layout: ${layout}`;
                        item.documentation = new vscode.MarkdownString(`**Layout** \`${layout}\``);
                        item.sortText = '0' + layout;
                        return item;
                    });
                }
            }

            // ── Script name completion ────────────────────────────────────
            // Suggest scripts after "Perform Script", "Perform Script On Server"
            const scriptTriggers = [
                /Perform Script\s*\[\s*"(\w*)$/i,
                /Perform Script On Server\s*\[\s*"(\w*)$/i,
                /Install OnTimer Script\s*\[\s*"(\w*)$/i,
            ];

            for (const trigger of scriptTriggers) {
                const match = textBefore.match(trigger);
                if (match) {
                    return schema.scripts.map(script => {
                        const item = new vscode.CompletionItem(script, vscode.CompletionItemKind.Function);
                        item.detail = `Script: ${script}`;
                        item.documentation = new vscode.MarkdownString(`**Script** \`${script}\``);
                        item.sortText = '0' + script;
                        return item;
                    });
                }
            }

            return tableItems;
        }

        return [];
    }
}
