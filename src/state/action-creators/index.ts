import { Dispatch } from 'redux';

import { ActionTypes } from '../action-types';
import { UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellBeforeAction, StartBundleAction } from '../actions';
import { CellDirection, CellType } from '../cell';
import { Action } from '../actions';
import { bundler } from '../../bundler';

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

export const insertBeforeCell = (id: string | null, type: CellType ): InsertCellBeforeAction => {
    return {
        type: ActionTypes.INSERT_CELL_BEFORE,
        payload: {
            id, type
        }
    }
}

export const createBundle = (cellId: string, codeInput: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.START_BUNDLE,
            payload: {
                cellId
            }
        });

        const result = await bundler(codeInput);

        dispatch({
            type: ActionTypes.COMPLETE_BUNDLE,
            payload: {
                cellId,
                bundler: {
                    code: result.code,
                    error: result.error
                }
            }
        })
    }
}



