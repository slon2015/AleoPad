import { PRIVATE_POSTFIX, PUBLIC_POSTFIX } from "./constants";

export function cleanupVisibilityModifier(data: string): string {
  if (data.endsWith(PUBLIC_POSTFIX)) {
    return data.substring(0, data.length - PUBLIC_POSTFIX.length);
  }

  if (data.endsWith(PRIVATE_POSTFIX)) {
    return data.substring(0, data.length - PRIVATE_POSTFIX.length);
  }

  return data;
}
