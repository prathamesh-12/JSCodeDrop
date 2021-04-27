import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        
        // handle root entry file = index.js
        build.onResolve({ filter: /(^index\.js$)/ }, () => {
            console.log('onResolve  --- Index.js');
            return {
                path: 'index.js',
                namespace: 'a'
            }
        });

        // handle relative paths 
        // for modules and nested modules
        build.onResolve({ filter: /^\.+\// }, (args: any) => {
            return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com'+args.resolveDir + "/").href
            }
        });

        build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args); 

        return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`
        }
        
        // else if (args.path === 'tiny-test-pkg') {
        //     return {
        //         path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //         namespace: 'a'
        //     }
        // }
      });
    }
  };
};