/*global chrome*/
"use strict";

// Modules
function chanSiteRedirect() {
    if (window.location.href.includes('https://www.sankakucomplex.com')) {
        window.location.href = 'https://chan.sankakucomplex.com';
    }
}

const download = (path, filename) => {
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};

function rule34pahealIntegration(rule34pahealDownload) {
    let con = document.getElementById('Post_Controlsleft').children[1];
    let sk = document.createElement('form');
    sk.method = 'GET';
    sk.innerHTML = '<input type = "submit" value="Import to Sankaku Complex"></input>';

    sk.onclick = (e) => {
        e.preventDefault();
        let tags = document.getElementById('tag_editor').value;
        let file = document.getElementsByClassName('image_info')[0].children[0].children[5].children[1].children[0].href;
        file = file.split('?')[0];
        let sourceContainer = document.getElementsByClassName('image_info')[0].children[0].children[2].children[1].children[0];
        let link = window.location.href.split('#')[0];
        let source = ((sourceContainer.children.length > 0) ? sourceContainer.children[0].href : link) || link;
        let rating = 'Explicit';
        let split = window.location.href.split('/');
        let postId = split[split.length - 1].split('#')[0].split('?')[0];
        if (rule34pahealDownload) {
            window.location.href = `${file}?${tags}|${source}|${rating}|${file}|${postId}`;
        } else {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${tags}|${source}|${rating}`;
        }
    }
    con.appendChild(document.createElement('br'));
    con.appendChild(sk);
}

function rule34XXXIntegration(rule34XXXDownload) {
    let con = document.getElementById('tag-sidebar');
    let sk = document.createElement('div');
    sk.innerHTML = '<br><h5>Sankaku</h5><ul><li><a href="#">Import to Sankaku Complex</a></li></ul>';

    sk.onclick = (e) => {
        e.preventDefault();
        let tags = document.getElementById('tags').value;
        let fileContainer = document.getElementsByClassName('link-list')[0].children[1];
        let file = ((fileContainer.children[2].children[0].href) ? fileContainer.children[1].children[0].href.includes('#') : fileContainer.children[2].children[0].href) ? fileContainer.children[2].children[0].href : (fileContainer.children[1].children[0].href || fileContainer.children[2].children[0].href);
        file = file.split('?')[0];
        let sourceContainer = document.getElementById('stats').children[1].children[3];
        let source = ((sourceContainer.children.length > 0) ? sourceContainer.children[0].href : window.location.href) || window.location.href;
        let rating = document.getElementById('stats').children[1].children[3].innerText;
        let postId = window.location.href.split('?')[1].split('&')[2].replaceAll('#', '').replaceAll('id=', '');
        if (rule34XXXDownload) {
            window.location.href = `${file}?${tags}|${source}|${rating}|${file}|${postId}`;
        } else {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${tags}|${source}|${rating}`;
        }
    }
    con.appendChild(sk);
}

let link = window.location.href.replaceAll('%20', ' ').replaceAll('%27', '\'');

function rule34pahealDownloader() {
    let parsed = link.substr(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 5) {
        download(parsed[3].replaceAll('https://img.rule34.xxx/', '').replaceAll('https://wimg.rule34.xxx/', '').split('?')[0], `${parsed[4]}.${parsed[3].split('.')[3].split('?')[0]}`);
        setTimeout(() => {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${parsed[0]}|${parsed[1]}|${parsed[2]}`;
        }, 10);
    }
}

function rule34XXXDownloader() {
    let parsed = link.substr(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 5) {
        download(parsed[3].replaceAll('https://peach.paheal.net/', '').replaceAll('https://peach.paheal.net/', '').split('?')[0], `${parsed[4]}.${parsed[3].split('.')[3].split('?')[0]}`);
        setTimeout(() => {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${parsed[0]}|${parsed[1]}|${parsed[2]}`;
        }, 10);
    }
}

if (link.includes('chan.sankakucomplex.com/post/upload?')) {
    let parsed = link.substr(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 3) {
        document.getElementById('post_tags').value = parsed[0];
        document.getElementById('post_source').value = parsed[1];

        switch (parsed[2].replaceAll('Rating: ', '')) {
            case "Explicit":
                document.getElementById('post_rating_explicit').click();
                break;
            case "Questionable":
                document.getElementById('post_rating_questionable').click();
                break;
            case "Safe":
                document.getElementById('post_rating_safe').click();
                break;
            default:
                document.getElementById('post_rating_explicit').click();
                break;
        }
    }
}

// Loader
if (localStorage.getItem('scsienabled') == 'true') {
    let rule34pahealDownload = (localStorage.getItem('rule34pahealdownload')) ? true : false;
    let rule34XXXDownload = localStorage.getItem('rule34xxxdownload') ? true : false;

    if (localStorage.getItem('rule34pahealintegration')) {
        if (window.location.href.indexOf('https://rule34.paheal.net') === 0) {
            rule34pahealIntegration(rule34pahealDownload);
        } else if (window.location.href.includes('peach.paheal.net') || window.location.href.includes('holly.paheal.net')) {
            rule34pahealDownloader();
        }
    }
    if (localStorage.getItem('rule34xxxintegration')) {
        if (window.location.href.indexOf('https://rule34.xxx/') === 0) {
            rule34XXXIntegration(rule34XXXDownload);
        } else if (window.location.href.includes('img.rule34.xxx') || window.location.href.includes('wimg.rule34.xxx')) {
            rule34XXXDownloader();
        }
    }
    if (localStorage.getItem('chansiteredirect')) {
        chanSiteRedirect()
    }
}
