/*global chrome*/
"use strict";

// Modules
function optimizedPaging(pagingAwaitId, pagingBatchCount, pagingTargetId) {
    var autoPaging = document.getElementById("sc-auto-toggle");
    if (!autoPaging) {
        return;
    }

    var optionList = document.getElementById("sc-auto-toggle").parentNode.parentNode.parentNode;
    var optimizedPaging = sessionStorage.getItem('optimizedPaging');
    var optimizedPagingDefault = true; // [[true="on"][false="off"]];

    if (!document.getElementById("sc-auto-toggle")) {
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

    var FPC = document.createElement("div");
    FPC.innerHTML = `<h5>Optimized Paging</h5>`;

    var FP = document.createElement("ul");
    if (optimizedPaging === "on") {
        FP.innerHTML = `<li><a href="#">Enabled: <span>On</span></a></li>`;
    } else {
        FP.innerHTML = `<li><a href="#">Enabled: <span>Off</span></a></li>`;
    }

    FP.addEventListener("click", function() {
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

    FPC.appendChild(FP);
    optionList.appendChild(FPC);
    var initialize = true;

    setInterval(function() {
        if (autoPaging.innerText == "Enabled: On") {
            if (optimizedPaging) {
                if (document.getElementById(`content-page-${pagingAwaitId}`)) {
                    for (var i = 0; i < pagingBatchCount; i++) {
                        if (initialize) {
                            initialize = false;
                            if (document.getElementById("popular-preview")) {
                                let popularPreview = document.getElementById(`popular-preview`);
                                let target = document.getElementById(`content-page-${pagingAwaitId}`);
                                target.parentNode.replaceChild(popularPreview, target.parentNode.children[0])
                            } else {
                                let target = document.getElementById(`content-page-${pagingAwaitId}`).parentNode.children[0];
                                target.parentNode.removeChild(target);
                            }
                        } else {
                            let target = document.getElementById(`content-page-${pagingTargetId}`)
                            target.parentNode.removeChild(target);
                        }
                        pagingAwaitId += 1;
                        pagingTargetId += 1;
                    }
                }
            }
        }
    }, 100);
}

var clicked = false;

function alternativeImageScaling(maxImageSize, imageClickSize, revertOnClick) {
    let img = document.getElementById('image');
    if (img && img.tagName === 'IMG') {
        img.click();
        img.style.height = 'auto'

        if (maxImageSize) {
            img.style.maxWidth = maxImageSize;
        }

        img.onclick = (e) => {
            if (revertOnClick && clicked) {
                e.target.style.maxWidth = maxImageSize || '';
                clicked = false;
            } else {
                e.target.style.maxWidth = imageClickSize || '';
                clicked = true;
            }
        }
    }
}

var originalColor = '#1B1B1B';
let container = document.getElementsByClassName('lang-select')[0];
if (container) {
    if (container.children[container.children.length - 1].classList.contains('theme-button-selected')) {
        originalColor = '#1B1B1B';
    } else {
        originalColor = 'rgb(241, 241, 241)';
    }
}

function preventBackgroundColorChange() {
    let style = document.createElement('style');
    style.innerHTML = `.preventBackground { background-color: ${originalColor} !important; }`;
    style.id = 'backgroundHandler';
    document.head.appendChild(style);

    document.body.classList.add('preventBackground');
    let content = document.getElementsByClassName('content')[0];
    if (content) {
        content.classList.add('preventBackground');
    }
}

if (window.location.href.includes('?download')) {
    // TODO: Implement;
}

var modes = [];

function addNewMode(value, name, run) {
    let option = document.createElement('option');
    option.value = value;
    option.innerText = name;
    modes.push(value);

    let select = document.getElementById('mode');
    if (select) {
        select.appendChild(option);
        select.addEventListener('change', (e) => {
            if (e.target.value === value) {
                e.stopImmediatePropagation();
                document.body.style.backgroundColor = originalColor;
            }
        }, true);

        document.getElementsByClassName('content')[0].addEventListener('click', (e) => {
            if (select.value !== value) {
                return;
            } else if (e.target.parentNode && e.target.parentNode.classList.contains('pagination')) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();
            if (e.target.classList.contains('preview')) {
                run(e);
            }
        }, true);
    }
}

function downloadMode() {
    addNewMode('download', 'Download post', (e) => {
        let split = e.target.parentNode.href.split('/');
        let id = split[split.length - 1];
        chrome.runtime.sendMessage(`open https://chan.sankakucomplex.com/post/show/${id}?download`);
    });
}

function backgroundMode(tabOpeningMode) {
    addNewMode('background', 'View background', (e) => {
        let split = e.target.parentNode.href.split('/');
        let id = split[split.length - 1];
        chrome.runtime.sendMessage(`open ${tabOpeningMode} https://chan.sankakucomplex.com/post/show/${id}`);
    });
}

// Loader
if (localStorage.getItem('scploenabled')) {
    let pagingAwaitId = Number(localStorage.getItem('pagingawaitid'));
    let pagingBatchCount = Number(localStorage.getItem('pagingbatchcount'));
    let pagingTargetId = Number(localStorage.getItem('pagingtargetid'));
    let mis = Number(localStorage.getItem('maximagesize'));
    let maxImageSize = (mis === -1) ? '' : `${Number(mis)}%`;
    let ics = Number(localStorage.getItem('imageclicksize'));
    let imageClickSize = (ics === -1) ? '' : `${Number(ics)}%`;
    let revertOnClick = (localStorage.getItem('revertonclick')) ? true : false;
    let tabOpeningMode = localStorage.getItem('tabopeningmode');

    if (localStorage.getItem('optimizedpaging')) {
        optimizedPaging(pagingAwaitId, pagingBatchCount, pagingTargetId);
    }
    if (localStorage.getItem('alternativeimagescaling')) {
        alternativeImageScaling(maxImageSize, imageClickSize, revertOnClick);
    }
    if (localStorage.getItem('preventbackgroundcolorchange')) {
        preventBackgroundColorChange();
    }
    if (localStorage.getItem('downloadmode')) {
        downloadMode();
    }
    if (localStorage.getItem('backgroundmode')) {
        backgroundMode(tabOpeningMode);
    }

    // Post
    let modeContainer = document.getElementById('mode');
    if (modeContainer) {
        let mode = localStorage.getItem('mode');
        if (mode && mode !== 'undefined') {
            document.getElementById('mode').value = mode;
        }

        document.getElementById('mode').addEventListener('blur', (e) => {
            localStorage.setItem('mode', 'undefined');
            if (modes.includes(e.target.value)) {
                localStorage.setItem('mode', e.target.value);
            }
        }, true);
    }
}
