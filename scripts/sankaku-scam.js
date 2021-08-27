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

function pageLoadFix(offset) {
    if (document.getElementById('paginator')) {
        let plf = document.createElement('div');
        plf.id = 'pageloadfix';
        document.body.appendChild(plf);

        let count = ((window.innerHeight - document.getElementsByClassName('content')[0].clientHeight) + offset) / 9;
        for (let i = 0; i < count; i++) {
            plf.appendChild(document.createElement('br'));
        }
    }
}

function betterScrollBar() {
    document.body.style.overflowY = 'scroll';
    let style = document.createElement('style');

    style.innerHTML = `::-webkit-scrollbar { width: 5px; !important } 
    ::-webkit-scrollbar-track { background: #222; !important } 
    ::-webkit-scrollbar-thumb { background: rgb(118, 118, 118); !important } 
    ::-webkit-scrollbar-thumb:hover { background: rgb(99, 98, 98); !important }`

    document.head.appendChild(style);
}

// Loader
if (localStorage.getItem('scamenabled')) {
    let offset = Number(localStorage.getItem('pageloadoffset'));
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
    if (localStorage.getItem('pageloadfix')) {
        pageLoadFix(offset);
    }
    if (localStorage.getItem('betterscrollbar')) {
        betterScrollBar();
    }
}
