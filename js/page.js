/*global chrome*/
"use strict";

window.addEventListener('resize', updateScale);
window.addEventListener('load', updateScale);

function updateScale() {
    document.body.style.fontSize = window.innerWidth / 22 > 70 ? `${window.innerWidth / 22}%` : `70%`;
}

window.addEventListener('beforeunload', function (event) {
    event.stopImmediatePropagation();
});
