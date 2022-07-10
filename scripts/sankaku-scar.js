"use strict";

// ! Performance analytics, comment out if not using
const scarPerf = performance.now();

// Modules
function blockSearchAds() {
    function removeSearchAds() {
        const inner_targets = document.querySelectorAll(".scad-i");
        for (var index = 0; index < inner_targets.length; index++) {
            inner_targets.item(index).remove();
        }

        const targets = document.querySelectorAll(".scad");
        for (var index_ = 0; index_ < targets.length; index_++) {
            targets.item(index_).remove();
        }
    }

    const targetNode = document.querySelector(".content");
    if (targetNode) {
        const observerConfig = { childList: true, subtree: true };
        const observer = new MutationObserver(removeSearchAds);
        observer.observe(targetNode, observerConfig);
    }
}

function blockSidebarAds() {
    const targets = document.querySelectorAll("ins");
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
if (!window.location.href.includes('?cache') && window.settings['scarenabled']) {
    if (window.settings['blocksearchads']) blockSearchAds();
    if (window.settings['blocksidebarads']) blockSidebarAds();
    if (window.settings['blockpopupads']) blockPopupAds();
    if (window.settings['blockmediaads']) blockMediaAds();
    if (window.settings['blocknewsticker']) blockNewsTicker();
}

// ! Performance analytics, comment out if not using
console.log(`[SankakuAddon] sankaku-scar took ${performance.now() - scarPerf}ms`);
