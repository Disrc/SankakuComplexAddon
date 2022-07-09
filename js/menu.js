/*global chrome, state*/
"use strict";

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    })

    if (tabs.length === 0) return;
    if (tabs[0].url.includes('chan.sankakucomplex')) {
        if (!localStorage.getItem('cached')) {
            state.style.color = '#FF761C';
            state.textContent = 'Uncached';
        } else {
            state.style.color = '#FF761C';
            state.textContent = 'Active';
        }
    } else if (tabs[0].url.includes('extension://') && tabs[0].url.includes('/html/options.html')) {
        if (!localStorage.getItem('cached')) {
            state.style.color = '#FF761C';
            state.textContent = 'Uncached';
        } else {
            state.style.color = '#15A2FF';
            state.textContent = 'Configuring';
        }
    } else {
        state.style.color = '#FFC715';
        state.textContent = 'Passive';
    }
})();
