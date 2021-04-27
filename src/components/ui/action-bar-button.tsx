import React from "react";

interface ActionBarButtonProps {
    icon: string,
    onButtonClick: () => void
}

const ActionBarButton: React.FC<ActionBarButtonProps> = ({ icon, onButtonClick }) => {
    return (
        <button 
                className="button is-primary is-small"
                onClick={() => onButtonClick()}>
                <span>
                    <i className="fas fa-arrow-up"></i>
                </span>
        </button>
    )
}

export default ActionBarButton;