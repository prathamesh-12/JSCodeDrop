/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import  CodeEditor  from './code-editor';
import bundler from '../bundler';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const { updateCell } = useActions();

    const onSubmitClick = async () => {
        const result = await bundler(cell.content);
        setCode(result.code);
        setErr(result.error);
    };

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialvalue={cell.content}
                        onChange={(val: string) => updateCell(cell.id, val)}
                        onCodeSubmit={onSubmitClick}
                    />
                </Resizable>
                {/* <textarea onChange={(e) => setInput(e.target.value)}></textarea> */}
                {/* <div>
                    <button onClick={onSubmitClick}>Submit</button>
                </div> */}
                <Preview code={code} error={err}/>
            </div>
        </Resizable>
    )
}

export default CodeCell;

