import { combineReducers } from 'redux';
import CellReducer from './CellReducer';

const reducers = combineReducers({
    cells: CellReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;

