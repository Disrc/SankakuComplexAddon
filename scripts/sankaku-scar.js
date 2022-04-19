"use strict";

// Modules
function blockSearchAds() {
    setInterval(function() {
        let targets = document.querySelectorAll(".scad-i")
        for (var index = 0; index < targets.length; index++) {
            targets.item(index).remove();
        }

        targets = document.querySelectorAll(".scad")
        for (var index_ = 0; index_ < targets.length; index_++) {
            targets.item(index_).remove();
        }
    }, 100);
}

function blockSidebarAds() {
    let targets = document.querySelectorAll("ins")
    for (var k = 0; k < targets.length; k++) {
        targets.item(k).remove();
    }
}

function run() {
    let popup = document.querySelector("#sank-prestitial");
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
    let media = document.querySelector("#share");
    if (media) {
        media.remove();
    }
}

function blockNewsTicker() {
    let news = document.querySelector('#news-ticker');
    if (news) {
        news.remove();
    }
}

// Loader
if (localStorage.getItem('scarenabled')) {
    if (localStorage.getItem('blocksearchads')) {
        blockSearchAds();
    }
    if (localStorage.getItem('blocksidebarads')) {
        blockSidebarAds();
    }
    if (localStorage.getItem('blockpopupads')) {
        blockPopupAds();
    }
    if (localStorage.getItem('blockmediaads')) {
        blockMediaAds();
    }
    if (localStorage.getItem('blocknewsticker')) {
        blockNewsTicker();
    }
}
