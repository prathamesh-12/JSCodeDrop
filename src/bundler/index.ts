import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esBuild.Service;

// eslint-disable-next-line import/no-anonymous-default-export
export const bundler =  async (code: string) => {
    if(!service) {
        service =  await esBuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    try {        
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(code)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment'
        })
        return {
            code: result.outputFiles[0].text,
            error: ''
        };
    } catch (error) {
        return {
            code: '',
            error: error
        };
        
    }
};

