# FileMaker Dev Tools

> The most complete Visual Studio Code extension for **FileMaker / Claris Pro** development.
> Full coverage through **FileMaker 2025 (v22)** — functions, script steps, Get() params, AI, hover docs, and more.

[![Version](https://img.shields.io/badge/version-2.2.1-purple)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
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
| Control flow `If` / `Else If` / `End If` / `Loop` | 🩷 Pink bold |
| Script steps | 🔵 Cyan |
| Strings | 🟡 Yellow |
| Comments `#` and `//` | ⚫ Grey italic |

### 🖱️ Hover Documentation
Hover over any FileMaker **calculation function** to see its signature, description, and example inline — no need to leave VS Code.

> Hover is available for calculation functions (225+). Script steps are not yet covered.

### 📦 654+ Snippets
The most complete FileMaker snippet library available:

**Quick Get() prefixes** — 136 snippets, one per parameter:

| Prefix | Expands to |
|--------|-----------|
| `gdate` | `Get ( CurrentDate )` |
| `gerr` | `Get ( LastError )` |
| `gscript` | `Get ( ScriptName )` |
| `gparam` | `Get ( ScriptParameter )` |
| `grid` | `Get ( RecordID )` |
| `gfound` | `Get ( FoundCount )` |
| `gchoice` | `Get ( LastMessageChoice )` |
| `gaiacct` | `Get ( AIAccountName )` |
| `gtokens` | `Get ( LastStepTokensUsed )` |
| ... | 127 more |

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
| `sqlf` | `ExecuteSQL` with full SELECT template |
| `iferr` | `If` error handling with `Get(LastError)` |

**Script step snippets** — 137 snippets, one per script step:

| Prefix | Expands to |
|--------|-----------|
| `ssdialog` | `Show Custom Dialog` with 2 buttons |
| `sspf` | `Perform Find` with error handling |
| `sssort` | `Sort Records` without dialog |
| `ssairesp` | `Generate Response from Model` |
| `ssrag` | `Perform RAG Action` |
| `ssnlfind` | `Perform Find by Natural Language` |
| `ssembedding` | `Insert Embedding` |
| ... | 130 more |

**Productivity snippets:**

| Prefix | Expands to |
|--------|-----------|
| `sqls` | `ExecuteSQL` SELECT template |
| `letm` | `Let` with multiple variables |
| `ifi` | Inline `If` |
| `jset` | `JSONSetElement` with 3 pairs |
| `gol` | `Go to Layout` |
| `gorr` | `Go to Related Record` |

### 🔧 JSON → JSONSetElement() Converter
Select any JSON and run **FileMaker: JSON to JSONSetElement()** from the Command Palette (`Cmd+Shift+P`) to instantly convert it to a FileMaker expression.

### 🎯 Auto-indentation
Automatic indentation for `If`, `Else If`, `Loop`, `While` blocks. `End If` and `End Loop` auto-outdent.

### 📁 Code Folding
Collapse `If/End If` and `Loop/End Loop` blocks using the fold arrows in the gutter.

### 🌍 English + Spanish
Script steps highlighted in both English and Spanish FileMaker installations.

---

## 📥 Installation

**From the Marketplace** — search `FileMaker Dev Tools` in the VS Code Extensions tab and click Install.

**Manual** — download the `.vsix` from [Releases](https://github.com/alitfal/filemaker-vscode/releases) and run:
code --install-extension filemaker-vscode-updated-x.x.x.vsix

---

## 🎨 Theme Setup

### Option A — Use the included theme (recommended)
1. `Cmd+Shift+P` → `Color Theme`
2. Select **FileMaker Dark**

No additional configuration needed.

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

## 🆕 Complete FM 2025 Coverage

### Calculation Functions (225+)

| Category | Examples |
|----------|---------|
| Text | `Substitute`, `FilterValues`, `UniqueValues`, `GetTextFromPDF`... |
| Number | `Abs`, `Round`, `SetPrecision`... |
| Date / Time | `Date`, `Timestamp`, `WeekOfYear`... |
| Container | `GetLiveTextAsJSON`, `GetContainerTextInfo`... |
| JSON | `JSONParse`, `JSONParsedState`, `JSONMakeArray`... |
| Logical | `Case`, `If`, `Let`, `While`, `SetRecursion`... |
| AI | `GetEmbedding`, `CosineSimilarity`, `GetRAGSpaceInfo`, `GetTokenCount`... |
| Crypto | `CryptGeneratePassKey`, `CryptGenerateSignature`... |
| Aggregate | `Sum`, `Average`, `Count`, `StDev`... |
| Design | `FieldNames`, `TableNames`, `ScriptNames`... |
| Get | 136 parameters — complete FM 2025 list |

### Script Steps (200+)

| Category | Examples |
|----------|---------|
| Control | `If`, `Else If`, `End If`, `Loop`, `Exit Loop If`, `Perform Script`... |
| Navigation | `Go to Layout`, `Go to Record`, `Go to Portal Row`... |
| Editing | `Cut`, `Copy`, `Paste`, `Select All`... |
| Fields | `Set Field`, `Replace Field Contents`, `Insert from URL`... |
| Records | `New Record/Request`, `Delete Record/Request`, `Import Records`... |
| Found Sets | `Perform Find`, `Show All Records`, `Sort Records`... |
| Windows | `New Window`, `Close Window`, `Freeze Window`... |
| Files | `Open File`, `Close File`, `Save a Copy as`, `Write to Data File`... |
| Accounts | `Add Account`, `Delete Account`, `Re-Login`... |
| AI | `Configure AI Account`, `Generate Response from Model`, `Perform Find by Natural Language`, `Perform RAG Action`... |
| Miscellaneous | `Show Custom Dialog`, `Execute SQL`, `Send Mail`, `Open URL`... |

---

## 🤝 Contributing

Pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## 📄 Credits

Original syntax ported from [Donovan Chandler's TextMate bundle](https://github.com/DonovanChan/Filemaker.tmbundle).
Originally forked from [jwillinghalpern/filemaker-vscode-bundle](https://github.com/jwillinghalpern/filemaker-vscode-bundle).
