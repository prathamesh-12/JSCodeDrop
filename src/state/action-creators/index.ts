import { ActionTypes } from '../action-types';
import { UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellBeforeAction } from '../actions';
import { CellDirection, CellType } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionTypes.UPDATE_CELL,
        payload: {
            id, content
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionTypes.DELETE_CELL,
        payload: id
    }
}

export const moveCell = (id: string, direction: CellDirection): MoveCellAction => {
    return {
        type: ActionTypes.MOVE_CELL,
        payload: {
            id, direction
        }
    }
}

export const insertBeforeCell = (id: string, type: CellType ): InsertCellBeforeAction => {
    return {
        type: ActionTypes.INSERT_CELL_BEFORE,
        payload: {
            id, type
        }
    }
}



