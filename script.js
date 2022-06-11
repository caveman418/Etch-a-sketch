let isPainting = false;

const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderOutput');
const grid = document.querySelector('.grid');
const resizeButton = document.querySelector('.resize');
const clearButton = document.querySelector('.clear');
const rgbButton = document.querySelector('.checkrgb');
const eraserButton = document.querySelector('.eraser');
const drawButton = document.querySelector('.drawmode');
const allButtons = document.querySelectorAll('.button');

output.textContent = `${slider.value} x ${slider.value}`; //initialize grid size number underneath slider (16)

slider.addEventListener('input', () => {
    output.textContent = `${slider.value} x ${slider.value}`; //when slider is moved, number underneath is updated
});

function draw(e) {
    if (drawButton.classList.contains('activated')) {
        e.target.style.backgroundColor = document.querySelector('.colorpicker').value;
    }
    if (eraserButton.classList.contains('activated')) {
        e.target.style.backgroundColor = 'rgb(249,251,255)';
    }
    if (rgbButton.classList.contains('activated')) {
        e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
};

function resize(e) { //clears grid and adds new divs with event listeners attached to each
    grid.textContent = ''; //clear grid

    for (let i = 1; i <= slider.value**2; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.style.cssText = 'width: ' + (100/slider.value) + '%'; //makes n divs fit into 100% of the canvas (width is set to make flex wrap work)
        div.style.backgroundColor = 'rgb(249,251,255)';

        div.addEventListener('mousedown', (e) => { //add these following event listeners to each div as they're created
            isPainting = true;
            draw(e);
        });
        div.addEventListener('mouseup', (e) => {
            isPainting = false;
        })
        div.addEventListener('mouseenter', (e) => {
            if (isPainting) {
                draw(e);
            }
        });
        
        grid.appendChild(div); //put the div with all those settings into the canvas
    }
}

function toggleMode(e) {
    allButtons.forEach(btn => btn.classList.remove('activated'));
    e.target.classList.add('activated');
}

resize(); //initialize 16x16 grid when page is loaded

resizeButton.addEventListener('click', resize); //run resize function above when resize button is clicked

clearButton.addEventListener('click', resize); //the clear button does the exact same as the resize button

drawButton.addEventListener('click', (e) => toggleMode(e)); //unactivates all buttons then activates draw

rgbButton.addEventListener('click', (e) => toggleMode(e));

eraserButton.addEventListener('click', (e) => toggleMode(e));