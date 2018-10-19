"use strict"

registerServiceWorker();

function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
            .then(resgistration => {
                console.log("[SW Registered]")
            })
            .catch(error => console.log("[SW not registered]"))
    } else {
        console.log("[SW not supported on your browser]")
    }
}