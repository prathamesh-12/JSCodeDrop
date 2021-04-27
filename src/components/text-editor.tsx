import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import './text-editor.css';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState('# Header');

    const { updateCell } = useActions();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const listner = (event: MouseEvent) => {
            if(ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditMode(false)
        }

        document.addEventListener('click', listner, {capture: true});

        return () => {
            document.removeEventListener('click', listner, {capture: true});
        }
    }, []);

    if(editMode) {
        return (
            <div className="wrapper-text-editor" ref={ref}>
                <MDEditor 
                    value={cell.content}
                    onChange={(val) => updateCell(cell.id, val || '')}/>
            </div>
        )
    }

    const onMarkDownEdiorClick = () => {
        //evt.stopImmediatePropagation();
        setEditMode(true);
    }

    return (
        <div className="wrapper-text-editor card" onClick={onMarkDownEdiorClick}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click here to start editing ...'} />
            </div>
        </div>
    )
}

export default TextEditor;