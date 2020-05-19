# Deno-Windows

> Simple windows service controller

## Usage
```ts
import WindowsServices from 'https://raw.githubusercontent.com/rafaelferres/deno-windows/1.0.0/mod.ts';

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
WindowsServices.stopService("win").then((services) => {
    console.log(services); // true : sucess
}).catch((err)=> {
    console.log(err);
});
```

or using async/await

```ts
import WindowsServices from 'https://raw.githubusercontent.com/rafaelferres/deno-windows/1.0.0/mod.ts';

let services = await WindowsServices.getServicesList();
console.log(services); // list all windows services

await WindowsServices.startService("win"); // turn on the win service

await WindowsServices.stopService("win"); // turn off the win service
```