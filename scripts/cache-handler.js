/*global chrome*/
"use strict";

if (window.location.href.includes('chan.sankakucomplex.com')) {
    if (window.location.href.includes('?cache') || !localStorage.getItem('cached')) {
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
            'instantimageload',
            'customimagehighlights',
            'alternatefavorite',
            'automutevideo',
            'imageloadhook',
            'customtaghighlights',
            'customthresholds',
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
            function(value) {
                for (const v of fetch) {
                    localStorage.setItem(v, value[v]);
                }

                localStorage.setItem('cached', true);
                if (window.location.href.includes('?cache')) {
                    chrome.runtime.sendMessage('cached');
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
        function(value) {
            for (const v of fetch) {
                localStorage.setItem(v, value[v]);
            }
        }
    );
}
