# FileMaker VSCode

Syntax highlighting, autocompleción y snippets para cálculos FileMaker/Claris en Visual Studio Code.
Actualizado hasta **FileMaker 2025 (v22)**.

## Características

### Syntax Highlighting
Resaltado completo para funciones, parámetros Get(), operadores, strings y comentarios.

### Snippets — 354+ funciones
Autocompletado para todas las funciones integradas hasta FileMaker 2025.

### JSON → JSONSetElement()
Selecciona cualquier JSON y ejecuta **FileMaker: JSON to JSONSetElement()** desde el Command Palette para convertirlo instantáneamente a una expresión FileMaker.

## Instalación

**Desde el Marketplace** — busca `FileMaker VSCode` en la pestaña Extensions.

**Manual** — descarga el `.vsix` desde [Releases](https://github.com/TU_USERNAME/filemaker-vscode/releases) y ejecuta:
code --install-extension filemaker-vscode-x.x.x.vsix

## Extensiones soportadas

| Extensión | Uso |
|-----------|-----|
| `.fmfn` | Custom function |
| `.fmcalc` | Cálculo FileMaker |
| `.fmscript` | Cálculo en script step |
| `.calc` | Cálculo genérico |

## Novedades v2.0.0

| Función | Versión |
|---------|---------|
| `JSONMakeArray` | FM 2024+ |
| `JSONParse` / `JSONParsedState` | FM 2025+ |
| `GetFieldsOnLayout` | FM 2025+ |
| `GetTextFromPDF` | FM 2025+ |
| `GetRecordIDsFromFoundSet` | FM 2025+ |
| `GetLiveTextAsJSON` | FM 2024+ |
| `Get(AIAccountName/AIModelName)` | FM 2024+ |
| `CryptGeneratePassKey` | FM 2023+ |

Ver [CHANGELOG](CHANGELOG.md) completo.

## Contribuir

Pull requests bienvenidos. Ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Créditos

Sintaxis original de [Donovan Chandler](https://github.com/DonovanChan/Filemaker.tmbundle).
Fork original de [jwillinghalpern](https://github.com/jwillinghalpern/filemaker-vscode-bundle).
