import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import matter from "gray-matter";
import { decompressFromEncodedURIComponent as decompress } from "lz-string";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { delimiters, editorOptions } from "../lib/constants";
import {
  defineThemes,
  languageId,
  themeNameDark,
  themeNameLight,
  useMonacoLanguage,
} from "../lib/registerLanguage";
import { AppContext } from "./AppContext";
import GraphProvider from "./GraphProvider";
import HasError from "./HasError";
import Loading from "./Loading";
import styles from "./ReadOnly.module.css";

function ReadOnly({ compressed = false }: { compressed?: boolean }) {
  const monaco = useMonaco();
  const { graphText = window.location.hash.slice(1) } = useParams<{
    graphText: string;
  }>();
  const textToParse = compressed
    ? decompress(graphText) ?? ""
    : decodeURIComponent(graphText);
  const [hoverLineNumber, setHoverLineNumber] = useState<undefined | number>();
  const editorRef = useRef<null | Parameters<OnMount>[0]>(null);
  const decorations = useRef<any[]>([]);
  const { mode, hasError, hasStyleError } = useContext(AppContext);

  useMonacoLanguage(monaco);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      if (typeof hoverLineNumber === "number" && editor) {
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
      } else {
        decorations.current = editor.deltaDecorations(decorations.current, []);
      }
    }
  }, [hoverLineNumber]);

  const { data: graphOptions } = matter(textToParse, { delimiters });

  const loading = useRef(<Loading />);
  const onMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      defineThemes(monaco, mode);
    },
    [mode]
  );

  return (
    <GraphProvider
      editable={false}
      setHoverLineNumber={setHoverLineNumber}
      textToParse={textToParse}
      graphOptions={graphOptions}
    >
      <Editor
        value={textToParse}
        defaultValue={textToParse}
        defaultLanguage={languageId}
        wrapperClassName={styles.Editor}
        theme={mode === "dark" ? themeNameDark : themeNameLight}
        loading={loading.current}
        options={{
          ...editorOptions,
          readOnly: true,
        }}
        onMount={onMount}
      />
      <HasError show={hasError || hasStyleError} />
    </GraphProvider>
  );
}

export default ReadOnly;
