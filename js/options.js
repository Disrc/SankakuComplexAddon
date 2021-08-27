/*global chrome*/
"use strict";

var registeredOptions = [];

window.onresize = updateScale;
window.onload = updateScale;

function updateScale() {
    if (window.innerWidth / 22 > 70) {
        document.body.style.fontSize = `${window.innerWidth / 22}%`;
    } else {
        document.body.style.fontSize = `70%`;
    }
}

function buildOptionList(id, inputs, status) {
    let optionList;
    if (status) {
        optionList = `<select id=${id}>`;
    } else {
        optionList = `<select id=${id} disabled = "true>"`;
    }

    for (let i = 0; i < inputs.length; i++) {
        optionList += `<option value="${inputs[i].toLowerCase()}" id="${id}-${inputs[i].toLowerCase()}">${inputs[i]}</option>`;
    }
    optionList += '</select>';
    return optionList;
}

function buildInputField(id, inputs, status, args) {
    let defaultValue = inputs[0];
    let str;
    if (status) {
        str = `<input id=${id} `;
    } else {
        str = `<input id=${id} disabled="true"`;
    }

    if (args['min']) {
        str += `min="${args['min']}" `;
    }

    if (args['max']) {
        str += `max="${args['max']}" `;
    }

    return (str + `type="${args['type']}" value="${defaultValue}"></input>`);
}

