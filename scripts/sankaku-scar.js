/*global chrome*/
"use strict";

// Modules
function blockSearchAds() {
    setInterval(function() {
        let targets = document.getElementsByClassName("scad-i")
        for (var i = 0; i < targets.length; i++) {
            targets.item(i).parentNode.removeChild(targets.item(i));
        }

        targets = document.getElementsByClassName("scad")
        for (var j = 0; j < targets.length; j++) {
            targets.item(j).parentNode.removeChild(targets.item(j));
        }
    }, 100);
}

function blockSidebarAds() {
    let targets = document.getElementsByTagName("ins")
    for (var k = 0; k < targets.length; k++) {
        targets.item(k).parentNode.removeChild(targets.item(k));
    }
}

function blockPopupAds() {
    function run() {
        let popup = document.getElementById("sank-prestitial");
        if (popup) {
            popup.parentNode.removeChild(popup);
        }
    }

    setTimeout(run, 0);
    setTimeout(run, 10);
    setTimeout(run, 100);
}

function blockMediaAds() {
    let media = document.getElementById("share");
    if (media) {
        media.parentNode.removeChild(media);
    }
}

function blockNewsTicker() {
    let news = document.getElementById('news-ticker');
    if (news) {
        news.parentNode.removeChild(news);
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
