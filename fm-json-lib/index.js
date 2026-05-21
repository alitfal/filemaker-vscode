/**
 * Converts a JSON string into a FileMaker JSONSetElement() expression.
 */
function jsonToJsonSetElement(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }

  const lines = buildLines(parsed, '');
  return `JSONSetElement ( "{}" ;\n${lines.join(' ;\n')}\n)`;
}

function buildLines(obj, prefix) {
  const entries = Array.isArray(obj)
    ? obj.map((v, i) => [String(i), v])
    : Object.entries(obj);

  let lines = [];
  for (const [key, value] of entries) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object') {
      lines = lines.concat(buildLines(value, path));
    } else {
      lines.push(`\t[ "${path}" ; ${fmValue(value)} ; ${fmType(value)} ]`);
    }
  }
  return lines;
}

function fmType(value) {
  if (value === null) return 'JSONNull';
  if (typeof value === 'boolean') return 'JSONBoolean';
  if (typeof value === 'number') return 'JSONNumber';
  return 'JSONString';
}

function fmValue(value) {
  if (value === null) return '""';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return String(value);
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

module.exports = { jsonToJsonSetElement };
