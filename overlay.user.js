// ==UserScript==
// @name         Cyloci's r/place overlay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Paint the pixels!
// @author       Cyloci
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

let child = null;

function getImage() {
  const image = document.createElement("img");
  image.src =
    "https://github.com/Cyloci/r-place-overlay/raw/main/template-dithered.png?timestamp=" +
    Date.now();
  image.style =
    "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 2000px;";
  return image;
}

function refreshTemplate() {
  const x = document
    .getElementsByTagName("mona-lisa-embed")[0]
    .shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0]
    .shadowRoot.children[0];
  if (child) {
    x.removeChild(child);
  }
  child = getImage();
  x.appendChild(child, false);
  console.log("Template has been updated.");
}

function refreshTemplateLoop() {
  refreshTemplate();
  setTimeout(function () {
    refreshTemplateLoop();
  }, 300 * 1000);
}

function addButton(text, onclick) {
  const cssObj = {
    position: "absolute",
    bottom: "5%",
    left: "4%",
    "z-index": 3,
  };
  const button = document.createElement("button"),
    btnStyle = button.style;
  document.body.appendChild(button);
  button.innerHTML = text;
  button.onclick = onclick;
  btnStyle.position = "absolute";
  Object.keys(cssObj).forEach((key) => {
    btnStyle[key] = cssObj[key];
  });
  return button;
}

window.addEventListener("load", () => {
  addButton("Update Template", refreshTemplate);
  setTimeout(function () {
    refreshTemplateLoop();
  }, 4000);
});
