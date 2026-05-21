# FileMaker VSCode

> Syntax highlighting, autocompletion, and snippets for **FileMaker / Claris Pro** calculations and scripts in Visual Studio Code.
> Full coverage through **FileMaker 2025 (v22)** — functions, script steps, Get() params, and AI.

[![Version](https://img.shields.io/visual-studio-marketplace/v/alitfal.filemaker-vscode-updated?label=version)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alitfal.filemaker-vscode-updated)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

---

![FileMaker VSCode Screenshot](resources/screenshot-dracula.png)

---

## ✨ Features

### 🎨 Category-based Syntax Highlighting
Different colors for each type of element:

| Element | Color |
|---------|-------|
| Built-in functions | 🟣 Purple |
| AI / Embeddings / RAG functions | 🩷 Pink bold |
| JSON functions | 🔵 Cyan bold |
| Cryptography functions | 🟠 Orange bold |
| Date / Time functions | 🟢 Green |
| Aggregate functions | 🟡 Yellow bold |
| Local variables `$var` | 🟡 Yellow |
| Global variables `$$var` | 🟠 Orange bold |
| Control flow `If` / `Else If` / `End If` / `Loop` / `End Loop` | 🩷 Pink bold |
| Script steps | 🔵 Cyan |
| Strings | 🟡 Yellow |
| Comments `#` and `//` | ⚫ Grey italic |

### 📦 356+ Snippets
Autocomplete for every built-in FileMaker function through version 2025, with named tab stops to navigate between parameters.

Productivity snippets included:

| Prefix | Expands to |
|--------|-----------|
| `sqls` | ExecuteSQL with SELECT template |
| `letm` | Let with multiple variables |
| `ifi` | Inline If |
| `whilet` | While with all 4 parameters |
| `casei` | Inline Case with one condition and else |
| `JSONSetElement multi` | JSONSetElement with multiple key-value pairs |
| `JSONGetElement nested` | JSONGetElement with dot-notation path |
| `Substitute list` | Substitute with multiple find/replace pairs |

### 🔧 JSON → JSONSetElement() Converter
Select any JSON text and run **FileMaker: JSON to JSONSetElement()** from the Command Palette (`Cmd+Shift+P`) to instantly convert it to a FileMaker expression.

---

## 📥 Installation

**From the Marketplace** — search `FileMaker VSCode` in the VS Code Extensions tab and click Install.

**Manual** — download the `.vsix` from [Releases](https://github.com/alitfal/filemaker-vscode/releases) and run:
code --install-extension filemaker-vscode-updated-x.x.x.vsix

---

## 🎨 Color Setup (Dracula Pro)

To get the colors shown in the screenshot, add the following to your VS Code `settings.json` (`Cmd+Shift+P` → `Open User Settings JSON`):

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

For `.txt` or other file types, manually select the language in the VS Code status bar → `Plain Text` → `FileMaker`.

---

## 🆕 Complete FM 2025 Coverage

### Calculation Functions (225+)
All official functions organized by category:

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
All official categories in English:

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
