"use strict";

// Modules
function blockPendingPosts() {
    let notice = document.querySelector("#pending-notice");
    if (notice) {
        notice.remove();
    }
}

function blockMailNotice() {
    let mail = document.querySelector("#has-mail-notice");
    if (mail) {
        mail.remove();
    }
}

function blockTopHeader() {
    let topHeader = document.querySelector("#headerlogo");
    if (topHeader) {
        topHeader.remove();
    }
}

function blockSiteTitle() {
    let siteTitle = document.querySelector("#site-title");
    if (siteTitle) {
        siteTitle.remove();
    }
}

function blockTopNavbar() {
    let topNavbar = document.querySelector("#navbar");
    if (topNavbar) {
        topNavbar.remove();
    }
}

function blockSubNavbar() {
    let subNavbar = document.querySelector("#subnavbar");
    if (subNavbar) {
        subNavbar.remove();
    }
}

function modifyNavbar() {
    let subNavbar = document.querySelector("#subnavbar");
    let topNavbar = document.querySelector("#navbar");
    let subNavbars = document.querySelectorAll(".subnav");
    let title = document.querySelector("#site-title");
    if (subNavbar) {
        subNavbar.style.padding = "3px";
        subNavbar.style.margin = "auto";
        subNavbar.style.height = "auto";
    }

    if (topNavbar) {
        topNavbar.style.fontSize = "90%";
        topNavbar.style.paddingLeft = "0";
    }

    for (const subNavbar_ of subNavbars) {
        subNavbar_.style.paddingBottom = "3px";
        subNavbar_.style.margin = "0 1em 0 0";
        subNavbar_.style.height = "auto";
        subNavbar_.style.fontSize = "66%";
        subNavbar_.style.width = "100%";
        subNavbar_.style.border = "1px solid #444";
    }

    if (title) {
        title.style.paddingLeft = "0.4em";
    }
}

function blockPreviews() {
    let popular = document.querySelector("#popular-preview");
    if (popular) {
        popular.remove();
    }
}

function clickableImages() {
    let image = document.querySelector("#image");
    if (image) {
        image.addEventListener("click", function() {
            location.href = document.querySelector("#highres").href;
        });
    }
}

function pageLoadFix(offset) {
    if (document.querySelector('#paginator')) {
        let plf = document.createElement('div');
        plf.id = 'pageloadfix';
        document.body.append(plf);

        let count = ((window.innerHeight - document.querySelectorAll('.content')[0].clientHeight) + offset) / 9;
        for (let index = 0; index < count; index++) {
            plf.append(document.createElement('br'));
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

    document.head.append(style);
}

// Loader
if (localStorage.getItem('scamenabled')) {
    let offset = Number(localStorage.getItem('pageloadoffset'));
    let image = document.querySelector("#image");
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
