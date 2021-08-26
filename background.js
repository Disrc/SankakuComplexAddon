/*global chrome*/
"use strict";

chrome.runtime.onInstalled.addListener(() => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    }
})

chrome.runtime.onMessage.addListener(function(message) {
    if (message.includes('open ')) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            let i = tabs[0].index;
            if (message.includes(' closeleft ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open closeleft ', ''),
                    active: false,
                    selected: false,
                    index: i
                });
            } else if (message.includes(' closeright ')) {
                chrome.tabs.create({
                    url: message.replaceAll('open closeright ', ''),
                    active: false,
                    selected: false,
                    index: (i + 1)
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
                    index: i // Default: Close
                });
            }
        });
    } else if (message.includes('cashed')) {
        chrome.tabs.query({
            url: 'https://chan.sankakucomplex.com/?cashe'
        }, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    } else if (message.includes('cashe')) {
        chrome.tabs.create({
            url: 'https://chan.sankakucomplex.com/?cashe',
            active: false,
            selected: false
        });
    } else if (message.includes('reload')) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.reload(tabs[i].id);
            }
        });
    }
});
