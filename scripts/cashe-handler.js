/*global chrome*/
"use strict";

if (window.location.href.includes('chan.sankakucomplex.com')) {
    if (window.location.href.includes('?cashe') || !localStorage.getItem('cashed')) {
        window.onbeforeunload = function() {
            return true;
        };

        let fetch = [
            // SCAM
            'scamenabled',
            'blockpendingposts',
            'blockmailnotice',
            'blocktopheader',
            'blocksitetitle',
            'blocktopnavbar',
            'blocksubnavbar',
            'modifynavbar',
            'blockpreviews',
            'clickableimages',
            'cursorstyle',
            'pageloadoffset',
            'pageloadfix',
            'betterscrollbar',

            // SCAR
            'scarenabled',
            'blocksearchads',
            'blocksidebarads',
            'blockpopupads',
            'blockmediaads',
            'blocknewsticker',

            // SCMU
            'scmuenabled',
            'nofavoritehover',
            'customvideovolume',
            'pageupdatefix',
            'instandimageload',
            'customimagehighlights',
            'alternatefavorite',
            'automutevideo',
            'imageloadhook',
            'customtaghighlights',
            'customtresholds',
            'customshortcuts',
            'custommodecolors',
            'userfollowing',
            'tagtracker',

            // SCPLO
            'scploenabled',
            'pagingtargetid',
            'pagingawaitid',
            'pagingbatchcount',
            'maximagesize',
            'imageclicksize',
            'revertonclick',
            'tabopeningmode',
            'optimizedpaging',
            'alternativeimagescaling',
            'preventbackgroundcolorchange',
            'downloadmode',
            'backgroundmode',

            // SCSI
            'scsienabled',
            'rule34pahealdownload',
            'rule34xxxdownload',
            'rule34pahealintegration',
            'rule34xxxintegration',
            'chansiteredirect'
        ];
        chrome.storage.sync.get(fetch,
            function(val) {
                for (let i = 0; i < fetch.length; i++) {
                    const v = fetch[i];
                    localStorage.setItem(v, val[v]);
                }

                localStorage.setItem('cashed', true);
                if (window.location.href.includes('?cashe')) {
                    chrome.runtime.sendMessage('cashed');
                } else {
                    chrome.runtime.sendMessage('reload');
                }
            }
        );
    }
} else {
    // Multi-site fetching
    let fetch = [
        'siteintegrationsenabled',
        'rule34pahealdownload',
        'rule34xxxdownload',
        'rule34pahealintegration',
        'rule34xxxintegration',
        'chansiteredirect'
    ];
    chrome.storage.sync.get(fetch,
        function(val) {
            for (let i = 0; i < fetch.length; i++) {
                const v = fetch[i];
                localStorage.setItem(v, val[v]);
            }
        }
    );
}
