# vite-ssr-hmr-repro

The HMR API doesn't work with modules loaded with `ssrLoadModule` — if the module is invalidated, the next time it is loaded it will be instantiated anew, but `import.meta.hot.dispose` callbacks in the old module won't be executed.

This results in things like leaked memory and blocked ports.

Clone this repro, `npm install`, then `node index.js`. Visit https://localhost:4567. You should see 'hello!'. In the terminal, you'll see some logs:

```
module has been alive for 1 seconds
module has been alive for 2 seconds
module has been alive for 3 seconds
module has been alive for 4 seconds
module has been alive for 5 seconds
```

Make a change to `src/index.js`. The terminal will clear, but the messages will keep coming:

```
module has been alive for 6 seconds
module has been alive for 7 seconds
module has been alive for 8 seconds
module has been alive for 9 seconds
module has been alive for 10 seconds
```

Reload https://localhost:4567. The change will have taken effect, but the `import.meta.hot.dispose` callback was ignored, so now we have two live copies of the module:

```
module has been alive for 1 seconds
module has been alive for 11 seconds
module has been alive for 2 seconds
module has been alive for 12 seconds
module has been alive for 3 seconds
module has been alive for 13 seconds
module has been alive for 4 seconds
module has been alive for 14 seconds
module has been alive for 5 seconds
module has been alive for 15 seconds
```

## Expected behaviour

As soon as the module is invalidated, `import.meta.hot.dispose` callbacks are called.
