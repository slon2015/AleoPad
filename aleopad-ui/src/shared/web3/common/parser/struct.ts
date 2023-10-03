import { parsePrimitiveType } from "./primitive";

function isLeoStructTextValid(structText: string): boolean {
  return structText.startsWith("{") && structText.endsWith("}");
}

function minifyLeoStructText(leoStructText: string): string {
  const textWithoutQuotes = leoStructText.substring(
    1,
    leoStructText.length - 1
  );
  const textWithoutNewLines = textWithoutQuotes.replaceAll("\n", "");
  const textWithoutWhitespaces = textWithoutNewLines.replaceAll(" ", "");
  return textWithoutWhitespaces;
}

function getLeoEntriesCount(structText: string) {
  return Array.from(structText.matchAll(/\:/)).length;
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
  for (; symbol !== ":"; index++) {
    symbol = structText[index];
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
    for (; symbol !== "," && symbol != "}"; index++) {
      symbol = structText[index];
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
