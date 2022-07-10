"use strict";

// ! Performance analytics, comment out if not using
const scamPerf = performance.now();

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
        const content = document.querySelector('.content');
        if (content) {
            const plf = document.createElement('div');
            plf.id = 'pageloadfix';
            plf.textContent = 'pageloadfix';
            plf.style.minHeight = `${offset}vh`;
            plf.style.backgroundSize = 'cover';
            plf.style.opacity = '0';
            document.body.append(plf);
        }
    }
}

function betterScrollBar() {
    document.body.style.overflowY = 'scroll';
    const style = document.createElement('style');

    style.innerHTML = `::-webkit-scrollbar { width: 5px; !important }
    ::-webkit-scrollbar-track { background: #222; !important }
    ::-webkit-scrollbar-thumb { background: rgb(118, 118, 118); !important }
    ::-webkit-scrollbar-thumb:hover { background: rgb(99, 98, 98); !important }`;
    document.head.append(style);
}

function constantAppearanceFixes() {
    // These are always loaded to core aspects of the site
    const rankingThumbs = document.querySelectorAll(".ranking-thumbs");
    if (rankingThumbs) {
        for (const thumb of rankingThumbs) {
            thumb.style.width = "auto";
            thumb.style.display = "flex";
        }
    }

    for (const item of document.querySelectorAll('font[color="red"')) {
        const textContent = item.textContent;
        if (textContent.includes("Sankaku Plus")) {
            item.parentElement.remove();
        } else {
            item.parentNode.innerHTML = textContent;
        }
    }

    const selectLang = document.querySelector("#lang-sel");
    if (selectLang && selectLang.value != '/en') {
        alert('SankakuAddon does not support non-English languages.\nChanging your language to English...');
        selectLang.value = '/en';
        selectLang.dispatchEvent(new Event('change'));
    }
}

// Loader
if (!window.location.href.includes('?cache') && window.settings['scamenabled']) {
    if (window.settings['blockpendingposts']) blockPendingPosts();
    if (window.settings['blockmailnotice']) blockMailNotice();
    if (window.settings['blocktopheader']) blockTopHeader();
    if (window.settings['blocksitetitle']) blockSiteTitle();
    if (window.settings['blocktopnavbar']) blockTopNavbar();
    if (window.settings['blocksubnavbar']) blockSubNavbar();
    if (window.settings['modifynavbar']) modifyNavbar();
    if (window.settings['blockpreviews']) blockPreviews();
    if (window.settings['clickableimages']) clickableImages();
    if (window.settings['betterscrollbar']) betterScrollBar();

    setTimeout(() => {
        const image = document.querySelector("#image");
        if (image) image.style.cursorStyle = window.settings['cursorstyle'];
        constantAppearanceFixes();
    }, 0);

    if (window.settings['pageloadfix']) {
        setTimeout(() => {
            const offset = Number(window.settings['pageloadoffset']);
            pageLoadFix(offset);
        }, 0);
    }
}

// ! Performance analytics, comment out if not using
console.log(`[SankakuAddon] sankaku-scam took ${performance.now() - scamPerf}ms`);
