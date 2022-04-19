"use strict";

// Modules
var addToFavorites;
var removeFromFavorites;

function alternateFavorite(noFavoriteHover) {
    if (window.location.href.includes('post/show')) {
        addToFavorites = document.querySelector('#add-to-favs');
        removeFromFavorites = document.querySelector('#remove-from-favs');

        if (noFavoriteHover) {
            addToFavorites.children[0].classList.remove('favoriteIcon');
            removeFromFavorites.children[0].classList.remove('favoriteIcon');
            addToFavorites.children[0].style = 'width: 42px; height: 42px; margin-left: 64px; display: block; background-position: left top; cursor: pointer; background-image: url(//s.sankakucomplex.com/images/hearts.png);'
            removeFromFavorites.children[0].style = 'width: 42px; height: 42px; margin-left: 64px; display: block; background-position:left bottom; cursor: pointer; background-image: url(//s.sankakucomplex.com/images/hearts.png);'
        }

        if (addToFavorites) {
            addToFavorites.addEventListener('click', () => {
                addToFavorites.style.display = 'none';
                removeFromFavorites.style.display = '';
            })
        }

        if (removeFromFavorites) {
            removeFromFavorites.addEventListener('click', () => {
                addToFavorites.style.display = '';
                removeFromFavorites.style.display = 'none';
            })
        }
    }
}

function autoMuteVideo(customVideoVolume) {
    let post = document.querySelector('#image');
    if (post && post.tagName === 'VIDEO') {
        post.volume = customVideoVolume || 0;
    }
}

function handleChildren(conn, instantImageLoad) {
    if (instantImageLoad) {
        for (let index = 0; index < conn.children.length; index++) {
            conn.children[index].style.display = 'block';
        }
    }
}

function imageLoadHook(instantImageLoad, pageUpdateFix) {
    const targetNode = document.querySelectorAll('.content')[0];
    const pag = document.querySelectorAll('.pagination')[0];
    if (!pag) {
        return;
    }

    const config = {
        childList: true
    };

    let page = Number(document.querySelectorAll('.current')[0].textContent);
    pag.innerHTML = `<a href="./?page=${(page - 1 > 0) ? (page - 1) : page}">&lt;&lt;</a>
    <span class="current">${page}</span>
    <a href="./?page=${page + 1}">&gt;&gt;</a>`;

    let tryPageLoadFix = true;
    handleChildren(targetNode.children[targetNode.children.length - 4], instantImageLoad);
    const callback = function(mutationsList /*, observer*/ ) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let target = targetNode.children[targetNode.children.length - 2];
                if (target.classList.contains('content-page')) {
                    handleChildren(targetNode.children[targetNode.children.length - 2], instantImageLoad);
                    if (pageUpdateFix) {
                        pag.children[0].href = pag.children[0].href.replaceAll(`?page=${(page - 1 > 0) ? (page - 1) : page}`, `?page=${page}`);
                        pag.children[2].href = pag.children[2].href.replaceAll(`?page=${page + 1}`, `?page=${page + 2}`);
                        pag.children[1].textContent = ++page;
                        if (tryPageLoadFix) {
                            tryPageLoadFix = false;
                            console.log('test');
                            document.querySelector('#pageloadfix').remove();
                        }
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

function customThresholds() {}

function customShortcuts() {}

function customModeColors() {}

function userFollowing() {}

function tagTracker() {}
*/

// Loader
if (localStorage.getItem('scmuenabled')) {
    let customVideoVolume = (localStorage.getItem('customvideovolume') / 100);
    let noFavoriteHover = (localStorage.getItem('nofavoritehover')) ? true : false;
    let instantImageLoad = (localStorage.getItem('instantimageload')) ? true : false;
    // let customImageHightlights = (localStorage.getItem('customimagehighlights')) ? true : false;
    let pageUpdateFix = (localStorage.getItem('pageupdatefix')) ? true : false;

    if (localStorage.getItem('alternatefavorite')) {
        alternateFavorite(noFavoriteHover);
    }
    if (localStorage.getItem('automutevideo')) {
        autoMuteVideo(customVideoVolume);
    }
    if (localStorage.getItem('imageloadhook')) {
        imageLoadHook(instantImageLoad, pageUpdateFix);
    }
    /*
    if (localStorage.getItem('customtaghighlights')) {
        customTagHighlights();
    }
    if (localStorage.getItem('customthresholds')) {
        customThresholds();
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
