/*global chrome*/
"use strict";

// ! Performance analytics, comment out if not using
const scploPerf = performance.now();

// Modules
function optimizedPaging(pagingAwaitId, pagingBatchCount, pagingTargetId) {
    const autoPaging = document.querySelector("#sc-auto-toggle");
    if (!autoPaging) {
        return;
    }

    const optionList = document.querySelector("#sc-auto-toggle").parentNode.parentNode.parentNode;
    const optimizedPagingDefault = true; // [[true="on"][false="off"]];
    let optimizedPaging = sessionStorage.getItem('optimizedPaging');

    if (!document.querySelector("#sc-auto-toggle")) {
        return;
    }

    if (optimizedPagingDefault) {
        if (optimizedPaging == "off") {
            sessionStorage.setItem("optimizedPaging", "off");
            optimizedPaging = "off";
        } else {
            sessionStorage.setItem("optimizedPaging", "on");
            optimizedPaging = "on";
        }
    } else {
        if (optimizedPaging == "on") {
            sessionStorage.setItem("optimizedPaging", "on");
            optimizedPaging = "on";
        } else {
            sessionStorage.setItem("optimizedPaging", "off");
            optimizedPaging = "off";
        }
    }

    const FPC = document.createElement("div");
    FPC.innerHTML = `<h5>Optimized Paging</h5>`;

    const FP = document.createElement("ul");
    FP.innerHTML = optimizedPaging === "on" ? `<li><a href="#">Enabled: <span>On</span></a></li>` : `<li><a href="#">Enabled: <span>Off</span></a></li>`;

    FP.addEventListener("click", function () {
        if (optimizedPaging === "on") {
            optimizedPaging = "off";
            sessionStorage.setItem("optimizedPaging", "off");
            FP.innerHTML = `<a href="#">Enabled: <span>Off</span></a>`;
        } else {
            optimizedPaging = "on";
            sessionStorage.setItem("optimizedPaging", "on");
            FP.innerHTML = `<a href="#">Enabled: <span>On</span></a>`;
        }
    });

    FPC.append(FP);
    optionList.append(FPC);
    var initialize = true;

    setInterval(function () {
        if (autoPaging.textContent == "Enabled: On" && optimizedPaging && document.querySelector(`#content-page-${pagingAwaitId}`)) {
            for (var index = 0; index < pagingBatchCount; index++) {
                if (initialize) {
                    initialize = false;
                    if (document.querySelector("#popular-preview")) {
                        let popularPreview = document.querySelector(`#popular-preview`);
                        let target = document.querySelector(`#content-page-${pagingAwaitId}`);
                        target.parentNode.replaceChild(popularPreview, target.parentNode.children[0]);
                    } else {
                        let target = document.querySelector(`#content-page-${pagingAwaitId}`).parentNode.children[0];
                        target.remove();
                    }
                } else {
                    let target = document.querySelector(`#content-page-${pagingTargetId}`);
                    target.remove();
                }
                pagingAwaitId += 1;
                pagingTargetId += 1;
            }
        }
    }, 100);
}

function alternativeImageScaling(maxImageSize, imageClickSize, revertOnClick) {
    const image = document.querySelector('#image');
    let clicked = false;

    if (image && image.tagName === 'IMG') {
        setTimeout(() => {
            image.click();
            image.style.height = 'auto';
            if (maxImageSize) {
                image.style.maxWidth = maxImageSize;
            }
        }, 0);

        image.addEventListener('click', (event) => {
            if (revertOnClick && clicked) {
                event.target.style.maxWidth = maxImageSize || '';
                clicked = false;
            } else {
                event.target.style.maxWidth = imageClickSize || '';
                clicked = true;
            }
        });
    }
}

var originalColor = '#1B1B1B';
const container = document.querySelectorAll('.lang-select')[0];
if (container) {
    originalColor = container.children[container.children.length - 1].classList.contains('theme-button-selected') ? '#1B1B1B' : 'rgb(241, 241, 241)';
}

function preventBackgroundColorChange() {
    const style = document.createElement('style');
    style.innerHTML = `.preventBackground { background-color: ${originalColor} !important; }`;
    style.id = 'backgroundHandler';
    document.head.append(style);

    document.body.classList.add('preventBackground');
    const content = document.querySelectorAll('.content')[0];
    if (content) {
        content.classList.add('preventBackground');
    }
}

if (window.location.href.includes('?download')) {
    // TODO: Implement;
}

const modes = [];

function addNewMode(value, name, run) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = name;
    modes.push(value);

    const select = document.querySelector('#mode');
    if (select) {
        select.append(option);
        select.addEventListener('change', (event) => {
            if (event.target.value === value) {
                event.stopImmediatePropagation();
                document.body.style.backgroundColor = originalColor;
            }
        }, true);

        document.querySelectorAll('.content')[0].addEventListener('click', (event) => {
            if (select.value !== value || event.target.parentNode && event.target.parentNode.classList.contains('pagination')) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            if (event.target.classList.contains('preview')) {
                run(event);
            }
        }, true);
    }
}

function downloadMode() {
    addNewMode('download', 'Download post', (event) => {
        const split = event.target.parentNode.href.split('/');
        const id = split[split.length - 1];
        chrome.runtime.sendMessage(`open https://chan.sankakucomplex.com/post/show/${id}?download`);
    });
}

function backgroundMode(tabOpeningMode) {
    addNewMode('background', 'View background', (event) => {
        const split = event.target.parentNode.href.split('/');
        const id = split[split.length - 1];
        chrome.runtime.sendMessage(`open ${tabOpeningMode} https://chan.sankakucomplex.com/post/show/${id}`);
    });
}

// Loader
if (!window.location.href.includes('?cache') && window.settings['scploenabled']) {
    if (window.settings['optimizedpaging']) {
        const pagingAwaitId = Number(window.settings['pagingawaitid']);
        const pagingBatchCount = Number(window.settings['pagingbatchcount']);
        const pagingTargetId = Number(window.settings['pagingtargetid']);
        optimizedPaging(pagingAwaitId, pagingBatchCount, pagingTargetId);
    }
    if (window.settings['alternativeimagescaling']) {
        const mis = Number(window.settings['maximagesize']);
        const maxImageSize = (mis === -1) ? '' : `${Number(mis)}%`;
        const ics = Number(window.settings['imageclicksize']);
        const imageClickSize = (ics === -1) ? '' : `${Number(ics)}%`;
        const revertOnClick = (window.settings['revertonclick']) ? true : false;
        alternativeImageScaling(maxImageSize, imageClickSize, revertOnClick);
    }
    if (window.settings['preventbackgroundcolorchange']) preventBackgroundColorChange();
    if (window.settings['downloadmode']) downloadMode();
    if (window.settings['backgroundmode']) {
        const tabOpeningMode = window.settings['tabopeningmode'];
        backgroundMode(tabOpeningMode);
    }

    if (document.querySelector('#mode')) {
        const mode = window.settings['mode'];
        if (mode && mode !== 'undefined') {
            document.querySelector('#mode').value = mode;
        }

        document.querySelector('#mode').addEventListener('blur', (event) => {
            localStorage.setItem('mode', 'undefined');
            if (modes.includes(event.target.value)) {
                localStorage.setItem('mode', event.target.value);
            }
        }, true);
    }
}

// ! Performance analytics, comment out if not using
console.log(`[SankakuAddon] sankaku-scplo took ${performance.now() - scploPerf}ms`);
