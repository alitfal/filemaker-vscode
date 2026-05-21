# Change Log

## [2.0.6] - 2026-05-21

### Cobertura completa FM 2025
- 136 parámetros Get() — lista oficial completa incluyendo FM 2024/2025
- Todos los script steps en inglés desde la documentación oficial:
  - Control, Navigation, Editing, Fields, Records, Found Sets
  - Windows, Files, Accounts, Spelling, Open Menu Items
  - AI script steps (Configure AI Account, Generate Response from Model, Perform Find by Natural Language, Perform RAG Action, etc.)
- Script parameters/keywords en inglés (With dialog, Without dialog, Ascending, Descending, etc.)

## [2.0.5] - 2026-05-21

### Script steps
- Reemplazados todos los script steps en español por lista completa en inglés
- Añadidos todos los AI script steps de FM 2024/2025

## [2.0.4] - 2026-05-21

### Funciones AI completas
- Añadidas 13 funciones AI/embeddings que faltaban
- README completo con captura de pantalla y guía de colores

## [2.0.0] - 2025-05-21

### Nuevas funciones FM 2023 → 2025
- `JSONMakeArray` — convierte lista delimitada a JSON array (FM 2024+)
- `JSONParse` — parsea JSON y lo cachea en memoria para reutilizar (FM 2025+)
- `JSONParsedState` — comprueba si un valor contiene JSON parseado (FM 2025+)
- `GetFieldsOnLayout` — devuelve campos de un layout como JSON (FM 2025+)
- `GetTextFromPDF` — extrae texto de un PDF en contenedor (FM 2025+)
- `GetRecordIDsFromFoundSet` — IDs del found set como lista o JSON (FM 2025+)
- `GetLiveTextAsJSON` — OCR de imagen en contenedor con posiciones (FM 2024+)
- `CryptGeneratePassKey` — genera clave criptográfica desde passphrase (FM 2023+)

### Nuevas funciones Get()
- `Get(AIAccountName)` — nombre de la cuenta AI por defecto (FM 2024+)
- `Get(AIModelName)` — nombre del modelo AI por defecto (FM 2024+)
- `Get(TransactionOpenState)` — si hay una transacción abierta (FM 19.6+)
- `Get(LastODBCError)` — último código de error ODBC
- `Get(FileAIModelIntegration)` — configuración AI del archivo (FM 2025+)

### Nuevos snippets de productividad
- `sqls` — ExecuteSQL con plantilla SELECT
- `letm` — Let con múltiples variables expandido
- `ifi` — If inline
- `whilet` — While con los 4 parámetros expandidos
- `casei` — Case inline
- `JSONSetElement multi` — JSONSetElement con múltiples pares
- `JSONGetElement nested` — JSONGetElement con dot-notation
- `Substitute list` — Substitute con múltiples pares

### Otros cambios
- Nuevas extensiones: `.fmcalc`, `.fmscript`
- VSCode engine mínimo: 1.85
- TypeScript 5.x, Node 20.x
- CI/CD con GitHub Actions — publica automáticamente al hacer tag

---

## [1.9.0] - 2022-07-06
- Add `FileMaker: JSON to JSONSetElement()` command

## [1.1.0] - 2020-07-03
- Add FM 19 functions and get params

## [1.0.0] - 2019-12-18
- Initial release on the VSCode extension marketplace
