/*global chrome*/
"use strict";

if (window.location.href.includes('?cache') || !localStorage.getItem('cached')) {
    window.onbeforeunload = function () {
        return true;
    };

    const fetch = [
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
        'chansiteredirect',

        // SCAH
        'scahenabled',
        'forcethemeenabled',
        'forcethemetype',
        'automaticlogic',
        'automaticloginemail',
        'automaticloginpassword',
        'postanalyzer',
        'postanalyzerdate',
        'postanalyzerupdate',
    ];

    chrome.storage.local.get(fetch,
        function (settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
            localStorage.setItem('cached', true);
            if (window.location.href.includes('?cache')) {
                chrome.runtime.sendMessage('cached');
            } else {
                chrome.runtime.sendMessage('reload');
            }
        }
    );
} else {
    window['settings'] = JSON.parse(localStorage.getItem('settings'));
}
