import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
import "./ejsview.css";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Alert from 'editorjs-alert';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import ChangeCase from 'editorjs-change-case';
import ToggleBlock from 'editorjs-toggle-block';
import NestedList from '@editorjs/nested-list';

function Editorjs({ content }: { content: any }) {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    if (ejInstance.current) {
      return; // Editor is already initialized
    }

    const editor = new EditorJS({
      holder: 'editorjsView',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: content,
      readOnly: true,
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 3,
            allowAnchor: true,
            anchorLength: 200,
          },
        },
        liste: List,
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        
        delimiter: Delimiter,
        alert: Alert,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: Table,
        code: CodeTool,
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        changeCase: {
          class: ChangeCase,
          config: {
            showLocaleOption: true, // enable locale case options
            locale: 'tr', // or ['tr', 'TR', 'tr-TR']
          },
        },
      },
    });
  };

  useEffect(() => {
    initEditor();

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, [content]);

  return (
    <div id="editorjsView" className="pt-6"></div>
  );
}

export default Editorjs;
