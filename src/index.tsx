/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import  CodeEditor  from './components/code-editor';
import bundler from './bundler';

import 'bulmaswatch/superhero/bulmaswatch.min.css'
import Preview from './components/preview';


const App = () => {

    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onSubmitClick = async () => {
        const output = await bundler(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor 
                initialvalue="const a = 1;"
                onChange={(val: string) => setInput(val)}
            />
            {/* <textarea onChange={(e) => setInput(e.target.value)}></textarea> */}
            <div>
                <button onClick={onSubmitClick}>Submit</button>
            </div>
            <Preview code={code}/>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));

