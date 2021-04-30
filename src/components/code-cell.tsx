/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react';
import  CodeEditor  from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { usedTypedSelecor } from '../hooks/use-typed-selector';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useActions();
    const bundler = usedTypedSelecor(state => state.bundler[cell.id]);

    const cumulativeCode = usedTypedSelecor((state) => {
            if(!state.cells) { return; }
            const data = state.cells.data;
            const order = state.cells.order;
    
            const fetchedCell = order.map((id: string) => data[id]);

            const display = `
                    import _React from 'react';
                    import _ReactDOM from 'react-dom';

                    var display = (value) => {
                        const root = document.querySelector('#root');

                        if (typeof value === 'object') {
                            if (value.$$typeof && value.props) {
                                _ReactDOM.render(value, root);
                            } else {
                                root.innerHTML = JSON.stringify(value);
                            }
                        } else {
                            root.innerHTML = value;
                        }
                    };
                    `;
            const displayFuncNoop = 'var display = () => {}';

            const cumulativeCellContent = [];

            for(let iCell of fetchedCell) {
                if(iCell.type === 'code') {
                    if (iCell.id === cell.id) {
                        cumulativeCellContent.push(display);
                    } else {
                        cumulativeCellContent.push(displayFuncNoop);
                    }
                    cumulativeCellContent.push(iCell.content);
                }
                if(iCell.id === cell.id) { break; }
            }

            return cumulativeCellContent;
    }) || [];

    useEffect(() => {
        if(!bundler) {
            createBundle(cell.id, cumulativeCode.join("\n"));
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmitClick = () => {
        //const result = await bundler(cell.content);
        //setCode(result.code);
        //setErr(result.error);
        createBundle(cell.id, cumulativeCode.join("\n"));
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
                {
                    (!bundler || bundler.loading) ? <div>Loading ...</div> : <Preview code={bundler.code} error={bundler.err}/>
                }
            </div>
        </Resizable>
    )
}

export default CodeCell;

