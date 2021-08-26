/*global chrome*/
"use strict";

// Modules
var addToFavorites;
var removeFromFavorites;

function alternateFavorite(noFavoriteHover) {
    if (window.location.href.includes('post/show')) {
        addToFavorites = document.getElementById('add-to-favs');
        removeFromFavorites = document.getElementById('remove-from-favs');

        if (noFavoriteHover) {
            addToFavorites.children[0].classList.remove('favoriteIcon');
            removeFromFavorites.children[0].classList.remove('favoriteIcon');
            addToFavorites.children[0].style = 'width: 42px; height: 42px; margin-left: 64px; display: block; background-position: left top; cursor: pointer; background-image: url(//s.sankakucomplex.com/images/hearts.png);'
            removeFromFavorites.children[0].style = 'width: 42px; height: 42px; margin-left: 64px; display: block; background-position:left bottom; cursor: pointer; background-image: url(//s.sankakucomplex.com/images/hearts.png);'
        }

        if (addToFavorites) {
            addToFavorites.onclick = () => {
                addToFavorites.style.display = 'none';
                removeFromFavorites.style.display = '';
            }
        }

        if (removeFromFavorites) {
            removeFromFavorites.onclick = () => {
                addToFavorites.style.display = '';
                removeFromFavorites.style.display = 'none';
            }
        }
    }
}

function autoMuteVideo(customVideoVolume) {
    let post = document.getElementById('image');
    if (post && post.tagName === 'VIDEO') {
        post.volume = customVideoVolume || 0;
    }
}

function handleChildren(conn, instandImageLoad) {
    if (instandImageLoad) {
        for (let i = 0; i < conn.children.length; i++) {
            conn.children[i].style.display = 'block';
        }
    }
}

function imageLoadHook(instandImageLoad, pageUpdateFix) {
    const targetNode = document.getElementsByClassName('content')[0];
    const pag = document.getElementsByClassName('pagination')[0];
    if (!pag) {
        return;
    }

    const config = {
        childList: true
    };

    let page = Number(document.getElementsByClassName('current')[0].innerText);
    pag.innerHTML = `<a href="/?page=${(page - 1 > 0) ? (page - 1) : page}">&lt;&lt;</a>
    <span class="current">${page}</span>
    <a href="/?page=${page + 1}">&gt;&gt;</a>`;

    handleChildren(targetNode.children[targetNode.children.length - 4], instandImageLoad);
    const callback = function(mutationsList /*, observer*/ ) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let target = targetNode.children[targetNode.children.length - 2];
                if (target.classList.contains('content-page')) {
                    handleChildren(targetNode.children[targetNode.children.length - 2], instandImageLoad);
                    if (pageUpdateFix) {
                        pag.children[0].href = pag.children[0].href.replaceAll(`?page=${(page - 1 > 0) ? (page - 1) : page}`, `?page=${page}`);
                        pag.children[2].href = pag.children[2].href.replaceAll(`?page=${page + 1}`, `?page=${page + 2}`);
                        pag.children[1].innerText = ++page;
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

/*
function customTagHighlights() {}

function customTresholds() {}

function customShortcuts() {}

function customModeColors() {}

function userFollowing() {}

function tagTracker() {}
*/

// Loader
if (localStorage.getItem('scmuenabled')) {
    let customVideoVolume = (localStorage.getItem('customvideovolume') / 100);
    let noFavoriteHover = (localStorage.getItem('nofavoritehover')) ? true : false;
    let instandImageLoad = (localStorage.getItem('instandimageload')) ? true : false;
    // let customImageHightlights = (localStorage.getItem('customimagehighlights')) ? true : false;
    let pageUpdateFix = (localStorage.getItem('pageupdatefix')) ? true : false;

    if (localStorage.getItem('alternatefavorite')) {
        alternateFavorite(noFavoriteHover);
    }
    if (localStorage.getItem('automutevideo')) {
        autoMuteVideo(customVideoVolume);
    }
    if (localStorage.getItem('imageloadhook')) {
        imageLoadHook(instandImageLoad, pageUpdateFix);
    }
    /*
    if (localStorage.getItem('customtaghighlights')) {
        customTagHighlights();
    }
    if (localStorage.getItem('customtresholds')) {
        customTresholds();
    }
    if (localStorage.getItem('customshortcuts')) {
        customShortcuts();
    }
    if (localStorage.getItem('custommodecolors')) {
        customModeColors();
    }
    if (localStorage.getItem('userfollowing')) {
        userFollowing();
    }
    if (localStorage.getItem('tagtracker')) {
        tagTracker();
    }
    */
}
