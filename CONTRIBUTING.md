# Contributing

## Setup

```bash
git clone https://github.com/TU_USERNAME/filemaker-vscode
cd filemaker-vscode
npm install
```

Abre la carpeta en VS Code y pulsa `F5` para lanzar una ventana de desarrollo con la extensión activa.

## Añadir una función nueva

### 1. Snippet — edita `snippets/filemaker.json`:
```json
"NombreFuncion": {
  "prefix": "NombreFuncion",
  "body": "NombreFuncion ( ${1:param1} ; ${2:param2} )$0",
  "description": "Descripción breve. FM AÑO+",
  "scope": "source.filemaker"
}
```

### 2. Syntax highlighting — edita `syntaxes/FileMaker.tmLanguage`:
- Funciones de cálculo → añade al patrón `support.function.builtin_functions`
- Parámetros Get() → añade al patrón `constant.language`

### 3. Verifica que compila:
```bash
npm run compile
node -e "require('./snippets/filemaker.json'); console.log('OK')"
```

## Publicar una nueva versión

```bash
# 1. Actualiza CHANGELOG.md
# 2. Sube versión en package.json
git commit -am "chore: release v2.1.0"
git tag v2.1.0
git push origin main --tags   # dispara el workflow automáticamente
```
