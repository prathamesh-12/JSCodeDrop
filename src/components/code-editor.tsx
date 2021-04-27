import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css'

interface CodeEditorProps {
    initialvalue: string;
    onChange(value: string): void;
    onCodeSubmit(): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialvalue, onChange, onCodeSubmit }) => {
    const editorRef = useRef<any>();
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

    }

    const onFormatClickHandler = () => {
        const _unformatteCode = editorRef.current.getModel().getValue();
        
        const _formattedCode = prettier.format(_unformatteCode, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            useTabs: false,
            singleQuote: true
        })

        editorRef.current.setValue(_formattedCode);
    }

    const onCodeSubmitHanlder = () => {
        onCodeSubmit();
    }



    return (
        <div className="wrapper-editor">
            <button 
                className="button btn-format is-info is-outlined"
                onClick={onFormatClickHandler}>
                    Format
            </button>
            <button 
                className="button btn-run is-primary is-outlined"
                onClick={onCodeSubmitHanlder}>
                    Run Code
            </button>
            <MonacoEditor 
                editorDidMount={onEditorDidMount}
                height="100%"
                theme="dark"
                language="javascript"
                value={initialvalue}
                options={{
                    wordWrap: 'on',
                    showUnused: true,
                    folding: false,
                    lineNumbersMinChars: 3,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
}

export default CodeEditor;