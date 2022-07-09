"use strict";

// Modules
function blockPendingPosts() {
    const notice = document.querySelector("#pending-notice");
    if (notice) {
        notice.remove();
    }
}

function blockMailNotice() {
    const mail = document.querySelector("#has-mail-notice");
    if (mail) {
        mail.remove();
    }
}

function blockTopHeader() {
    const topHeader = document.querySelector("#headerlogo");
    if (topHeader) {
        topHeader.remove();
    }
}

function blockSiteTitle() {
    const siteTitle = document.querySelector("#site-title");
    if (siteTitle) {
        siteTitle.remove();
    }
}

function blockTopNavbar() {
    const topNavbar = document.querySelector("#navbar");
    if (topNavbar) {
        topNavbar.remove();
    }
}

function blockSubNavbar() {
    const subNavbar = document.querySelector("#subnavbar");
    if (subNavbar) {
        subNavbar.remove();
    }
}

function modifyNavbar() {
    const subNavbar = document.querySelector("#subnavbar");
    const topNavbar = document.querySelector("#navbar");
    const subNavbars = document.querySelectorAll(".subnav");
    const title = document.querySelector("#site-title");

    if (subNavbar) {
        subNavbar.style.padding = "3px";
        subNavbar.style.margin = "auto";
        subNavbar.style.height = "auto";
        subNavbar.style.borderLeft = "none";
        subNavbar.style.display = "flex";
        subNavbar.style.alignItems = "center";

        if (window.location.href.includes("/user/home")) {
            subNavbar.style.height = "1.1em";
        }
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
        subNavbar_.style.borderLeft = "none";
        subNavbar_.style.alignItems = "center";
    }

    if (title) {
        title.style.paddingLeft = "0.4em";
    }
}

function blockPreviews() {
    const popular = document.querySelector("#popular-preview");
    if (popular) {
        popular.remove();
    }
}

function clickableImages() {
    const image = document.querySelector("#image");
    if (image) {
        image.addEventListener("click", function () {
            location.href = document.querySelector("#highres").href;
        });
    }
}

function pageLoadFix(offset) {
    if (document.querySelector('#paginator')) {
        const plf = document.createElement('div');
        plf.id = 'pageloadfix';
        document.body.append(plf);

        const content = document.querySelectorAll('.content')[0];
        if (content) {
            const count = ((window.innerHeight - content.clientHeight) + offset) / 9;
            for (let index = 0; index < count; index++) {
                plf.append(document.createElement('br'));
            }
        }
    }
}

function betterScrollBar() {
    document.body.style.overflowY = 'scroll';
    const style = document.createElement('style');

    style.innerHTML = `::-webkit-scrollbar { width: 5px; !important }
    ::-webkit-scrollbar-track { background: #222; !important }
    ::-webkit-scrollbar-thumb { background: rgb(118, 118, 118); !important }
    ::-webkit-scrollbar-thumb:hover { background: rgb(99, 98, 98); !important }`

    document.head.append(style);
}

function constantAppearanceFixes() {
    // These are always loaded to core aspects of the site
    const rankingThumbs = document.getElementsByClassName("ranking-thumbs");
    if (rankingThumbs) {
        for (const thumb of rankingThumbs) {
            thumb.style.width = "auto";
            thumb.style.display = "flex";
        }
    }
}

// Loader
if (localStorage.getItem('scamenabled') && !window.location.href.includes('?cache') && localStorage.getItem('cached')) {
    if (localStorage.getItem('blockpendingposts')) blockPendingPosts();
    if (localStorage.getItem('blockmailnotice')) blockMailNotice();
    if (localStorage.getItem('blocktopheader')) blockTopHeader();
    if (localStorage.getItem('blocksitetitle')) blockSiteTitle();
    if (localStorage.getItem('blocktopnavbar')) blockTopNavbar();
    if (localStorage.getItem('blocksubnavbar')) blockSubNavbar();
    if (localStorage.getItem('modifynavbar')) modifyNavbar();
    if (localStorage.getItem('blockpreviews')) blockPreviews();
    if (localStorage.getItem('clickableimages')) clickableImages();
    if (localStorage.getItem('betterscrollbar')) betterScrollBar();
    if (localStorage.getItem('pageloadfix')) {
        const offset = Number(localStorage.getItem('pageloadoffset'));
        pageLoadFix(offset);
    }

    const image = document.querySelector("#image");
    if (image) image.style.cursorStyle = localStorage.getItem('cursorstyle');
    constantAppearanceFixes();
}
