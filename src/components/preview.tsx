import React, { useRef, useEffect } from 'react';

interface PreviewProps {
    code: string;
}

const html = `
            <html lang="en">
                <head>     
                </head>
                <body>
                    <div id="root"></div>
                    <script>
                        window.addEventListener('message', (evt) => {
                            try {
                                eval(evt.data);
                            } catch (error) {
                                const div = document.querySelector('#root');
                                div.innerHTML = '<div style="color: red;"><h4>Runtime Error!</h4><p>'+error+'</p></div>';
                                throw error;
                            }
                        }, false)
                    </script>
                </body>
            </html>
    `;


const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();



    useEffect(() => {
        iframe.current.srcdoc = html;
        // posting meesage into the iframe
        iframe.current.contentWindow.postMessage(code, '*');
    }, [code])


    return (
        <iframe 
            ref={iframe}
            title="preview"
            sandbox="allow-scripts" 
            srcDoc={html}>
        </iframe>
    )
}

export default Preview;