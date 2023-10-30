import { parsePrimitiveType } from "./primitive";

function isLeoStructTextValid(structText: string): boolean {
  return structText.startsWith("{") && structText.endsWith("}");
}

function minifyLeoStructText(leoStructText: string): string {
  const textWithoutQuotes =
    leoStructText.startsWith('"') && leoStructText.endsWith('"')
      ? leoStructText.substring(1, leoStructText.length - 1)
      : leoStructText;
  const textWithoutNewLines = textWithoutQuotes.replaceAll("\n", "");
  const textWithoutWhitespaces = textWithoutNewLines.replaceAll(" ", "");
  return textWithoutWhitespaces;
}

function getLeoEntriesCount(structText: string) {
  return Array.from(structText.matchAll(/\:/g)).length;
}

function cleanEndSymbol(value: string, symbol: string): string {
  const trimed = value.trim();
  if (trimed.endsWith(symbol)) {
    return trimed.substring(0, trimed.length - symbol.length);
  }

  return trimed;
}

function getLeoStructEntry(structText: string): {
  key: string;
  value: string;
  isValueStruct: boolean;
} {
  if (structText[0] === "{") {
    structText = structText.substring(1);
  }

  let key = "";
  let symbol = "";
  let index = 0;
  for (; ; index++) {
    symbol = structText[index];
    if (symbol === ":") {
      break;
    }
    key += symbol;
  }

  index++;

  const isValueStruct = structText[index] === "{";
  if (isValueStruct) {
    let openedBracks = 1;
    let closedBracks = 0;

    let value = "";

    for (; openedBracks > closedBracks; index++) {
      const element = structText[index];
      if (element === "{") {
        openedBracks++;
      }
      if (element === "}") {
        closedBracks++;
      }
      value += element;
    }

    return {
      key,
      value,
      isValueStruct,
    };
  } else {
    let value = "";
    for (; ; index++) {
      symbol = structText[index];
      if (symbol === "," || symbol === "}") {
        break;
      }
      value += symbol;
    }

    return {
      key,
      value,
      isValueStruct,
    };
  }
}

export function parseLeoStruct(leoStructText: string): any {
  let minifiedText = minifyLeoStructText(leoStructText);

  if (!isLeoStructTextValid(minifiedText)) {
    throw new Error(`Invalid Leo struct text ${leoStructText}`);
  }

  const entriesCount = getLeoEntriesCount(minifiedText);

  const result = new Map();

  for (let index = 0; index < entriesCount; index++) {
    const { key, value, isValueStruct } = getLeoStructEntry(minifiedText);
    if (isValueStruct) {
      result.set(key, parseLeoStruct(value));
    }
    result.set(key, parsePrimitiveType(value));
    minifiedText = minifiedText.replace(`${key}:${value},`, "");
  }

  return Object.fromEntries(result.entries());
}
