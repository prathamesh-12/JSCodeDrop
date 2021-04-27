import { useActions } from '../hooks/use-actions';
import './action-bar.css';

interface ActionBarProps {
    id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {

    const { deleteCell, moveCell }  = useActions();

    return (
        <div className="action-bar">
            <button 
                className="button is-info is-small"
                onClick={() => moveCell(id, 'up')}>
                <span>
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button 
                className="button is-info is-small"
                onClick={() => moveCell(id, 'down')}>
                    <span>
                        <i className="fas fa-arrow-down"></i>
                    </span>
                </button>
            <button 
                className="button is-info is-small"
                onClick={() => deleteCell(id)}>
                    <span>
                        <i className="fas fa-trash"></i>
                    </span>
                </button>
        </div>
    )
}

export default ActionBar;