import { combineReducers } from 'redux';
import bundleReducers from './BundleReducer';
import CellReducer from './CellReducer';

const reducers = combineReducers({
    cells: CellReducer,
    bundler: bundleReducers
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;

