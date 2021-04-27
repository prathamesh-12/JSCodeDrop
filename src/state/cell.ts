export type CellType =  'code' | 'markdown';

export type CellDirection = 'up' | 'down';

export interface Cell {
    id: string,
    content: string,
    type: CellType
}