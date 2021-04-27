import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizablePropsConfig: ResizableBoxProps;
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const onDraggableListner = () => {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        }

        window.addEventListener('resize', onDraggableListner);

        return () => {
            window.removeEventListener('resize', onDraggableListner);
        }
    }, []);

    if(direction === 'horizontal') {
        resizablePropsConfig = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            width: innerWidth * 0.5,
            resizeHandles: ['e'],
        }
    } else {
        resizablePropsConfig = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }

    return (
        <ResizableBox {...resizablePropsConfig}>
                {children}
        </ResizableBox>
    )
}

export default Resizable;