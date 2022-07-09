"use strict";

// Modules
function blockSearchAds() {
    setInterval(function () {
        const inner_targets = document.querySelectorAll(".scad-i")
        for (var index = 0; index < inner_targets.length; index++) {
            inner_targets.item(index).remove();
        }

        const targets = document.querySelectorAll(".scad")
        for (var index_ = 0; index_ < targets.length; index_++) {
            targets.item(index_).remove();
        }
    }, 100);
}

function blockSidebarAds() {
    const targets = document.querySelectorAll("ins")
    for (var k = 0; k < targets.length; k++) {
        targets.item(k).remove();
    }
}

function run() {
    const popup = document.querySelector("#sank-prestitial");
    if (popup) {
        popup.remove();
    }
}

function blockPopupAds() {
    setTimeout(run, 0);
    setTimeout(run, 10);
    setTimeout(run, 100);
}

function blockMediaAds() {
    const media = document.querySelector("#share");
    if (media) {
        media.remove();
    }
}

function blockNewsTicker() {
    const news = document.querySelector('#news-ticker');
    if (news) {
        news.remove();
    }
}

// Loader
if (localStorage.getItem('scarenabled') && !window.location.href.includes('?cache') && localStorage.getItem('cached')) {
    if (localStorage.getItem('blocksearchads')) blockSearchAds();
    if (localStorage.getItem('blocksidebarads')) blockSidebarAds();
    if (localStorage.getItem('blockpopupads')) blockPopupAds();
    if (localStorage.getItem('blockmediaads')) blockMediaAds();
    if (localStorage.getItem('blocknewsticker')) blockNewsTicker();
}
