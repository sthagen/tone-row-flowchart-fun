import { getDefaultText } from "./getDefaultText";

export function getDefaultChart() {
  return `${getDefaultText()}\n\n=====\n{"parser":"graph-selector"}\n=====`;
}
