import { useEffect, useRef, useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import "./ejs.css"

import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from 'editorjs-alert';
import Checklist from '@editorjs/checklist'
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import ChangeCase from 'editorjs-change-case';
import ToggleBlock from 'editorjs-toggle-block';
import NestedList from '@editorjs/nested-list';

import { useLocation } from 'react-router-dom';

interface EditorProps {
  onChange: (data: OutputData) => void;
}

function Editorjs({ onChange }: EditorProps) {
  const pathname = useLocation().pathname; // This will give you the last part of the URL "/jotter/41/edit"
  const parts = pathname.split("/"); // ["", "jotter", "41", "edit"]
  const lastPart = parts[parts.length - 1]; // "edit"





  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = useCallback(() => {
    if (ejInstance.current) {
      return;
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Write Something, or press "/ " for commands...',
      onReady: () => {
        ejInstance.current = editor;
      },

      data : (lastPart==="edit") ? JSON.parse(localStorage.getItem('editContent') || "{}") : JSON.parse(localStorage.getItem('editorData') || "{}"),

      onChange: async () => {
        const editorData = await editor.saver.save();
        console.log(editorData);
        onChange(editorData);
      },
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
            showLocaleOption: true,
            locale: 'tr', // or ['tr', 'TR', 'tr-TR']
          },
        },
      },
    });
  }, [onChange]);

  useEffect(() => {
    if(ejInstance.current === null){
      initEditor();
  }


    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  },[]);

  return (
    <div>
      <div id="editorjs" className="pt-6"></div>
    </div>
  );
}

export default Editorjs;
