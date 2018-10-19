"use strict"

// API stuff
const apiKey     = "cb31e104b8374a858ef6e2fd9bc6f53d";
const endpoint   = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
const entryPoint = document.querySelector(".main");
const loader     = document.querySelector(".loader");


// register service worker on page load
document.addEventListener('DOMContentLoaded', e => {
    registerServiceWorker();
    fetchHeadlines();
})

// register service worker function
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

// fetch Headlines
function fetchHeadlines() {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const { articles } = data;
            articles.map(article => {
                const { title, url, urlToImage } = article;
                if(urlToImage !== null) {
                    loader.style.display = "none";
                    displayHeadlines(title, urlToImage, url);
                }
            }).join("");
        })
        .catch(error => console.log({error}));
}


// display headlines in the DOM
function displayHeadlines(title, urlToImage, url) {
    entryPoint.innerHTML += `
        <div class="card">
            <div class="card-image">
                <img src="${urlToImage}">
            </div>
            <div class="card-body">
                <h3>${title}</h3>
                <a href="${url}" target="_blank">Read More</a>
            </div>
        </div>
    `;
}
