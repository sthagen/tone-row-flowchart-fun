import { ElementDefinition } from "cytoscape";
import { parse, toCytoscapeElements } from "graph-selector";

import { getSize } from "./getSize";

/**
 * Takes the text input and the getSize function
 * and returns the elements using the specified parser
 */
export function getElements(text: string): ElementDefinition[] {
  const cyElements = toCytoscapeElements(parse(text));
  return cyElements.map((element) => {
    // if it's an edge continue
    if ("source" in element.data) return element;

    let size: ReturnType<typeof getSize>;
    let style: any = {};

    if ("w" in element.data || "h" in element.data) {
      size = {
        width: "label",
        height: "label",
      };
      if ("w" in element.data) {
        size.width = element.data.w;
        style["text-max-width"] = element.data.w;
      }
      if ("h" in element.data) size.height = element.data.h;
    } else {
      const classes = element.classes
        ? Array.isArray(element.classes)
          ? element.classes
          : element.classes.split(" ")
        : [];
      size = getSize(element?.data?.label, classes);
    }

    // get in-degree and out-degree
    const in_degree = cyElements.filter(
      (e) => "target" in e.data && e.data.target === element.data.id
    ).length;
    const out_degree = cyElements.filter(
      (e) => "source" in e.data && e.data.source === element.data.id
    ).length;

    return {
      ...element,
      style,
      data: {
        ...element.data,
        ...size,
        in_degree,
        out_degree,
      },
    };
  });
}
