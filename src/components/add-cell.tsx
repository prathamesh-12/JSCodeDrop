import React from "react";
import { useActions } from "../hooks/use-actions";
import './add-cell.css';

interface AddCellProps {
    nextCellId: string | null
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {

    const { insertBeforeCell } = useActions();

    return (
        <>
            <div className="add-cell-wrapper">
                <div className="add-buttons-wrapper">
                    <button 
                        className="button is-info is-small btn-add-cell is-outlined is-rounded"
                        onClick={() => insertBeforeCell(nextCellId, 'code')}>
                        <span>
                            <i className="fas fa-code"></i>
                        </span>
                        <span className="button-lbl">Add Code</span>
                    </button>
                    <button 
                        className="button is-info is-small btn-add-cell is-outlined is-rounded"
                        onClick={() => insertBeforeCell(nextCellId, 'markdown')}
                        >
                        <span>
                            <i className="fas fa-sticky-note"></i>
                        </span>
                        <span className="button-lbl">Add Text</span>
                    </button>
                </div>
                <div className="divider"></div>
            </div>
        </>
    )
}

export default AddCell;