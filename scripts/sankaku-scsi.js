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
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
};

function rule34pahealIntegration(rule34pahealDownload) {
    const con = document.querySelector('#Post_Controlsleft').children[1];
    const sk = document.createElement('form');
    sk.method = 'GET';
    sk.innerHTML = '<input type = "submit" value="Import to Sankaku Complex"></input>';

    sk.addEventListener('click', (event) => {
        event.preventDefault();
        const tags = document.querySelector('#tag_editor').value;
        const file = (document.querySelectorAll('.image_info')[0].children[0].children[5].children[1].children[0].href).split('?')[0];
        const sourceContainer = document.querySelectorAll('.image_info')[0].children[0].children[2].children[1].children[0];
        const link = window.location.href.split('#')[0];
        const source = ((sourceContainer.children.length > 0) ? sourceContainer.children[0].href : link) || link;
        const rating = 'Explicit';
        const split = window.location.href.split('/');
        const postId = split[split.length - 1].split('#')[0].split('?')[0];
        window.location.href = rule34pahealDownload ? `${file}?${tags}|${source}|${rating}|${file}|${postId}` : `https://chan.sankakucomplex.com/post/upload?${tags}|${source}|${rating}`;
    })
    con.append(document.createElement('br'));
    con.append(sk);
}

function rule34XXXIntegration(rule34XXXDownload) {
    const con = document.querySelector('#tag-sidebar');
    const sk = document.createElement('div');
    sk.innerHTML = '<br><h5>Sankaku</h5><ul><li><a href="#">Import to Sankaku Complex</a></li></ul>';

    sk.addEventListener('click', (event) => {
        event.preventDefault();
        const tags = document.querySelector('#tags').value;
        const fileContainer = document.querySelectorAll('.link-list')[0].children[1];
        const file = (((fileContainer.children[2].children[0].href) ? fileContainer.children[1].children[0].href.includes('#') : fileContainer.children[2].children[0].href) ? fileContainer.children[2].children[0].href : (fileContainer.children[1].children[0].href || fileContainer.children[2].children[0].href)).split('?')[0];
        const sourceContainer = document.querySelector('#stats').children[1].children[3];
        const source = ((sourceContainer.children.length > 0) ? sourceContainer.children[0].href : window.location.href) || window.location.href;
        const rating = document.querySelector('#stats').children[1].children[3].textContent;
        const postId = window.location.href.split('?')[1].split('&')[2].replaceAll('#', '').replaceAll('id=', '');
        window.location.href = rule34XXXDownload ? `${file}?${tags}|${source}|${rating}|${file}|${postId}` : `https://chan.sankakucomplex.com/post/upload?${tags}|${source}|${rating}`;
    })
    con.append(sk);
}

let link = window.location.href.replaceAll('%20', ' ').replaceAll('%27', '\'');

function rule34pahealDownloader() {
    const parsed = link.slice(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 5) {
        download(parsed[3].replaceAll('https://img.rule34.xxx/', '').replaceAll('https://wimg.rule34.xxx/', '').split('?')[0], `${parsed[4]}.${parsed[3].split('.')[3].split('?')[0]}`);
        setTimeout(() => {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${parsed[0]}|${parsed[1]}|${parsed[2]}`;
        }, 10);
    }
}

function rule34XXXDownloader() {
    const parsed = link.slice(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 5) {
        download(parsed[3].replaceAll('https://peach.paheal.net/', '').replaceAll('https://peach.paheal.net/', '').split('?')[0], `${parsed[4]}.${parsed[3].split('.')[3].split('?')[0]}`);
        setTimeout(() => {
            window.location.href = `https://chan.sankakucomplex.com/post/upload?${parsed[0]}|${parsed[1]}|${parsed[2]}`;
        }, 10);
    }
}

if (link.includes('chan.sankakucomplex.com/post/upload?')) {
    const parsed = link.slice(link.indexOf('?') + 1, link.length).split('|');
    if (parsed.length === 3) {
        document.querySelector('#post_tags').value = parsed[0];
        document.querySelector('#post_source').value = parsed[1];

        switch (parsed[2].replaceAll('Rating: ', '')) {
            case "Explicit":
                document.querySelector('#post_rating_explicit').click();
                break;
            case "Questionable":
                document.querySelector('#post_rating_questionable').click();
                break;
            case "Safe":
                document.querySelector('#post_rating_safe').click();
                break;
            default:
                document.querySelector('#post_rating_explicit').click();
                break;
        }
    }
}

// Loader
if (localStorage.getItem('scsienabled') == 'true' && !window.location.href.includes('?cache') && localStorage.getItem('cached')) {
    if (localStorage.getItem('rule34pahealintegration')) {
        if (window.location.href.indexOf('https://rule34.paheal.net') === 0) {
            const rule34pahealDownload = (localStorage.getItem('rule34pahealdownload')) ? true : false;
            rule34pahealIntegration(rule34pahealDownload);
        } else if (window.location.href.includes('peach.paheal.net') || window.location.href.includes('holly.paheal.net')) {
            rule34pahealDownloader();
        }
    }
    if (localStorage.getItem('rule34xxxintegration')) {
        if (window.location.href.indexOf('https://rule34.xxx/') === 0) {
            const rule34XXXDownload = localStorage.getItem('rule34xxxdownload') ? true : false;
            rule34XXXIntegration(rule34XXXDownload);
        } else if (window.location.href.includes('img.rule34.xxx') || window.location.href.includes('wimg.rule34.xxx')) {
            rule34XXXDownloader();
        }
    }
    if (localStorage.getItem('chansiteredirect')) chanSiteRedirect();
}
