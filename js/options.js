/*global chrome*/
"use strict";

const registeredOptions = [];

// START: Register Options

// !> SCAR
registerNewOption('SCAR', 'scarenabled', ['true', 'false'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCAR', 'blocksearchads', ['true', 'false'], 'Block Search Ads', 'Blocks Search Ads;', true);
registerNewOption('SCAR', 'blocksidebarads', ['true', 'false'], 'Block Sidebar Ads', 'Blocks Sidebar Ads;', true);
registerNewOption('SCAR', 'blockpopupads', ['true', 'false'], 'Block Popup Ads', 'Blocks Popup Ads;', true);
registerNewOption('SCAR', 'blockmediaads', ['true', 'false'], 'Block Media Ads', 'Blocks Media Ads;', true);
registerNewOption('SCAR', 'blocknewsticker', ['true', 'false'], 'Block News Ticker', 'Blocks the News Bar at the Top of the Page', true);

// !> SCAM
registerNewOption('SCAM', 'scamenabled', ['true', 'false'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCAM', 'blockpendingposts', ['true', 'false'], 'Block Pending Posts', 'Blocks the Pending Post Notice;', true);
registerNewOption('SCAM', 'blockmailnotice', ['true', 'false'], 'Block Mail Notice', 'Block the Mail Notice;', true);
registerNewOption('SCAM', 'blocktopheader', ['true', 'false'], 'Block Top Header', 'Block the Top Header;', true);
registerNewOption('SCAM', 'blocksitetitle', ['false', 'true'], 'Block Site Title', 'Blocks the Site Title;', true);
registerNewOption('SCAM', 'blocktopnavbar', ['false', 'true'], 'Block Top Navbar', 'Blocks the Top Navbar;', true);
registerNewOption('SCAM', 'blocksubnavbar', ['false', 'true'], 'Block Sub Navbar', 'Blocks the Sub Navbar;', true);
registerNewOption('SCAM', 'modifynavbar', ['true', 'false'], 'Modify Navbar', 'Enables the modified navbar;', true);
registerNewOption('SCAM', 'blockpreviews', ['true', 'false'], 'Block Previews', 'Blocks the Popular Previews;', true);
registerNewOption('SCAM', 'clickableimages', ['false', 'true'], 'Clickable Images', 'Makes images Clickable (View Source);', true);
registerNewOption('SCAM', 'cursorstyle', ['default', 'pointer'], 'Cursor Style', 'Changes Cursor Style for Images;', true);
registerNewOption('SCAM', 'pageloadfix', ['true', 'false'], 'Page Load Fix', 'Fixes Auto Paging not working on small window sizes;', true);
registerNewOption('SCAM', 'pageloadoffset', [90], 'Page Load Fix Offset', 'Offset value for the page load fix in vh%;', true, 'sub', 'input', {
    'type': 'number',
    'min': '0',
    'max': '100'
});
registerNewOption('SCAM', 'betterscrollbar', ['true', 'false'], 'Better Scrollbar', 'Makes the scrollbar look better;', true);

// !> SCPLO
registerNewOption('SCPLO', 'scploenabled', ['true', 'false'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCPLO', 'optimizedpaging', ['true', 'false'], 'Optimized Paging', 'Enables Optimized Paging [Auto Scroll] by removing old posts;', true);
registerNewOption('SCPLO', 'pagingtargetid', [1], 'Paging Target ID', 'Index of first page to get removed;', true, 'sub', 'input', {
    'type': 'number',
    'min': '1'
});
registerNewOption('SCPLO', 'pagingawaitid', [8], 'Paging Await ID', 'Old pages will start getting removed when this page is reached;', true, 'sub', 'input', {
    'type': 'number',
    'min': '1'
});
registerNewOption('SCPLO', 'pagingbatchcount', [4], 'Paging Batch Count', 'How many pages will get removed at once;', true, 'sub', 'input', {
    'type': 'number',
    'min': '1'
});

registerNewOption('SCPLO', 'alternativeimagescaling', ['true', 'false'], 'Alternative Image Scaling', 'Enables Alternative Image Scaling [Doesn\'t work with clickable images];', true);
registerNewOption('SCPLO', 'maximagesize', [100], 'Max Image Size', 'Sets Max Image Size In % [-1 for infinite];', true, 'sub', 'input', {
    'type': 'number',
    'min': '0',
    'max': '5000'
});
registerNewOption('SCPLO', 'imageclicksize', [-1], 'Image Click Size', 'Changes Size of Image on Click [-1 for infinite];', true, 'sub', 'input', {
    'type': 'number',
    'min': '-1',
    'max': '5000'
});
registerNewOption('SCPLO', 'revertonclick', ['true', 'false'], 'Revert On Click', 'Reverts Image Size on [2nd] Click;', true, 'sub');
registerNewOption('SCPLO', 'preventbackgroundcolorchange', ['true', 'false'], 'Prevent Background Color Change', 'Prevents the Background Color Change', true); // TODO: Move to SCMU;
// registerNewOption('SCPLO', 'downloadmode', ['true', 'false'], 'Download Mode', 'New mode for downloading full res images;', true);
registerNewOption('SCPLO', 'backgroundmode', ['true', 'false'], 'Background Mode', 'New mode for opening posts in the background;', true);
registerNewOption('SCPLO', 'tabopeningmode', ['closeright', 'closeleft', 'farright', 'farleft'], 'Tab Opening Mode', 'Defines where new background mode tabs will be opened', true, 'sub');

// !> SCMU
registerNewOption('SCMU', 'scmuenabled', ['true', 'false'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCMU', 'alternatefavorite', ['true', 'false'], 'Alternative Favorite', 'Makes favorite heart toggle faster;', true);
registerNewOption('SCMU', 'nofavoritehover', ['false', 'true'], 'No Favorite Hover', 'Disables the favorite heart change on hover;', true, 'sub');
registerNewOption('SCMU', 'automutevideo', ['false', 'true'], 'Auto Mute Video', 'Automatically mutes videos on page load;', true);
registerNewOption('SCMU', 'customvideovolume', [0], 'Custom Video Volume', 'Sets volume to custom value instead of muting;', true, 'sub', 'input', {
    'type': 'number',
    'min': '1',
    'max': '100'
});
registerNewOption('SCMU', 'imageloadhook', ['true', 'false'], 'Image Load Hook', 'Allows the extensions to hook onto the image loader;', true);
registerNewOption('SCMU', 'pageupdatefix', ['true', 'false'], 'Page Update Fix', 'Fixes current page when disabling auto paging', true, 'sub');
registerNewOption('SCMU', 'instantimageload', ['false', 'true'], 'Instant Image Load', 'Enables Instant Image Loading;', true, 'sub');
/*
registerNewOption('SCMU', 'customimagehighlights', ['false', 'true'], 'Custom Image Highlights', 'Enables Custom Image Highlights;', true, 'sub');
registerNewOption('SCMU', 'customtaghighlights', ['false', 'true'], 'Custom Tag Highlights', 'Enables Custom Tag Highlights;', false);
registerNewOption('SCMU', 'customthresholds', ['false', 'true'], 'Custom Thresholds', 'Enables Custom Thresholds;', false);
registerNewOption('SCMU', 'customshortcuts', ['false', 'true'], 'Custom Shortcuts', 'Enables Custom Shortcuts;', false);
registerNewOption('SCMU', 'custommodecolors', ['false', 'true'], 'Custom Mode Colors', 'Enables Custom Mode Colors;', false);
registerNewOption('SCMU', 'userfollowing', ['false', 'true'], 'Enable User Following', 'Enables User Following Functionality;', false);
registerNewOption('SCMU', 'tagtracker', ['false', 'true'], 'Enable Tag Tracker', 'Enables Tag Tracker Functionality;', false);
*/

// ?> SCSI
registerNewOption('SCSI', 'scsienabled', ['false', 'true'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCSI', 'rule34pahealintegration', ['false', 'true'], 'Rule34 Integration [paheal]', 'Import posts from rule34 [paheal] to sankaku complex;', true);
registerNewOption('SCSI', 'rule34pahealdownload', ['false', 'true'], 'Auto Download', 'Automatically downloads posts when importing;', true, 'sub');
registerNewOption('SCSI', 'rule34xxxintegration', ['false', 'true'], 'Rule34 Integration [XXX]', 'Import posts from rule34 [xxx] to sankaku complex;', true);
registerNewOption('SCSI', 'rule34xxxdownload', ['false', 'true'], 'Auto Download', 'Automatically downloads posts when importing;', true, 'sub');
registerNewOption('SCSI', 'chansiteredirect', ['false', 'true'], 'Chan Site Redirect', '[www.] -> [chan.];', true);

// ?> SCAH
registerNewOption('SCAH', 'scahenabled', ['false', 'true'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCAH', 'forcethemeenabled', ['false', 'true'], 'Force Theme', 'Enables Force Theme;', true);
registerNewOption('SCAH', 'forcethemetype', ['light', 'dark'], 'Force Theme Type', 'Sets the theme type to use;', true, 'sub');
registerNewOption('SCAH', 'automaticlogin', ['false', 'true'], 'Automatic Login', 'Automatically logs in to the site;', true);
registerNewOption('SCAH', 'automaticloginemail', [''], 'Email', 'Email to use for automatic login;', true, 'sub', 'input', {
    'type': 'email'
});
registerNewOption('SCAH', 'automaticloginpassword', [''], 'Password', 'Password to use for automatic login;', true, 'sub', 'input', {
    'type': 'password'
});
registerNewOption('SCAH', 'postanalyzer', ['false', 'true'], 'Post Analyzer', 'Locally analyzes a post when you give it a rating;', true);
registerNewOption('SCAH', 'postanalyzerdate', ['false', 'true'], 'Date', 'Store the access date when analyzing a post;', true, 'sub');
registerNewOption('SCAH', 'postanalyzerupdate', ['true', 'false'], 'Update', 'Check for updates when revisiting an already analyzed post;', true, 'sub');

// END: Register Options

function buildOptionList(id, inputs, status) {
    let optionList = status ? `<select id=${id}>` : `<select id=${id} disabled = "true>"`;

    for (const input of inputs) {
        optionList += `<option value="${input.toLowerCase()}" id="${id}-${input.toLowerCase()}">${input}</option>`;
    }
    optionList += '</select>';
    return optionList;
}

function buildInputField(id, inputs, status, arguments_) {
    const defaultValue = inputs[0];
    let string = status ? `<input id=${id} ` : `<input id=${id} disabled="true"`;

    if (arguments_['min']) {
        string += `min="${arguments_['min']}" `;
    }

    if (arguments_['max']) {
        string += `max="${arguments_['max']}" `;
    }

    return (string + `type="${arguments_['type']}" value="${defaultValue}"></input>`);
}

function registerNewOption(module, id, inputs, name, desc, status, style = 'main', type = 'select', arguments_ = []) {
    const target = document.querySelector(`#${module}-Options`);
    if (target) {
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add(`${style}`);
        let option = '';

        if (type === 'select') {
            option = buildOptionList(id, inputs, status);
        } else if (type === 'input') {
            option = buildInputField(id, inputs, status, arguments_);
        } else {
            throw new Error(`Type ${type} not found!`);
        }

        container.innerHTML = /*html*/
            `<span class="option-name ${style}-name"> ‣ <label for="${id}">${name}:</label></span> <span class="option-con ${style}-con">${option}</span><span class="option-desc ${style}-desc"> » ${desc} <span class="status ${style}-status" title="Option ${status ? "" : "not "}implemented">{Status: <span class="${status ? "checkmark" : "cross"} ${style}-${status ? "checkmark" : "cross"}">✓</span>}</span></span>`;

        target.append(container);
        registeredOptions.push(id);
    } else {
        throw new Error(`Module ${module} not found!`);
    }
}

const subs = document.querySelectorAll('.sub-name');
for (const sub of subs) {
    sub.innerHTML = "&emsp;" + sub.innerHTML.replace('‣', '•');

}

function saveOptions() {
    const save = {};
    for (const registeredOption of registeredOptions) {
        var value = document.querySelector('#' + registeredOption).value;
        if (value !== 'false') {
            save[`${registeredOption}`] = value;
        } else {
            save[`${registeredOption}`] = '';
        }
    }
    chrome.storage.local.set(save, function () {});
    resetcache();
}

function restoreOptions() {
    setTimeout(function () {
        if (registeredOptions.length > 0) {
            chrome.storage.local.get(registeredOptions, function (options) {
                for (const registeredOption of registeredOptions) {
                    const option = document.querySelector('#' + registeredOption);
                    const item = options[registeredOption];
                    if (item) {
                        option.value = item;
                    } else if (item == '' && option.tagName.toLowerCase() === 'select') {
                        option.value = 'false';
                    }
                }
            });
        }
    }, 4);
}

const updateMulti = 5;
let displayActive = false;
let allowErase = false;

function resetcache() {
    if (!displayActive) {
        updateAnalytics();
        localStorage.setItem('cached', false);
        allowErase = false;
        showUpdate();
        chrome.runtime.sendMessage('cache');
        setTimeout(() => {
            allowErase = true;
        }, (100 * updateMulti) * 5);
        localStorage.setItem('cached', true);
    }
}

function showUpdate() {
    if (!displayActive) {
        writeAndErase(document.querySelector('#status'), "«Saving: please wait until the popup closes»");
    }
}

function erase(target) {
    if (!allowErase) {
        setTimeout(() => {
            erase(target);
        }, 50);
        return;
    }

    if (!target) {
        return;
    }

    for (let index = 1; index <= 100; index++) {
        setTimeout(() => {
            target.style.opacity = `${100 - index}%`;
        }, index * updateMulti);
    }

    setTimeout(() => {
        target.textContent = '';
        displayActive = false;
        /*window.addEventListener('beforeunload', function () {
            return;
        });*/
    }, 101 * updateMulti);
}

function writeAndErase(target, write) {
    displayActive = true;
    window.onbeforeunload = function () {
        return true;
    };

    target.textContent = write;
    target.style.opacity = '0%';

    for (let index = 1; index <= 100; index++) {
        setTimeout(() => {
            target.style.opacity = `${index}%`;
        }, index * updateMulti);
    }

    setTimeout(() => {
        erase(target);
    }, 101 * updateMulti);
}

function updateAnalytics() {
    const analytics = document.querySelector('#analytics');
    if (document.querySelector('#postanalyzer').value === 'false') {
        analytics.setAttribute('disabled', 'disabled');
    } else {
        analytics.removeAttribute('disabled');
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
document.querySelector('#analytics').addEventListener('click', () => window.location.href = './analytics.html');
chrome.storage.local.get('initialized', function (options) {
    if (!options['initialized']) {
        setTimeout(saveOptions, 250);
        chrome.storage.local.set({
            'initialized': true
        });
    }
});
