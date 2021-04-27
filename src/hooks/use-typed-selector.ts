import {  TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../state';

export const usedTypedSelecor: TypedUseSelectorHook<RootState> = useSelector;