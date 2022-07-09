"use strict";

// Modules
function automaticLogin(email, password) {
    if (document.querySelector('#navbar').children[0].children[0].textContent.includes('Login')) {
        if (window.location.href.includes('/user/login')) {
            const notice = document.querySelector('#notice');
            if (notice && notice.textContent.includes('Access denied')) {
                notice.textContent = 'Automatic login failed - please enter a valid username/email and password!';
                return;
            }

            document.querySelector('#user_name').value = email;
            document.querySelector('#user_password').value = password;
            document.querySelector('input[type="submit"]').click();
        } else {
            localStorage.setItem('automaticLoginSource', window.location.href === 'https://chan.sankakucomplex.com/user/login' ? 'https://chan.sankakucomplex.com/' : window.location.href);
            window.location.href = 'https://chan.sankakucomplex.com/user/login';
        }
    } else if (window.location.href.includes('/user/home')) {
        if (document.querySelector('#notice').textContent.includes("You are now logged in")) {
            window.location.href = localStorage.getItem('automaticLoginSource');
        }
    }
}

function postAnalyzer(saveDate, update) {
    const postId = Number(window.location.href.split('/post/show/')[1])
    const postData = JSON.parse(localStorage.getItem(postId)) ?? {};
    console.log('Fetched', postData);
    var hasUpdated = updatePost(saveDate, update, postId, postData);
    console.log('Updated', postData);
    for (const star of document.querySelectorAll('.star-full')) {
        star.addEventListener('click', () => {
            const rating = Number(star.children[0].title.split(' ')[0]);
            ratePost(saveDate, postId, postData, rating, hasUpdated);
            hasUpdated = true;
            console.log('Rating updated', postData);
        });
    }

    if (saveDate) {
        postData['date'] = new Date().toISOString();
    }
}

function ratePost(saveDate, postId, postData, starRating, hasUpdated) {
    postData['rating'] = starRating;
    if (saveDate) postData['updateDate'] = new Date().toISOString();
    if (!hasUpdated) {
        postData['postDate'] = document.querySelector('#stats').children[1].children[0].childNodes[1].title;
        updatePostData(postData);
    }

    localStorage.setItem(postId, JSON.stringify(postData));
}

function updatePost(saveDate, update, postId, postData) {
    if (!update || Object.keys(postData).length === 0) return false;
    if (saveDate) postData['updateDate'] = new Date().toISOString();
    updatePostData(postData);

    localStorage.setItem(postId, JSON.stringify(postData));
    return true;
}

function updatePostData(postData) {
    postData['copyright'] = []
    postData['studio'] = []
    postData['character'] = []
    postData['artist'] = []
    postData['medium'] = []
    postData['general'] = []
    postData['meta'] = []
    postData['genre'] = []

    const tags = document.querySelector('#tag-sidebar')
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
if (localStorage.getItem('scahenabled') && !window.location.href.includes('?cache') && localStorage.getItem('cached')) {
    if (localStorage.getItem('automaticlogic')) {
        const automaticLoginEmail = localStorage.getItem('automaticloginemail');
        const automaticLoginPassword = localStorage.getItem('automaticloginpassword');
        if (automaticLoginEmail && automaticLoginPassword) {
            automaticLogin(automaticLoginEmail, automaticLoginPassword);
        }
    }

    if (localStorage.getItem('postanalyzer') && window.location.href.includes('/post/show')) {
        const postAnalyzerDate = localStorage.getItem('postanalyzerdate') ? true : false;
        const postAnalyzerUpdate = localStorage.getItem('postanalyzerupdate') ? true : false;
        postAnalyzer(postAnalyzerDate, postAnalyzerUpdate);
    }

    if (localStorage.getItem('forcethemeenabled')) {
        const theme = localStorage.getItem('forcethemetype');
        forceTheme(theme);
    }
}
