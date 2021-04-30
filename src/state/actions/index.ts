import { ActionTypes } from '../action-types';
import { CellDirection, CellType } from '../cell';

export interface MoveCellAction {
    type: ActionTypes.MOVE_CELL,
    payload: {
        id: string,
        direction: CellDirection
    }
}

export interface DeleteCellAction {
    type: ActionTypes.DELETE_CELL,
    payload: string
}

export interface InsertCellBeforeAction {
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: string | null,
        type: CellType
    }
}

export interface UpdateCellAction {
    type: ActionTypes.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }
}

export interface StartBundleAction {
    type: ActionTypes.START_BUNDLE,
    payload: {
        cellId: string
    }
}

export interface CompleteBundleAction {
    type: ActionTypes.COMPLETE_BUNDLE,
    payload: {
        cellId: string,
        bundler: {
            code: string,
            error: string
        }
    }
}


export type Action = 
                MoveCellAction | 
                DeleteCellAction | 
                InsertCellBeforeAction | 
                UpdateCellAction | 
                StartBundleAction | 
                CompleteBundleAction;