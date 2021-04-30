import produce from "immer";
import {Action} from "../actions";
import { ActionTypes } from "../action-types";

interface BundleState {
    [key: string]: {
        loading: boolean,
        code: string,
        err: string
    }  | undefined
}

const initialState: BundleState = {};

const bundleReducers = produce((state: BundleState = initialState, action: Action): BundleState => {
    switch(action.type) {
        case ActionTypes.START_BUNDLE:
            state[action.payload.cellId] = {
                loading: true,
                code: '',
                err: ''
            }
            return state;
        case ActionTypes.COMPLETE_BUNDLE:
                state[action.payload.cellId] = {
                    loading: false,
                    code: action.payload.bundler.code,
                    err: action.payload.bundler.error
                }
                return state;
        default: return state;
    }
});

export default bundleReducers;