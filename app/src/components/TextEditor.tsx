import Editor, { EditorProps } from "@monaco-editor/react";
import { highlight } from "graph-selector";
import { editor } from "monaco-editor";
import { useEffect, useRef } from "react";

import { editorOptions } from "../lib/constants";
import { useLightOrDarkMode } from "../lib/hooks";
import { updateModelMarkers, useEditorStore } from "../lib/useEditorStore";
import Loading from "./Loading";
import { usePromptStore } from "../lib/usePromptStore";
import classNames from "classnames";
import { sanitizeOnPaste } from "../lib/sanitizeOnPaste";

type TextEditorProps = EditorProps & {
  extendOptions?: editor.IEditorOptions;
};

/** A Monaco editor which stays in sync with the current parser */
export function TextEditor({ extendOptions = {}, ...props }: TextEditorProps) {
  const mode = useLightOrDarkMode();
  const theme =
    mode === "light" ? highlight.defaultTheme : highlight.defaultThemeDark;

  const isDragging = useEditorStore((s) => s.isDragging);

  // Update editor theme depending on light mode or dark mode
  useEffect(() => {
    const monaco = useEditorStore.getState().monaco;
    if (!monaco) return;
    monaco.editor.setTheme(theme);
  }, [theme]);

  // Setup Hover Effect
  const hoverLineNumber = useEditorStore((s) => s.hoverLineNumber);
  useEditorHover(hoverLineNumber);

  // Is converted flowchart text being written to the editor?
  const convertIsRunning = usePromptStore((s) => s.convertIsRunning);

  return (
    <Editor
      {...props}
      defaultLanguage={highlight.languageId}
      options={{ ...editorOptions, ...extendOptions, theme }}
      loading={<Loading />}
      beforeMount={highlight.registerHighlighter}
      onMount={(editor, monaco) => {
        // Store the refs in client side zustand state
        useEditorStore.setState({ editor, monaco });

        // Draw any current model markers
        updateModelMarkers();

        // double set the theme
        monaco.editor.setTheme(theme);

        // Listen to when the selection changes
        editor.onDidChangeCursorSelection(() => {
          const selection = editor.getSelection();
          if (selection) {
            // get the text selected
            const text = editor.getModel()?.getValueInRange(selection);
            // store it in the editor
            useEditorStore.setState({ selection: text });
          } else {
            useEditorStore.setState({ selection: "" });
          }
        });

        // Listen to when the user pastes into the document
        editor.onDidPaste((e) => {
          // get the text in the range
          const text = editor.getModel()?.getValueInRange(e.range);
          if (text) {
            // store it in the editor
            useEditorStore.setState({ userPasted: text });

            // sanitize it if necessary
            const sanitized = sanitizeOnPaste(text);
            if (sanitized) {
              replaceRange(editor, e.range, sanitized);
            }
          }
        });
      }}
      wrapperProps={{
        "data-testid": "Editor",
        className: classNames("bg-white dark:bg-neutral-900", {
          "overflow-hidden": isDragging,
          "cursor-wait pointer-events-none opacity-50": convertIsRunning,
        }),
      }}
    />
  );
}

/** Keep track of decoratins on the current editor and show an indication of
 * hovering when the hover line number changes */
function useEditorHover(hoverLineNumber?: number) {
  const decorations = useRef<string[]>([]);
  useEffect(() => {
    const editor = useEditorStore.getState().editor;
    if (!editor) return;
    if (typeof hoverLineNumber === "number") {
      decorations.current = editor.deltaDecorations(
        [],
        [
          {
            range: {
              startLineNumber: hoverLineNumber,
              startColumn: 1,
              endLineNumber: hoverLineNumber,
              endColumn: 1,
            },
            options: {
              isWholeLine: true,
              className: "node-hover",
            },
          },
        ]
      );
    }
    return () => {
      decorations.current = editor.deltaDecorations(decorations.current, []);
    };
  }, [hoverLineNumber]);
}

/**
 * Given the instance of the editor, the range to replace, and the new text
 * replace that range with the new text
 */
/**
 * Given the instance of the editor, the range to replace, and the new text
 * replace that range with the new text
 */
function replaceRange(
  editor: editor.IStandaloneCodeEditor,
  range: editor.ISingleEditOperation["range"],
  text: string
) {
  editor.executeEdits("", [
    {
      range: range,
      text: text,
      forceMoveMarkers: true,
    },
  ]);
}
