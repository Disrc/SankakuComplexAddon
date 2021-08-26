/*global chrome*/
"use strict";

// Modules
function blockPendingPosts() {
    let notice = document.getElementById("pending-notice");
    if (notice) {
        notice.parentNode.removeChild(notice);
    }
}

function blockMailNotice() {
    let mail = document.getElementById("has-mail-notice");
    if (mail) {
        mail.parentNode.removeChild(mail);
    }
}

function blockTopHeader() {
    let topHeader = document.getElementById("headerlogo");
    if (topHeader) {
        topHeader.parentNode.removeChild(topHeader);
    }
}

function blockSiteTitle() {
    let siteTitle = document.getElementById("site-title");
    if (siteTitle) {
        siteTitle.parentNode.removeChild(siteTitle);
    }
}

function blockTopNavbar() {
    let topNavbar = document.getElementById("navbar");
    if (topNavbar) {
        topNavbar.parentNode.removeChild(topNavbar);
    }
}

function blockSubNavbar() {
    let subNavbar = document.getElementById("subnavbar");
    if (subNavbar) {
        subNavbar.parentNode.removeChild(subNavbar);
    }
}

function modifyNavbar() {
    let subNavbar = document.getElementById("subnavbar");
    let topNavbar = document.getElementById("navbar");
    let subNavbars = document.getElementsByClassName("subnav");
    let title = document.getElementById("site-title");
    if (subNavbar) {
        subNavbar.style.padding = "3px";
        subNavbar.style.margin = "auto";
        subNavbar.style.height = "auto";
    }

    if (topNavbar) {
        topNavbar.style.fontSize = "90%";
        topNavbar.style.paddingLeft = "0";
    }

    for (let i = 0; i < subNavbars.length; i++) {
        subNavbars[i].style.paddingBottom = "3px";
        subNavbars[i].style.margin = "0 1em 0 0";
        subNavbars[i].style.height = "auto";
        subNavbars[i].style.fontSize = "66%";
        subNavbars[i].style.width = "100%";
        subNavbars[i].style.border = "1px solid #444";
    }

    if (title) {
        title.style.paddingLeft = "0.4em";
    }
}

function blockPreviews() {
    let popular = document.getElementById("popular-preview");
    if (popular) {
        popular.parentNode.removeChild(popular);
    }
}

function clickableImages() {
    let image = document.getElementById("image");
    if (image) {
        image.addEventListener("click", function() {
            location.href = document.getElementById("highres").href;
        });
    }
}

// Loader
if (localStorage.getItem('scamenabled')) {
    let image = document.getElementById("image");
    if (image) {
        image.style.cursorStyle = localStorage.getItem('cursorstyle');
    }

    if (localStorage.getItem('blockpendingposts')) {
        blockPendingPosts();
    }
    if (localStorage.getItem('blockmailnotice')) {
        blockMailNotice();
    }
    if (localStorage.getItem('blocktopheader')) {
        blockTopHeader();
    }
    if (localStorage.getItem('blocksitetitle')) {
        blockSiteTitle();
    }
    if (localStorage.getItem('blocktopnavbar')) {
        blockTopNavbar();
    }
    if (localStorage.getItem('blocksubnavbar')) {
        blockSubNavbar();
    }
    if (localStorage.getItem('modifynavbar')) {
        modifyNavbar();
    }
    if (localStorage.getItem('blockpreviews')) {
        blockPreviews();
    }
    if (localStorage.getItem('clickableimages')) {
        clickableImages();
    }
}
