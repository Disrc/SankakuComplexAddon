/*global chrome*/
"use strict";

const fetch = [
    'scsienabled',
    'rule34pahealdownload',
    'rule34xxxdownload',
    'rule34pahealintegration',
    'rule34xxxintegration',
    'chansiteredirect'
];

window['settings'] = JSON.parse(localStorage.getItem('settings'));
chrome.storage.local.get(fetch,
    function (settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
        window['settings'] = JSON.parse(localStorage.getItem('settings'));
    }
);
