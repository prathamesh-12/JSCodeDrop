import React from 'react';
import { usedTypedSelecor } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {

    const cells = usedTypedSelecor((state) => {
        return state.cells?.order.map((id: string) => {
            return state.cells?.data[id];
        })
    });

    const renderedCells = cells?.map((cell: any, idx: number) => {
            return (
            <>
                <AddCell key={idx} nextCellId={cell.id}/>
                <CellListItem key={cell.id} cell={cell}/>
            </>)
    })

    return (
        <div>
            {renderedCells}
            <AddCell nextCellId={null}/>
        </div>
    )
}

export default CellList;
