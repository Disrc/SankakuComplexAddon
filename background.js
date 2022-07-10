/*global chrome*/
"use strict";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        'initialized': false
    });

    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    }
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.includes('open ')) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            const index = tabs[0].index;
            if (message.includes(' closeleft ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open closeleft ', ''),
                    active: false,
                    selected: false,
                    index: index
                });
            } else if (message.includes(' closeright ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open closeright ', ''),
                    active: false,
                    selected: false,
                    index: (index + 1)
                });
            } else if (message.includes(' farright ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open farright ', ''),
                    active: false,
                    selected: false
                });
            } else if (message.includes(' farleft ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open farleft ', ''),
                    active: false,
                    selected: false,
                    index: 0
                });
            } else {
                chrome.tabs.create({
                    url: message.replaceAll('open  ', ''),
                    active: false,
                    selected: false,
                    index: index // Default: Close
                });
            }
        });
    } else if (message.includes('cached')) {
        chrome.tabs.query({
            url: 'https://chan.sankakucomplex.com/?cache'
        }, function (tabs) {
            for (const tab of tabs) {
                chrome.tabs.remove(tab.id);
            }
        });
    } else if (message.includes('cache')) {
        chrome.tabs.create({
            url: 'https://chan.sankakucomplex.com/?cache',
            active: false,
            selected: false
        });
    } else if (message.includes('reload')) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            for (const tab of tabs) {
                chrome.tabs.reload(tab.id);
            }
        });
    }
});
