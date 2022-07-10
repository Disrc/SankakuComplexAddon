/*global chrome*/
"use strict";

// ! Performance analytics, comment out if not using
const scahPerf = performance.now();

// Modules
function automaticLogin(email, password) {
    const navbar = document.querySelector('#navbar');
    if (navbar && navbar.children[0].children[0].textContent.includes('Login')) {
        if (window.location.href.includes('/user/login')) {
            const notice = document.querySelector('#notice');
            if (notice && notice.textContent.includes('Access denied')) {
                notice.textContent = 'Automatic login failed - please enter a valid username/email and password!';
                return true;
            }

            document.querySelector('#user_name').value = email;
            document.querySelector('#user_password').value = password;
            document.querySelector('input[type="submit"]').click();
            return false;
        } else {
            localStorage.setItem('automaticLoginSource', window.location.href === 'https://chan.sankakucomplex.com/user/login' ? 'https://chan.sankakucomplex.com/' : window.location.href);
            window.location.href = 'https://chan.sankakucomplex.com/user/login';
            return false;
        }
    } else {
        if (window.location.href.includes('/user/home') && document.querySelector('#notice').textContent.includes("You are now logged in")) {
            window.location.href = localStorage.getItem('automaticLoginSource');
            return false;
        }
        return true;
    }
}

function postAnalyzer(saveDate, update) {
    const postId = Number(window.location.href.split('/post/show/')[1]);
    chrome.storage.local.get(postId.toString(), (posts) => {
        const postData = posts[postId.toString()] ?? {};
        console.log('Fetched', postData);
        var hasUpdated = updatePost(saveDate, update, postId, postData);
        console.log('Updated', postData);
        for (const star of document.querySelector('.unit-rating').children) {
            star.addEventListener('click', () => {
                const rating = Number(star.children[0].title.split(' ')[0]);
                ratePost(saveDate, postId, postData, rating, hasUpdated);
                hasUpdated = true;
                console.log('Rating updated', postData);
            });
        }
    });
}

function ratePost(saveDate, postId, postData, starRating, hasUpdated) {
    console.log(postData, Object.keys(postData).length);
    if (Object.keys(postData).length === 0) {
        chrome.storage.local.get('posts', (posts) => {
            console.log("Fetched posts", posts);
            if (!posts || !Array.isArray(posts)) {
                posts = [];
            }

            if (!posts.includes(postId)) {
                posts.push(postId);
                chrome.storage.local.set({ posts: posts });
                console.log("Saved posts", posts);
            }
        });
    }

    postData['rating'] = starRating;
    if (saveDate) postData['updateDate'] = new Date().toISOString();
    if (!hasUpdated) {
        postData['postDate'] = document.querySelector('#stats').children[1].children[0].childNodes[1].title;
        updatePostData(postData);
    }

    chrome.storage.local.set({ [postId.toString()]: postData });
}

function updatePost(saveDate, update, postId, postData) {
    if (!update || Object.keys(postData).length === 0) return false;
    if (saveDate) postData['updateDate'] = new Date().toISOString();
    updatePostData(postData);

    chrome.storage.local.set({ [postId.toString()]: postData });
    return true;
}

function updatePostData(postData) {
    postData['copyright'] = [];
    postData['studio'] = [];
    postData['character'] = [];
    postData['artist'] = [];
    postData['medium'] = [];
    postData['general'] = [];
    postData['meta'] = [];
    postData['genre'] = [];

    const tags = document.querySelector('#tag-sidebar');
    for (const tag of tags.children) {
        const tagType = tag.classList[0].split('-')[2];
        const tagName = tag.children[0].textContent;
        postData[tagType].push(tagName);
    }
}

function forceTheme(theme) {
    const selected = document.querySelector('.theme-button-selected');
    if (theme === 'light' && selected.classList.contains('theme-button-dark')) {
        document.querySelector('.theme-button-light').click();
    } else if (theme === 'dark' && selected.classList.contains('theme-button-light')) {
        document.querySelector('.theme-button-dark').click();
    }
}

// Loader
if (!window.location.href.includes('?cache') && window.settings['scahenabled']) {
    if (window.settings['automaticlogic']) {
        const automaticLoginEmail = window.settings['automaticloginemail'];
        const automaticLoginPassword = window.settings['automaticloginpassword'];
        if (automaticLoginEmail && automaticLoginPassword) {
            const loginCompleted = automaticLogin(automaticLoginEmail, automaticLoginPassword);

            // ? "Login completed" does not mean the user has actually logged in.
            if (window.settings['forcethemeenabled'] && loginCompleted) {
                forceTheme(window.settings['forcethemetype']);
            }
        }
    } else {
        if (window.settings['forcethemeenabled']) {
            forceTheme(window.settings['forcethemetype']);
        }
    }

    setTimeout(() => {
        if (window.settings['postanalyzer'] && window.location.href.includes('/post/show')) {
            const postAnalyzerDate = window.settings['postanalyzerdate'] ? true : false;
            const postAnalyzerUpdate = window.settings['postanalyzerupdate'] ? true : false;
            postAnalyzer(postAnalyzerDate, postAnalyzerUpdate);
        }
    }, 0);
}

// ! Performance analytics, comment out if not using
console.log(`[SankakuAddon] sankaku-scah took ${performance.now() - scahPerf}ms`);
