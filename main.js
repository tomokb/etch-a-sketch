// -- Default values
const canvasMinSize = 16;
const canvasMaxSize = 100;
let canvasSize = canvasMinSize;
const canvasPixelWidth = 480;
const blankTileColor = '#fff';
let colorPickerValue = '#000';
let colorMode = 'user-select';

// -- DOM nodes
const canvas = document.querySelector("#canvas");
const newCanvasButton = document.querySelector("#new-canvas");
const chooseColorButton = document.querySelector("#choose-color");

const newCanvasModal = document.querySelector("#new-canvas-modal");
const colorModal = document.querySelector("#color-modal");

// TODO: refactor (decouple JS logic from HTML)
const span1 = document.querySelectorAll(".close")[0];
const span2 = document.querySelectorAll(".close")[1];

const canvasRange = document.querySelector('input[name=canvas-range]');
const canvasRangeLabel = document.querySelector('#canvas-size');

const colorOptions = document.querySelectorAll('input[name=color]'); // Get all color options
const colorPicker = document.querySelector('#color-picker');

// -- Start
window.onload = init;

// -- Functions
function init() {
    createGrid();
    newCanvasButton.addEventListener('click', displayNewCanvasModal);
    chooseColorButton.addEventListener('click', displayColorModal);

    // TODO: refactor (decouple JS logic from HTML)
    span1.addEventListener('click', () => closeModal(newCanvasModal));
    span2.addEventListener('click', () => closeModal(colorModal));

    window.addEventListener('click', (e) => {
        if (e.target === newCanvasModal) {
            closeModal(newCanvasModal);
        }
        if (e.target === colorModal) {
            closeModal(colorModal);
        }
    });

    colorPicker.addEventListener('input', updateColorPickerValue);
    colorOptions.forEach(option => option.addEventListener('input', updateColorMode));
    canvasRange.addEventListener('input', updateCanvasRangeLabel);
}

// Called whenever user changes color-picker value
function updateColorPickerValue(e) {
    colorPickerValue = e.target.value;
}

// Called whenever user selects a color option
function updateColorMode(e) {
    colorMode = e.target.value;
}

function randomizeColor() {
    let zeroTo255 = () => Math.floor(Math.random() * 256);
    return `rgb(${zeroTo255()}, ${zeroTo255()}, ${zeroTo255()})`;
}

// Each pass adds 10% black (reduces lightness by 10%)
function monochromeColor(tile) {
    const maxLightness = 255;

    let lightnessPercentage = parseFloat(tile.getAttribute('data-lightness'));
    if (isNaN(lightnessPercentage)) {
        lightnessPercentage = 0.9;
        tile.setAttribute('data-lightness', `${lightnessPercentage}`);
    } else if (lightnessPercentage > 0.0) {
        tile.setAttribute('data-lightness', `${lightnessPercentage - 0.1}`);
    }
    const tileColor = (maxLightness * lightnessPercentage).toFixed(2);
    console.log(tileColor);
    return `rgb(${tileColor}, ${tileColor}, ${tileColor})`;
}

function updateCanvasRangeLabel(e) {
    updateCanvasSize(e.target.value);
    canvasRangeLabel.textContent = `x ${canvasSize}`;
}

function updateCanvasSize(newSize) {
    // New canvas
    if (newSize !== canvasSize && newSize >= canvasMinSize && newSize <= canvasMaxSize) {
        canvasSize = newSize;
        deleteGrid();
        createGrid();
    }
}

// Default size is 16 x 16 tiles
function createGrid() {
    // console.log("Creating grid...");
    for (let i = 0; i < canvasSize * canvasSize; i++) {
        const tile = document.createElement('div');
        canvas.appendChild(tile);
        tile.addEventListener('mouseenter', () => fillTile(tile));
    }
    // CSS
    const tileSize = canvasPixelWidth / canvasSize;
    canvas.style['grid-template'] = `repeat(${canvasSize}, ${tileSize}px) / repeat(${canvasSize}, ${tileSize}px)`;
}

function deleteGrid() {
    // console.log("Deleting grid...");
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function fillTile(tile) {
    let currentColorValue = '#000'; // Set color value with CSS colors
    switch (colorMode) {
        case 'user-select': 
            currentColorValue = colorPickerValue;
            break;
        case 'randomize': 
            currentColorValue = randomizeColor();
            break;
        case 'monochrome':
            currentColorValue = monochromeColor(tile);
            break;
    }
    tile.style['background-color'] = `${currentColorValue}`;
}

function eraseTile(tile) {
    tile.style['background-color'] = `${blankTileColor}`;
}

function clearCanvas() {
    if (!canvas.hasChildNodes()) {
        return false;
    }

    const tiles = canvas.childNodes;
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        if (tile.classList !== undefined) { // tile.classList returns undefined when tile is text and not an element
            eraseTile(tile);
        } 
    }
}

function displayNewCanvasModal() {
    displayModal(newCanvasModal);
    clearCanvas();
}

function displayColorModal() {
    displayModal(colorModal);
}

function displayModal(modal) {
    modal.style.display = "block";
    return true;
}

function closeModal(modal) {
    modal.style.display = "none";
}

// function createModal(id) {
//     const modal = document.createElement("div");
//     const modalContent = document.createElement("div");
//     const cancel = document.createElement("span");
//     span.textContent = '&times;';
//     modalContent.appendChild(cancel);
//     modal.appendChild(modalContent);

//     modal.setAttribute('id', id);
//     modal.setAttribute('class', 'modal');
//     modalContent.setAttribute('class', 'modal-content');
//     cancel.setAttribute('class', 'close');
//     return modal;
// }