import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esBuild.Service;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (code: string) => {
    if(!service) {
        service =  await esBuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
    }


    const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
            unpkgPathPlugin(),
            fetchPlugin(code)
        ],
        define: {
            'process.ENV.NODE_ENV': '"production"',
            global: 'window'
        }
    })

    return result.outputFiles[0].text;
    
};