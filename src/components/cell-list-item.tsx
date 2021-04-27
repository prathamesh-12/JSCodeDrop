import React from 'react';
import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import './cell-list-item.css';

interface CellListItemPrps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemPrps> = ({cell}) => {

    let _element: JSX.Element;

    if(cell.type === 'code') {
        _element = <>
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id}/>
                </div>
                <CodeCell cell={cell}/>
            </>
    } else {
        _element = <>
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id}/>
                </div>
                <TextEditor cell={cell}/>
            </>
    }

    return (
        <div className="cell-list-item">
            {_element}
            <ActionBar id={cell.id}/>
        </div>   
    )
}

export default CellListItem;