function registerNewOption(module, id, inputs, name, desc, status, style = 'main', type = 'select', args = []) {
    let target = document.getElementById(`${module}-Options`);
    if (target) {
        let container = document.createElement('div');
        container.classList.add('container');
        container.classList.add(`${style}`);
        let option = '';

        if (type === 'select') {
            option = buildOptionList(id, inputs, status, args);
        } else if (type === 'input') {
            if (args['type']) {
                option = buildInputField(id, inputs, status, args);
            } else {
                option = buildInputField(id, inputs, status, args);
            }
        } else {
            throw new Error(`Type ${type} not found!`);
        }

        if (status == true) {
            container.innerHTML = `<span class="option-name ${style}-name"> ‣ <label for="${id}">${name}:</label></span> <span class="option-con ${style}-con">${option}</span><span class="option-desc ${style}-desc"> » ${desc} <span class="status ${style}-status" title="Option implemented">{Status: <span class="checkmark ${style}-checkmark">✓</span>}</span></span>`;
        } else {
            container.innerHTML = `<span class="option-name ${style}-name"> ‣ <label for="${id}">${name}:</label></span> <span class="option-con ${style}-con">${option}</span><span class="option-desc ${style}-desc"> » ${desc} <span class="status ${style}-status" title="Option not implemented">{Status: <span class="cross ${style}-cross">✗</span>}</span></span>`;
        }

        target.appendChild(container);
        registeredOptions.push(id);
    } else {
        throw new Error(`Module ${module} not found!`);
    }
}

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
registerNewOption('SCAM', 'pageloadoffset', [500], 'Page Load Fix Offset', 'Offset value for page load fix to active [Default: 24.5"];', true, 'sub', 'input', {
    'type': 'number',
    'min': '0'
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

registerNewOption('SCPLO', 'alternativeimagescaling', ['false', 'true'], 'Alternative Image Scaling', 'Enables Alternative Image Scaling [Doesn\t work with clickable images];', true);
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
registerNewOption('SCPLO', 'revertonclick', ['false', 'true'], 'Revert On Click', 'Reverts Image Size on [2nd] Click;', true, 'sub');
registerNewOption('SCPLO', 'preventbackgroundcolorchange', ['false', 'true'], 'Prevent Background Color Change', 'Prevents the Background Color Change', true); // TODO: Move to SCMU;
registerNewOption('SCPLO', 'downloadmode', ['true', 'false'], 'Download Mode', 'New mode for downloading full res images;', true);
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
registerNewOption('SCMU', 'instandimageload', ['false', 'true'], 'Instand Image Load', 'Enables Instand Image Loading;', true, 'sub');
/*
registerNewOption('SCMU', 'customimagehighlights', ['false', 'true'], 'Custom Image Highlights', 'Enables Custom Image Highlights;', true, 'sub');
registerNewOption('SCMU', 'customtaghighlights', ['false', 'true'], 'Custom Tag Highlights', 'Enables Custom Tag Highlights;', false);
registerNewOption('SCMU', 'customtresholds', ['false', 'true'], 'Custom Tresholds', 'Enables Custom Tresholds;', false);
registerNewOption('SCMU', 'customshortcuts', ['false', 'true'], 'Custom Shortcuts', 'Enables Custom Shortcuts;', false);
registerNewOption('SCMU', 'custommodecolors', ['false', 'true'], 'Custom Mode Colors', 'Enables Custom Mode Colors;', false);
registerNewOption('SCMU', 'userfollowing', ['false', 'true'], 'Enable User Following', 'Enables User Following Functionality;', false);
registerNewOption('SCMU', 'tagtracker', ['false', 'true'], 'Enable Tag Tracker', 'Enables Tag Tracker Functionality;', false);
*/

// ?> SCSI
registerNewOption('SCSI', 'scsienabled', ['true', 'false'], 'Enabled', 'Enables the addon;', true);
registerNewOption('SCSI', 'rule34pahealintegration', ['false', 'true'], 'Rule34 Integration [paheal]', 'Import posts from rule34 [paheal] to sankaku complex;', true);
registerNewOption('SCSI', 'rule34pahealdownload', ['false', 'true'], 'Auto Download', 'Automatically downloads posts when importing;', true, 'sub');
registerNewOption('SCSI', 'rule34xxxintegration', ['false', 'true'], 'Rule34 Integration [XXX]', 'Import posts from rule34 [xxx] to sankaku complex;', true);
registerNewOption('SCSI', 'rule34xxxdownload', ['false', 'true'], 'Auto Download', 'Automatically downloads posts when importing;', true, 'sub');
registerNewOption('SCSI', 'chansiteredirect', ['false', 'true'], 'Chan Site Redirect', '[www.] -> [chan.];', true);

// END: Register Options

let subs = document.getElementsByClassName('sub-name')
for (let i = 0; i < subs.length; i++) {
    subs[i].innerHTML = "&emsp;" + subs[i].innerHTML.replace('‣', '•');

}

function saveOptions() {
    var save = {};
    for (let i = 0; i < registeredOptions.length; i++) {
        var value = document.getElementById(registeredOptions[i]).value;
        if (value !== 'false') {
            save[`${registeredOptions[i]}`] = value;
        } else {
            save[`${registeredOptions[i]}`] = '';
        }
    }
    chrome.storage.sync.set(save, function() {});
    resetCashe();
}

function restoreOptions() {
    setTimeout(function() {
        if (registeredOptions.length > 0) {
            chrome.storage.sync.get(registeredOptions, function(items) {
                for (let i = 0; i < registeredOptions.length; i++) {
                    let item = items[registeredOptions[i]];
                    if (item) {
                        document.getElementById(registeredOptions[i]).value = item;
                    } else if (item == '') {
                        document.getElementById(registeredOptions[i]).value = 'false';
                    }
                }
            });
        }
    }, 4);
}

var displayActive = false;
var allowErase = false;
var updateMulti = 5;

function resetCashe() {
    if (!displayActive) {
        allowErase = false;
        showUpdate()
        chrome.runtime.sendMessage('cashe');
        setTimeout(() => {
            allowErase = true;
        }, (100 * updateMulti) * 5);
    }
}

function showUpdate() {
    var status = document.getElementById('status');
    if (!displayActive) {
        writeAndErase(status, "«Saving: please wait until the popup closes»");
    }
}

function erase(target) {
    if (!allowErase) {
        setTimeout(() => {
            erase(target)
        }, 50);
        return;
    }

    if (!target) {
        return;
    }

    for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
            target.style.opacity = `${100 - i}%`
        }, i * updateMulti)
    }

    setTimeout(() => {
        target.innerText = '';
        displayActive = false;
        window.onbeforeunload = function() {
            return null;
        };
    }, 101 * updateMulti)
}

function writeAndErase(target, write) {
    displayActive = true;
    window.onbeforeunload = function() {
        return true;
    };

    target.innerText = write;
    target.style.opacity = '0%';

    for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
            target.style.opacity = `${i}%`
        }, i * updateMulti)
    }

    setTimeout(() => {
        erase(target);
    }, 101 * updateMulti)
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
setTimeout(saveOptions, 250);
