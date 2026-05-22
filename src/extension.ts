import * as vscode from 'vscode';

// ── fm-json-to-jsonsetelement inlined ────────────────────────────────────
function jsonToJsonSetElement(jsonString: string): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e: any) {
    throw new Error('Invalid JSON: ' + e.message);
  }
  const lines = buildLines(parsed, '');
  return `JSONSetElement ( "{}" ;\n${lines.join(' ;\n')}\n)`;
}

function buildLines(obj: any, prefix: string): string[] {
  const entries: [string, any][] = Array.isArray(obj)
    ? obj.map((v: any, i: number) => [String(i), v])
    : Object.entries(obj);
  let lines: string[] = [];
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

function fmType(value: any): string {
  if (value === null) return 'JSONNull';
  if (typeof value === 'boolean') return 'JSONBoolean';
  if (typeof value === 'number') return 'JSONNumber';
  return 'JSONString';
}

function fmValue(value: any): string {
  if (value === null) return '""';
  if (typeof value === 'boolean') return value ? '1' : '0';
  if (typeof value === 'number') return String(value);
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

// ── Function documentation database ──────────────────────────────────────
const FM_DOCS: Record<string, { signature: string; description: string; example?: string }> = {
  'Char': { signature: 'Char ( number )', description: 'Returns the character that corresponds to the Unicode code point specified by number.', example: 'Char ( 65 ) // Returns "A"' },
  'Code': { signature: 'Code ( text )', description: 'Returns the Unicode code point of the first character in text.', example: 'Code ( "A" ) // Returns 65' },
  'Exact': { signature: 'Exact ( originalText ; comparisonText )', description: 'Returns True (1) if originalText and comparisonText are identical, including case.' },
  'Filter': { signature: 'Filter ( textToFilter ; filterText )', description: 'Returns only the characters in textToFilter that match characters in filterText.' },
  'FilterValues': { signature: 'FilterValues ( textList ; filterValues )', description: 'Returns only the values in textList that match values in filterValues.' },
  'Left': { signature: 'Left ( text ; numberOfCharacters )', description: 'Returns the leftmost numberOfCharacters characters from text.', example: 'Left ( "FileMaker" ; 4 ) // Returns "File"' },
  'Length': { signature: 'Length ( text )', description: 'Returns the number of characters in text.', example: 'Length ( "FileMaker" ) // Returns 9' },
  'Lower': { signature: 'Lower ( text )', description: 'Returns text converted to lowercase.' },
  'Middle': { signature: 'Middle ( text ; startCharacter ; numberOfCharacters )', description: 'Returns numberOfCharacters characters from text starting at startCharacter.' },
  'PatternCount': { signature: 'PatternCount ( text ; searchString )', description: 'Returns the number of times searchString occurs in text.' },
  'Position': { signature: 'Position ( text ; searchString ; start ; occurrence )', description: 'Returns the starting position of the nth occurrence of searchString in text.' },
  'Proper': { signature: 'Proper ( text )', description: 'Returns text with the first letter of each word capitalized.' },
  'Replace': { signature: 'Replace ( text ; startCharacter ; numberOfCharacters ; replacementText )', description: 'Returns text with numberOfCharacters replaced by replacementText starting at startCharacter.' },
  'Right': { signature: 'Right ( text ; numberOfCharacters )', description: 'Returns the rightmost numberOfCharacters characters from text.' },
  'Substitute': { signature: 'Substitute ( text ; searchString ; replaceString )', description: 'Returns text with all occurrences of searchString replaced by replaceString.' },
  'Trim': { signature: 'Trim ( text )', description: 'Returns text with leading and trailing spaces removed.' },
  'TrimAll': { signature: 'TrimAll ( text ; trimSpaces ; trimType )', description: 'Returns text with all spaces removed based on trimType.' },
  'Upper': { signature: 'Upper ( text )', description: 'Returns text converted to uppercase.' },
  'UniqueValues': { signature: 'UniqueValues ( textList )', description: 'Returns a list with duplicate values removed.' },
  'SortValues': { signature: 'SortValues ( textList ; sortType )', description: 'Returns a sorted list. sortType: 1=text asc, 2=text desc, 3=numeric asc, 4=numeric desc.' },
  'ValueCount': { signature: 'ValueCount ( textList )', description: 'Returns the number of values in a return-separated list.' },
  'GetValue': { signature: 'GetValue ( textList ; valueNumber )', description: 'Returns the value at position valueNumber in textList.' },
  'List': { signature: 'List ( field {; field...} )', description: 'Returns a return-separated list of non-empty values from one or more fields.' },
  'Quote': { signature: 'Quote ( text )', description: 'Returns text enclosed in quotation marks, with special characters escaped.' },
  'SerialIncrement': { signature: 'SerialIncrement ( text ; incrementBy )', description: 'Returns text with the last number incremented by incrementBy.' },
  'WordCount': { signature: 'WordCount ( text )', description: 'Returns the number of words in text.' },
  'GetTextFromPDF': { signature: 'GetTextFromPDF ( containerField )', description: 'Returns the text found in a PDF stored in containerField. FM 2025+' },
  'Abs': { signature: 'Abs ( number )', description: 'Returns the absolute value of number.', example: 'Abs ( -5 ) // Returns 5' },
  'Ceiling': { signature: 'Ceiling ( number )', description: 'Returns number rounded up to the nearest integer.', example: 'Ceiling ( 1.2 ) // Returns 2' },
  'Combination': { signature: 'Combination ( setSize ; numberOfChoices )', description: 'Returns the number of combinations of numberOfChoices items from a set of setSize items.' },
  'Div': { signature: 'Div ( dividend ; divisor )', description: 'Returns the integer quotient of dividend divided by divisor.' },
  'Exp': { signature: 'Exp ( number )', description: 'Returns e raised to the power of number.' },
  'Factorial': { signature: 'Factorial ( number )', description: 'Returns the factorial of number.' },
  'Floor': { signature: 'Floor ( number )', description: 'Returns number rounded down to the nearest integer.' },
  'Int': { signature: 'Int ( number )', description: 'Returns the integer portion of number, truncating toward zero.' },
  'Mod': { signature: 'Mod ( number ; divisor )', description: 'Returns the remainder when number is divided by divisor.', example: 'Mod ( 10 ; 3 ) // Returns 1' },
  'Random': { signature: 'Random', description: 'Returns a random number between 0 and 1.' },
  'Round': { signature: 'Round ( number ; precision )', description: 'Returns number rounded to precision decimal places.', example: 'Round ( 3.14159 ; 2 ) // Returns 3.14' },
  'SetPrecision': { signature: 'SetPrecision ( expression ; precision )', description: 'Evaluates expression using precision decimal places of precision.' },
  'Sign': { signature: 'Sign ( number )', description: 'Returns -1, 0, or 1 depending on whether number is negative, zero, or positive.' },
  'Sqrt': { signature: 'Sqrt ( number )', description: 'Returns the square root of number.' },
  'Truncate': { signature: 'Truncate ( number ; precision )', description: 'Returns number truncated to precision decimal places.' },
  'Date': { signature: 'Date ( month ; day ; year )', description: 'Returns a date from the specified month, day, and year.', example: 'Date ( 12 ; 31 ; 2025 )' },
  'Day': { signature: 'Day ( date )', description: 'Returns the day of the month from date (1-31).' },
  'DayName': { signature: 'DayName ( date )', description: 'Returns the name of the day of the week for date.' },
  'DayOfWeek': { signature: 'DayOfWeek ( date )', description: 'Returns the day of the week as a number (1=Sunday, 7=Saturday).' },
  'DayOfYear': { signature: 'DayOfYear ( date )', description: 'Returns the day of the year (1-366).' },
  'Month': { signature: 'Month ( date )', description: 'Returns the month from date (1-12).' },
  'MonthName': { signature: 'MonthName ( date )', description: 'Returns the name of the month for date.' },
  'WeekOfYear': { signature: 'WeekOfYear ( date )', description: 'Returns the week of the year (1-54).' },
  'Year': { signature: 'Year ( date )', description: 'Returns the year from date.' },
  'Hour': { signature: 'Hour ( time )', description: 'Returns the hour portion of time (0-23).' },
  'Minute': { signature: 'Minute ( time )', description: 'Returns the minute portion of time (0-59).' },
  'Seconds': { signature: 'Seconds ( time )', description: 'Returns the seconds portion of time (0-59).' },
  'Time': { signature: 'Time ( hours ; minutes ; seconds )', description: 'Returns a time value from the specified hours, minutes, and seconds.' },
  'Timestamp': { signature: 'Timestamp ( date ; time )', description: 'Returns a timestamp combining date and time.' },
  'JSONDeleteElement': { signature: 'JSONDeleteElement ( json ; keyOrIndexOrPath )', description: 'Deletes the element specified by keyOrIndexOrPath from json.' },
  'JSONFormatElements': { signature: 'JSONFormatElements ( json )', description: 'Returns json formatted with indentation for readability.' },
  'JSONGetElement': { signature: 'JSONGetElement ( json ; keyOrIndexOrPath )', description: 'Returns the value of the element specified by keyOrIndexOrPath in json.', example: 'JSONGetElement ( json ; "name" )' },
  'JSONGetElementType': { signature: 'JSONGetElementType ( json ; keyOrIndexOrPath )', description: 'Returns the data type: JSONString(1), JSONNumber(2), JSONBoolean(3), JSONArray(4), JSONObject(5), JSONNull(6), JSONRaw(7).' },
  'JSONListKeys': { signature: 'JSONListKeys ( json ; keyOrIndexOrPath )', description: 'Returns a return-separated list of keys in the JSON object at keyOrIndexOrPath.' },
  'JSONListValues': { signature: 'JSONListValues ( json ; keyOrIndexOrPath )', description: 'Returns a return-separated list of values in the JSON object at keyOrIndexOrPath.' },
  'JSONMakeArray': { signature: 'JSONMakeArray ( fieldOrVariable ; separator ; type )', description: 'Converts a delimited list into a JSON array. FM 2024+' },
  'JSONParse': { signature: 'JSONParse ( json )', description: 'Parses JSON text and caches the result in memory for reuse with other JSON functions. FM 2025+' },
  'JSONParsedState': { signature: 'JSONParsedState ( value )', description: 'Returns 0 (not parsed), -1 (parsed invalid), or JSON type (parsed valid). FM 2025+' },
  'JSONSetElement': { signature: 'JSONSetElement ( json ; keyOrIndexOrPath ; value ; type )', description: 'Sets or adds an element in json at keyOrIndexOrPath with value and type.', example: 'JSONSetElement ( "{}" ; "name" ; "FileMaker" ; JSONString )' },
  'Case': { signature: 'Case ( test1 ; result1 {; test2 ; result2 ; ...} {; defaultResult} )', description: 'Returns the result corresponding to the first true test, or defaultResult if no test is true.' },
  'Choose': { signature: 'Choose ( test ; result0 {; result1...} )', description: 'Returns the result at the position specified by test (0-based).' },
  'Evaluate': { signature: 'Evaluate ( expression {; [field1; field2...]} )', description: 'Evaluates expression as a FileMaker calculation.' },
  'If': { signature: 'If ( test ; resultOne ; resultTwo )', description: 'Returns resultOne if test is true, otherwise returns resultTwo.', example: 'If ( x > 0 ; "positive" ; "non-positive" )' },
  'IsEmpty': { signature: 'IsEmpty ( field )', description: 'Returns True (1) if field contains no value, False (0) otherwise.' },
  'IsValid': { signature: 'IsValid ( field )', description: 'Returns True (1) if field contains a valid value of the correct type.' },
  'IsValidExpression': { signature: 'IsValidExpression ( expression )', description: 'Returns True (1) if expression is a valid FileMaker calculation.' },
  'Let': { signature: 'Let ( {[} var1 = expression1 {; var2 = expression2...{]}}} ; calculation )', description: 'Assigns values to variables and evaluates calculation using those variables.', example: 'Let ( [ x = 10 ; y = 20 ] ; x + y )' },
  'Lookup': { signature: 'Lookup ( sourceField {; failExpression} )', description: 'Returns the value of sourceField from a related record.' },
  'Self': { signature: 'Self', description: 'Returns the contents of the field in which the formula is being evaluated.' },
  'While': { signature: 'While ( initialVariables ; condition ; logicVariables ; result )', description: 'Repeats logicVariables while condition is true, then returns result. FM 18+', example: 'While ( [i=1;list=""] ; i≤10 ; [list=list&i&¶;i=i+1] ; list )' },
  'SetRecursion': { signature: 'SetRecursion ( expression ; maxIterations )', description: 'Evaluates a recursive custom function with a specified maximum number of iterations.' },
  'Average': { signature: 'Average ( field {; field...} )', description: 'Returns the average of all non-empty values in the specified fields.' },
  'Count': { signature: 'Count ( field {; field...} )', description: 'Returns the count of non-empty values in the specified fields.' },
  'Max': { signature: 'Max ( field {; field...} )', description: 'Returns the maximum value from the specified fields.' },
  'Min': { signature: 'Min ( field {; field...} )', description: 'Returns the minimum value from the specified fields.' },
  'Sum': { signature: 'Sum ( field {; field...} )', description: 'Returns the sum of all non-empty values in the specified fields.' },
  'StDev': { signature: 'StDev ( field {; field...} )', description: 'Returns the standard deviation of a sample from the specified fields.' },
  'Variance': { signature: 'Variance ( field {; field...} )', description: 'Returns the variance of a sample from the specified fields.' },
  'GetEmbedding': { signature: 'GetEmbedding ( modelName ; inputData )', description: 'Sends inputData to the embedding model and returns the vector as container data. FM 2024+' },
  'CosineSimilarity': { signature: 'CosineSimilarity ( embedding1 ; embedding2 )', description: 'Returns the cosine similarity between two embedding vectors (-1 to 1). FM 2024+' },
  'GetTokenCount': { signature: 'GetTokenCount ( modelName ; text )', description: 'Returns the token count for text using the specified model. FM 2024+' },
  'GetRAGSpaceInfo': { signature: 'GetRAGSpaceInfo ( spaceID )', description: 'Returns information about the specified RAG space. FM 2025+' },
  'GetTableDDL': { signature: 'GetTableDDL ( tableOccurrences )', description: 'Returns table schema in DDL format for the specified table occurrences as a JSON array. FM 2025+' },
  'AddEmbeddings': { signature: 'AddEmbeddings ( embedding1 ; embedding2 )', description: 'Adds two embedding vectors and returns the normalized result. FM 2024+' },
  'SubtractEmbeddings': { signature: 'SubtractEmbeddings ( embedding1 ; embedding2 )', description: 'Subtracts embedding2 from embedding1 and returns the normalized result. FM 2024+' },
  'NormalizeEmbedding': { signature: 'NormalizeEmbedding ( embedding )', description: 'Normalizes an embedding vector to unit length. FM 2024+' },
  'PredictFromModel': { signature: 'PredictFromModel ( modelName ; embedding )', description: 'Returns a predicted value from a trained regression model. FM 2024+' },
  'CryptAuthCode': { signature: 'CryptAuthCode ( message ; algorithm ; key )', description: 'Returns a hash-based message authentication code (HMAC).' },
  'CryptDigest': { signature: 'CryptDigest ( message ; algorithm )', description: 'Returns a cryptographic hash of message using algorithm.' },
  'CryptEncrypt': { signature: 'CryptEncrypt ( data ; key )', description: 'Encrypts data using key and returns the result as a container.' },
  'CryptDecrypt': { signature: 'CryptDecrypt ( data ; key )', description: 'Decrypts data using key and returns the plaintext.' },
  'CryptGeneratePassKey': { signature: 'CryptGeneratePassKey ( passPhrase ; algorithm )', description: 'Generates a cryptographic key from passPhrase using algorithm. FM 2023+' },
  'CryptGenerateSignature': { signature: 'CryptGenerateSignature ( message ; algorithm ; key )', description: 'Generates a digital signature for message.' },
  'CryptVerifySignature': { signature: 'CryptVerifySignature ( message ; algorithm ; key ; signature )', description: 'Verifies a digital signature for message.' },
  'Get': { signature: 'Get ( parameter )', description: 'Returns system and environment information based on parameter.', example: 'Get ( CurrentDate )\nGet ( LastError )\nGet ( AccountName )' },
  'ExecuteSQL': { signature: 'ExecuteSQL ( sqlQuery ; fieldSeparator ; rowSeparator {; arguments...} )', description: 'Executes an SQL SELECT query against the FileMaker database and returns the results.', example: 'ExecuteSQL ( "SELECT Name FROM Contacts WHERE Active = ?" ; "" ; "¶" ; 1 )' },
  'Base64Encode': { signature: 'Base64Encode ( data )', description: 'Returns a Base64-encoded text representation of data.' },
  'Base64Decode': { signature: 'Base64Decode ( text {; fileName} )', description: 'Returns the decoded binary data from a Base64-encoded text.' },
  'GetContainerAttribute': { signature: 'GetContainerAttribute ( field ; attribute )', description: 'Returns information about data stored in a container field.' },
  'GetHeight': { signature: 'GetHeight ( field )', description: 'Returns the height in points of the image in a container field.' },
  'GetWidth': { signature: 'GetWidth ( field )', description: 'Returns the width in points of the image in a container field.' },
  'GetLiveText': { signature: 'GetLiveText ( field )', description: 'Returns text recognized from an image in a container field.' },
  'GetLiveTextAsJSON': { signature: 'GetLiveTextAsJSON ( field )', description: 'Returns text recognized from an image in a container field as JSON with position info. FM 2024+' },
  'VerifyContainer': { signature: 'VerifyContainer ( field )', description: 'Returns True (1) if the data in a container field is valid.' },
  'GetFieldsOnLayout': { signature: 'GetFieldsOnLayout ( layoutName ; fileName )', description: 'Returns a JSON list of fields on a layout accessible to a find. FM 2025+' },
  'GetRecordIDsFromFoundSet': { signature: 'GetRecordIDsFromFoundSet ( type )', description: 'Returns record IDs from the current found set as a list or JSON array. FM 2025+' },
  'GetBaseTableName': { signature: 'GetBaseTableName ( field )', description: 'Returns the base table name of a field reference. FM 2025+' },
  'GetFieldName': { signature: 'GetFieldName ( field )', description: 'Returns the fully qualified name of field as text.' },
  'GetField': { signature: 'GetField ( fieldName )', description: 'Returns the value of the field specified by fieldName text.' },
  'GetLayoutObjectAttribute': { signature: 'GetLayoutObjectAttribute ( objectName ; attribute )', description: 'Returns information about a named layout object.' },
  'GetNthRecord': { signature: 'GetNthRecord ( field ; recordNumber )', description: 'Returns the value of field in record number recordNumber.' },
  'GetSummary': { signature: 'GetSummary ( summaryField ; breakField )', description: 'Returns the value of a summary field for a specified break group.' },
  'HexEncode': { signature: 'HexEncode ( data )', description: 'Returns a hexadecimal text representation of data.' },
  'HexDecode': { signature: 'HexDecode ( hexText {; fileName} )', description: 'Returns the decoded binary data from a hexadecimal text.' },
  'RGB': { signature: 'RGB ( red ; green ; blue )', description: 'Returns a number that represents an RGB color value.', example: 'RGB ( 255 ; 0 ; 0 ) // Returns red' },
  'TextColor': { signature: 'TextColor ( text ; color )', description: 'Returns text formatted with the specified color.' },
  'TextFont': { signature: 'TextFont ( text ; fontName )', description: 'Returns text formatted with the specified font.' },
  'TextSize': { signature: 'TextSize ( text ; fontSize )', description: 'Returns text formatted with the specified font size.' },
  'TextStyleAdd': { signature: 'TextStyleAdd ( text ; styles )', description: 'Returns text with the specified styles added.' },
  'TextStyleRemove': { signature: 'TextStyleRemove ( text ; styles )', description: 'Returns text with the specified styles removed.' },
};

export function activate(context: vscode.ExtensionContext) {
  // ── JSON to JSONSetElement command ────────────────────────────────────
  let disposable = vscode.commands.registerCommand(
    'functions.jsonToJsonSetElement',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No editor is active');
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) {
        vscode.window.showInformationMessage('No text selected');
        return;
      }
      try {
        const jsonSetElement = jsonToJsonSetElement(text);
        editor.edit((editBuilder) => {
          editBuilder.replace(editor.selection, jsonSetElement);
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(error.message);
        } else {
          vscode.window.showErrorMessage(`Error occurred: ${String(error)}`);
        }
      }
    }
  );
  context.subscriptions.push(disposable);

  // ── Hover documentation provider ─────────────────────────────────────
  const hoverProvider = vscode.languages.registerHoverProvider(
    { language: 'filemaker' },
    {
      provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z][A-Za-z0-9]*/);
        if (!wordRange) return;
        const word = document.getText(wordRange);
        const doc = FM_DOCS[word];
        if (!doc) return;
        const md = new vscode.MarkdownString();
        md.isTrusted = true;
        md.appendCodeblock(doc.signature, 'filemaker');
        md.appendMarkdown(`\n${doc.description}\n`);
        if (doc.example) {
          md.appendMarkdown(`\n**Example:**\n`);
          md.appendCodeblock(doc.example, 'filemaker');
        }
        md.appendMarkdown(`\n[📖 FileMaker Documentation](https://help.claris.com/en/pro-help/content/functions-reference.html)`);
        return new vscode.Hover(md, wordRange);
      }
    }
  );
  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
