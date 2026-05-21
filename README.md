# FileMaker VSCode

> Syntax highlighting, autocompletado y snippets para cálculos y scripts de **FileMaker / Claris Pro** en Visual Studio Code.
> Actualizado hasta **FileMaker 2025 (v22)** — cobertura completa de funciones, script steps, Get() params e IA.

[![Version](https://img.shields.io/visual-studio-marketplace/v/alitfal.filemaker-vscode-updated?label=version)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alitfal.filemaker-vscode-updated)](https://marketplace.visualstudio.com/items?itemName=alitfal.filemaker-vscode-updated)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

---

![FileMaker VSCode Screenshot](resources/screenshot-dracula.png)

---

## ✨ Características

### 🎨 Syntax Highlighting por categorías
Colores diferenciados para cada tipo de elemento:

| Elemento | Color |
|----------|-------|
| Funciones builtin | 🟣 Lila |
| Funciones AI / Embeddings / RAG | 🩷 Rosa bold |
| Funciones JSON | 🔵 Cian bold |
| Funciones criptografía | 🟠 Naranja bold |
| Funciones fecha / hora | 🟢 Verde |
| Funciones aggregate | 🟡 Amarillo bold |
| Variables locales `$var` | 🟡 Amarillo |
| Variables globales `$$var` | 🟠 Naranja bold |
| Control de flujo `If` / `Else If` / `End If` / `Loop` / `End Loop` | 🩷 Rosa bold |
| Script steps | 🔵 Cian |
| Strings | 🟡 Amarillo |
| Comentarios `#` y `//` | ⚫ Gris itálica |

### 📦 356+ Snippets
Autocompletado para todas las funciones integradas de FileMaker hasta la versión 2025, con tab stops nombrados para navegar entre parámetros.

Snippets de productividad incluidos:

| Prefijo | Expansión |
|---------|-----------|
| `sqls` | ExecuteSQL con plantilla SELECT |
| `letm` | Let con múltiples variables |
| `ifi` | If inline |
| `whilet` | While con los 4 parámetros |
| `casei` | Case inline |
| `JSONSetElement multi` | JSONSetElement con múltiples pares |
| `JSONGetElement nested` | JSONGetElement con dot-notation |
| `Substitute list` | Substitute con múltiples pares |

### 🔧 JSON → JSONSetElement()
Selecciona cualquier JSON y ejecuta **FileMaker: JSON to JSONSetElement()** desde el Command Palette (`Cmd+Shift+P`) para convertirlo instantáneamente a una expresión FileMaker.

---

## 📥 Instalación

**Desde el Marketplace** — busca `FileMaker VSCode` en la pestaña Extensions de VS Code e instala.

**Manual** — descarga el `.vsix` desde [Releases](https://github.com/alitfal/filemaker-vscode/releases) y ejecuta:
code --install-extension filemaker-vscode-updated-x.x.x.vsix

---

## 🎨 Configurar colores (Dracula Pro)

Para obtener los colores que se ven en la captura, añade esto a tu `settings.json` de VS Code (`Cmd+Shift+P` → `Open User Settings JSON`):

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

## 📁 Extensiones de archivo soportadas

| Extensión | Uso |
|-----------|-----|
| `.fmfn` | Custom function |
| `.fmcalc` | Cálculo FileMaker |
| `.fmscript` | Script step calculation |
| `.calc` | Cálculo genérico |

Para archivos `.txt` o cualquier otro formato, selecciona el lenguaje manualmente en la barra inferior de VS Code → `Plain Text` → `FileMaker`.

---

## 🆕 Cobertura completa FM 2025

### Funciones de cálculo (225+)
Todas las funciones oficiales organizadas por categoría:

| Categoría | Ejemplos |
|-----------|---------|
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
| Get | 136 parámetros — lista completa FM 2025 |

### Script steps (200+)
Todas las categorías oficiales en inglés:

| Categoría | Ejemplos |
|-----------|---------|
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

## 🤝 Contribuir

Pull requests bienvenidos. Ver [CONTRIBUTING.md](CONTRIBUTING.md) para instrucciones detalladas.

---

## 📄 Créditos

Sintaxis original de [Donovan Chandler](https://github.com/DonovanChan/Filemaker.tmbundle).
Fork original de [jwillinghalpern](https://github.com/jwillinghalpern/filemaker-vscode-bundle).
