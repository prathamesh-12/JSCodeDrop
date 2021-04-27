import React, { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
    error: string;
}

const html = `
            <html lang="en">
                <head>     
                </head>
                <body>
                    <h4 style="color: #ccc; font-style: italic;">Preview:</h4>
                    <div id="root"></div>
                    <script>
                        const handleError = (error) => {
                            const div = document.querySelector('#root');
                            div.innerHTML = '<div style="color: red;"><h4>Error!</h4><p>'+error+'</p></div>';
                            throw error;
                        }

                        window.addEventListener('error', (evt) => {
                            handleError(evt.error);
                        })

                        window.addEventListener('message', (evt) => {
                            try {
                                if(evt.data.error != "") {
                                    return handleError(evt.data.error);
                                }
                                eval(evt.data.code);
                            } catch (error) {
                                handleError(error);
                            }
                        }, false)
                    </script>
                </body>
            </html>
    `;


const Preview: React.FC<PreviewProps> = ({ code, error }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        // posting meesage into the iframe
        const postMsg = {code, error};
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(postMsg, '*');
        }, 50);
    }, [code, error])

    console.log(error);

    return (
        <div className="wrapper-iframe">
            <iframe 
                ref={iframe}
                title="preview"
                sandbox="allow-scripts" 
                srcDoc={html}>
            </iframe>
        </div>
    )
}

export default Preview;