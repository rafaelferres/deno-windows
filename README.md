# Deno-Windows

[![CI](https://github.com/rafaelferres/deno-windows/workflows/CI/badge.svg)](https://github.com/rafaelferres/deno-windows/actions?query=workflow%3ACI)

> Simple windows service controller

## Usage
```ts
import WindowsServices from './mod.ts';

// list all windows services
let services = WindowsServices.getServicesList().then((services) => {
    console.log(services);
}).catch((err)=> {
    console.log(err)
});

// turn on the win service
WindowsServices.startService("win").then((services) => {
    console.log(services); // true : sucess
}).catch((err)=> {
    console.log(err);
});

// turn off the win service
await WindowsServices.stopService("win").then((services) => {
    console.log(services); // true : sucess
}).catch((err)=> {
    console.log(err);
});
```

or using async/await

```ts
import WindowsServices from './mod.ts';

let services = await WindowsServices.getServicesList();
console.log(services); // list all windows services

await WindowsServices.startService("win"); // turn on the win service

await WindowsServices.stopService("win"); // turn off the win service
```