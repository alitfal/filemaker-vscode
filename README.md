# FileMaker Dev Tools

> The most complete Visual Studio Code extension for **FileMaker / Claris Pro** development.
> Full coverage through **FileMaker 2026 (v26)** — functions, script steps, Get() params, AI, hover docs, live schema autocomplete and more.

[![Version](https://img.shields.io/badge/version-2.4.2-purple)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

---

![FileMaker Dev Tools Screenshot](resources/screenshot-dracula.png)

---

## ✨ Features

### 🎨 Category-based Syntax Highlighting
Colors differentiated by element type — works out of the box with the included **FileMaker Dark** theme, or configurable for any theme.

| Element | Color (FileMaker Dark) |
|---------|----------------------|
| Built-in functions | 🟣 Purple |
| AI / Embeddings / RAG functions | 🩷 Pink bold |
| JSON functions | 🔵 Cyan bold |
| Cryptography functions | 🟠 Orange bold |
| Date / Time functions | 🟢 Green |
| Aggregate functions | 🟡 Yellow bold |
| Local variables `$var` | 🟡 Yellow |
| Global variables `$$var` | 🟠 Orange bold |
| Table name `Table::` | 🟢 Green |
| Field name `::Field` | ⬜ White |
| Control flow `If` / `Else If` / `End If` / `Loop` / `End Loop` | 🩷 Pink bold |
| Script steps | 🔵 Cyan |
| Strings | 🟡 Yellow |
| Comments `#` and `//` | ⚫ Grey italic |

### 🔌 Live Schema Autocomplete (FileMaker Data API)
Connect directly to your FileMaker Server and get real-time autocomplete for your actual database schema.

- **Table::Field** — type `::` after a table name and get field suggestions
- **Layout names** — suggested after `Go to Layout`, `New Window`, etc.
- **Script names** — suggested after `Perform Script`, `Perform Script On Server`, etc.
- **Credentials stored securely** in the system keychain via VS Code SecretStorage
- **Multiple connection profiles** — dev, staging, production
- **Status bar indicator** showing the active connection

**Commands:**
- `FileMaker: Connect to Server` — add a new connection profile
- `FileMaker: Switch Connection` — switch between profiles
- `FileMaker: Refresh Schema` — update schema after database changes
- `FileMaker: Disconnect` — disconnect from server
- `FileMaker: Show Connection Status` — show tables, layouts and scripts count

### 🖱️ Hover Documentation
Hover over any FileMaker **calculation function** to see its signature, description, and example inline.

> Hover documentation covers calculation functions (225+). Script steps not yet covered.

### 📦 678+ Snippets
The most complete FileMaker snippet library available.

**Quick Get() prefixes** — 139 snippets, one per parameter:

| Prefix | Expands to |
|--------|-----------|
| `gdate` | `Get ( CurrentDate )` |
| `gtime` | `Get ( CurrentTime )` |
| `gts` | `Get ( CurrentTimestamp )` |
| `gerr` | `Get ( LastError )` |
| `gscript` | `Get ( ScriptName )` |
| `gparam` | `Get ( ScriptParameter )` |
| `grid` | `Get ( RecordID )` |
| `gfound` | `Get ( FoundCount )` |
| `gchoice` | `Get ( LastMessageChoice )` |
| `gaiacct` | `Get ( AIAccountName )` |
| `gtokens` | `Get ( LastStepTokensUsed )` |
| `gwuuid` | `Get ( WindowUUID )` — FM 2026+ |
| `gpassdays` | `Get ( AccountPasswordDaysRemaining )` — FM 2026+ |
| `gguidedaccess` | `Get ( GuidedAccessState )` — FM 2026+ |
| ... | 125 more |

**Block snippets:**

| Prefix | Expands to |
|--------|-----------|
| `loop` | `Loop` / `Exit Loop If` / `End Loop` |
| `ifb` | `If` / `End If` |
| `ife` | `If` / `Else` / `End If` |
| `ifeib` | `If` / `Else If` / `Else` / `End If` |
| `whileb` | `While` with all 4 parameters |
| `whilec` | `While` with counter pattern |
| `caseb` | `Case` with multiple conditions |
| `letb` | `Let` with multiple variables |
| `sqls` | `ExecuteSQL` SELECT template |
| `sqlf` | `ExecuteSQL` full template with ORDER BY |
| `iferr` | `If` error handling with `Get ( LastError )` |
| `jset` | `JSONSetElement` with 3 key-value pairs |
| `pdfworkflow` | Full PDF creation workflow — FM 2026+ |
| `persistread` | Read from persistent data store — FM 2026+ |
| `persistwrite` | Write to persistent data store — FM 2026+ |

**Script step snippets** — 147 snippets with full parameter templates:

| Prefix | Expands to |
|--------|-----------|
| `ssdialog` | `Show Custom Dialog` with 2 buttons |
| `ssdialog3` | `Show Custom Dialog` with 3 buttons |
| `sspf` | `Perform Find` with error handling |
| `ssgol` | `Go to Layout` |
| `ssgorr` | `Go to Related Record` |
| `sssetf` | `Set Field` |
| `sssetvar` | `Set Variable` |
| `ssnewrec` | `New Record/Request` |
| `sscommit` | `Commit Records/Requests` |
| `ssairesp` | `Generate Response from Model` |
| `ssrag` | `Perform RAG Action` |
| `ssnlfind` | `Perform Find by Natural Language` |
| `ssembedding` | `Insert Embedding` |
| `ssimagecaption` | `Insert Image Caption` — FM 2026+ |
| `ssimagecaptionfs` | `Insert Image Captions in Found Set` — FM 2026+ |
| `ssconfigpersist` | `Configure Persistent Data` — FM 2026+ |
| `sscreatepdf` | `Create PDF` — FM 2026+ |
| `ssopenpdf` | `Open PDF` — FM 2026+ |
| `ssappendpdf` | `Append to PDF` — FM 2026+ |
| `ssclosepdf` | `Close PDF` — FM 2026+ |
| `ssprintpdf` | `Print PDF` — FM 2026+ |
| `ssflushcookies` | `Flush Web Viewer Cookies` — FM 2026+ |
| ... | 125 more |

### 🔧 JSON → JSONSetElement() Converter
Select any JSON text and run **FileMaker: JSON to JSONSetElement()** from the Command Palette (`Cmd+Shift+P`) to instantly convert it to a FileMaker expression.

### 🎯 Auto-indentation
Automatic indentation for `If`, `Else If`, `Loop`, `While` blocks. `End If` and `End Loop` auto-outdent to the correct level.

### 📁 Code Folding
Collapse `If/End If` and `Loop/End Loop` blocks using the fold arrows in the editor gutter.

### 💬 Comment Toggle
Use `Cmd+/` to toggle `#` line comments. Use `Shift+Alt+A` for block comments `/* */`.

### 🌍 English + Spanish
Script steps highlighted in both English and Spanish FileMaker installations.

---

## 📥 Installation

**From the Marketplace** — search `FileMaker Dev Tools` in the VS Code Extensions tab and click Install.

**Manual** — download the `.vsix` from [Releases](https://github.com/alitfal/filemaker-vscode/releases) and run:
code --install-extension filemaker-vscode-updated-x.x.x.vsix

---

## 🔌 Connecting to FileMaker Server

1. Open the Command Palette (`Cmd+Shift+P`)
2. Run `FileMaker: Connect to Server`
3. Enter your connection profile name (e.g. `dev`)
4. Enter your FileMaker Server URL (e.g. `https://192.168.1.163`)
5. Enter your database name
6. Enter your username and password

Credentials are stored securely in your system keychain — never in plain text files.

Once connected, typing `::` after any table name will suggest all available fields. Layout and script names are also suggested in the appropriate context.

To update the schema after database changes: `FileMaker: Refresh Schema`

---

## 🎨 Theme Setup

### Option A — Use the included theme (recommended)
1. `Cmd+Shift+P` → `Color Theme`
2. Select **FileMaker Dark**

### Option B — Dracula Pro
Add to your VS Code `settings.json` (`Cmd+Shift+P` → `Open User Settings JSON`):

```json
"editor.tokenColorCustomizations": {
  "[Dracula Pro]": {
    "textMateRules": [
      { "scope": "support.function.builtin_functions.filemaker", "settings": { "foreground": "#BD93F9" } },
      { "scope": "support.function.ai.filemaker", "settings": { "foreground": "#FF79C6", "fontStyle": "bold" } },
      { "scope": "support.function.json.filemaker", "settings": { "foreground": "#8BE9FD", "fontStyle": "bold" } },
      { "scope": "support.function.crypto.filemaker", "settings": { "foreground": "#FFB86C", "fontStyle": "bold" } },
      { "scope": "support.function.datetime.filemaker", "settings": { "foreground": "#50FA7B" } },
      { "scope": "support.function.aggregate.filemaker", "settings": { "foreground": "#F1FA8C", "fontStyle": "bold" } },
      { "scope": "keyword.control.filemaker", "settings": { "foreground": "#FF79C6", "fontStyle": "bold" } },
      { "scope": "keyword.other.scriptStep.filemaker", "settings": { "foreground": "#8BE9FD" } },
      { "scope": "keyword.other.scriptParam.filemaker", "settings": { "foreground": "#FFB86C" } },
      { "scope": "variable.script_variable.local.filemaker", "settings": { "foreground": "#F1FA8C" } },
      { "scope": "variable.script_variable.global.filemaker", "settings": { "foreground": "#FFB86C", "fontStyle": "bold" } },
      { "scope": "entity.name.table.filemaker", "settings": { "foreground": "#50FA7B" } },
      { "scope": "variable.other.field.filemaker", "settings": { "foreground": "#F8F8F2" } },
      { "scope": "constant.numeric.filemaker", "settings": { "foreground": "#BD93F9" } },
      { "scope": "string.quoted.double.filemaker", "settings": { "foreground": "#F1FA8C" } },
      { "scope": "comment.line.hash.filemaker", "settings": { "foreground": "#6272A4", "fontStyle": "italic" } },
      { "scope": "comment.line.double-slash.filemaker", "settings": { "foreground": "#6272A4", "fontStyle": "italic" } },
      { "scope": ["keyword.operator.arithmetic.filemaker","keyword.operator.comparison.filemaker","keyword.operator.logical.filemaker","keyword.operator.string.filemaker"], "settings": { "foreground": "#FF79C6" } }
    ]
  }
}
```

---

## 📁 Supported File Extensions

| Extension | Use |
|-----------|-----|
| `.fmfn` | FileMaker custom function |
| `.fmcalc` | FileMaker calculation |
| `.fmscript` | Script step calculation |
| `.calc` | Generic calculation file |

For `.txt` or other formats, select the language manually in the VS Code status bar → `Plain Text` → `FileMaker`.

---

## 🆕 Complete FM 2026 Coverage

### Calculation Functions (230+)

| Category | Functions |
|----------|---------|
| Text | `Substitute`, `FilterValues`, `UniqueValues`, `GetTextFromPDF`, `Left`, `Middle`, `Right`... |
| Number | `Abs`, `Round`, `Mod`, `SetPrecision`, `Sqrt`, `Truncate`... |
| Date / Time | `Date`, `Timestamp`, `WeekOfYear`, `DayOfWeek`, `MonthName`... |
| Container | `GetLiveTextAsJSON`, `GetContainerTextInfo`, `Base64Encode`, `VerifyContainer`... |
| JSON | `JSONParse`, `JSONParsedState`, `JSONMakeArray`, `JSONSetElement`, `JSONGetElement`... |
| Logical | `Case`, `If`, `Let`, `While`, `SetRecursion`, `Evaluate`, `IsEmpty`... |
| AI | `GetEmbedding`, `CosineSimilarity`, `GetRAGSpaceInfo`, `GetTokenCount`, `AddEmbeddings`... |
| Crypto | `CryptGeneratePassKey`, `CryptGenerateSignature`, `CryptDigest`, `CryptEncrypt`... |
| Aggregate | `Sum`, `Average`, `Count`, `Max`, `Min`, `StDev`, `Variance`... |
| Design | `FieldNames`, `TableNames`, `ScriptNames`, `LayoutNames`, `RelationInfo`... |
| Persistent Data | `GetPersistentData`, `ListPersistentDataIDs` — FM 2026+ |
| DDL / AI Metadata | `FieldAnnotation`, `BaseTableComment`, `FieldDisplayNames` — FM 2026+ |
| Get | **139 parameters** — complete FM 2026 list |

### Script Steps (210+)

| Category | Examples |
|----------|---------|
| Control | `If`, `Else If`, `End If`, `Loop`, `Exit Loop If`, `Perform Script`, `Set Variable`... |
| Navigation | `Go to Layout`, `Go to Record/Request/Page`, `Go to Portal Row`, `Go to Related Record`... |
| Editing | `Cut`, `Copy`, `Paste`, `Select All`, `Set Selection`, `Undo/Redo`... |
| Fields | `Set Field`, `Set Field By Name`, `Replace Field Contents`, `Insert from URL`... |
| Records | `New Record/Request`, `Delete Record/Request`, `Import Records`, `Export Records`... |
| Found Sets | `Perform Find`, `Show All Records`, `Sort Records`, `Constrain Found Set`... |
| Windows | `New Window`, `Close Window`, `Freeze Window`, `Refresh Window`... |
| PDF | `Create PDF`, `Open PDF`, `Append to PDF`, `Close PDF`, `Cancel PDF`, `Print PDF` — FM 2026+ |
| Files | `Open File`, `Close File`, `Save a Copy as`, `Write to Data File`... |
| Accounts | `Add Account`, `Delete Account`, `Re-Login`, `Reset Account Password`... |
| AI | `Configure AI Account`, `Generate Response from Model`, `Insert Image Caption`, `Perform RAG Action`... |
| Persistent Data | `Configure Persistent Data` — FM 2026+ |
| Miscellaneous | `Show Custom Dialog`, `Execute SQL`, `Send Mail`, `Flush Web Viewer Cookies`... |

---

## 🤝 Contributing

Pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## 📄 Credits

Original syntax ported from [Donovan Chandler's TextMate bundle](https://github.com/DonovanChan/Filemaker.tmbundle).
Originally forked from [jwillinghalpern/filemaker-vscode-bundle](https://github.com/jwillinghalpern/filemaker-vscode-bundle).
