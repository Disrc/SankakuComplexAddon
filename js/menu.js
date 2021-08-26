/*global chrome, state*/
"use strict";

chrome.tabs.query({
    active: true,
    currentWindow: true
}).then((tabs) => {
    if (!tabs.length) return;
    if (tabs[0].url.includes('chan.sankakucomplex')) {
        state.style.color = '#FF761C';
        state.textContent = 'Active';
    } else if (tabs[0].url.includes('extension://') && tabs[0].url.includes('/html/options.html')) {
        state.style.color = '#15A2FF';
        state.textContent = 'Updating';
    } else {
        state.style.color = '#FFC715';
        state.textContent = 'Passive';
    }
});
