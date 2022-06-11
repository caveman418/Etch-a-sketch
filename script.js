const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderOutput');
const grid = document.querySelector('.grid');
const resizeButton = document.querySelector('.resize');
const clearButton = document.querySelector('.clear');
const rgbButton = document.querySelector('.checkrgb');
const eraserButton = document.querySelector('.eraser');
const drawButton = document.querySelector('.drawmode');
const allButtons = document.querySelectorAll('.button');
const paintBucket = document.querySelector('.bucket');

let isPainting = false;
document.addEventListener('mouseup', () => {
    isPainting = false; //if mouse is up anywhere on the screen then the user is no longer painting
});

output.textContent = `${slider.value} x ${slider.value}`; //initialize grid size number underneath slider (16x16 is default)

slider.addEventListener('input', () => {
    output.textContent = `${slider.value} x ${slider.value}`; //when slider is moved, number underneath is updated
});

function bucket(box,oldColor,newColor) { //recursive function for paint bucket button
    box.style.backgroundColor = newColor;

    const currentID = Number(box.id);

    const left = document.getElementById(`${currentID - 1}`);
    const right = document.getElementById(`${currentID + 1}`);
    const up = document.getElementById(`${currentID - slider.value}`); //math to obtain location of left/right/up/down divs
    const down = document.getElementById(`${currentID + Number(slider.value)}`);

    if (left && currentID%Number(slider.value)!==1 && left.style.backgroundColor===oldColor) {
        bucket(left,oldColor,newColor); //if square to left exists and was the originally clicked color then make that left square do this entire function again
    }
    if (right && currentID%Number(slider.value)!==0 && right.style.backgroundColor===oldColor) {
        bucket(right,oldColor,newColor);
    }
    if (up && currentID>Number(slider.value) && up.style.backgroundColor===oldColor) {
        bucket(up,oldColor,newColor);
    }
    if (down && currentID<=Number(slider.value)**2 - slider.value && down.style.backgroundColor===oldColor) {
        bucket(down,oldColor,newColor);
    }
}

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
    if (paintBucket.classList.contains('activated')) {
        const oldColor = e.target.style.backgroundColor;
        const newColor = document.querySelector('.colorpicker').value;
        bucket(e.target,oldColor,newColor); //run the recursive bucket function to fill in all like-color squares
    }
};

function resize(e) { //clears grid and adds new divs with event listeners attached to each
    grid.textContent = ''; //clears grid before adding new children

    for (let i = 1; i <= slider.value**2; i++) { //make n^2 divs
        const div = document.createElement('div');
        div.classList.add('box');
        div.style.cssText = 'width: ' + (100/slider.value) + '%'; //makes n divs fit into 100% of the canvas (width is set to make flex wrap work)
        div.style.backgroundColor = 'rgb(249,251,255)';
        div.setAttribute('id',`${i}`); //set unique ID to each div (to help with paint bucket tool)

        div.addEventListener('mousedown', (e) => { //add these two event listeners to each div as they're created
            isPainting = true;
            draw(e);
        });
        div.addEventListener('mouseenter', (e) => {
            if (isPainting) draw(e);
        });
        
        grid.appendChild(div); //put the div with all those settings into the canvas
    }
}

function toggleMode(e) {
    allButtons.forEach(btn => btn.classList.remove('activated')); //un-"activates" each button
    e.target.classList.add('activated'); //re-"activates" only the button that was pressed
}

resize(); //initialize 16x16 grid when page is loaded

resizeButton.addEventListener('click', resize); //run resize function above when resize button is clicked

clearButton.addEventListener('click', resize); //the clear button does the exact same as the resize button

allButtons.forEach(btn => btn.addEventListener('click', (e) => toggleMode(e))); //adds event listener to all buttons