let counter = 0;

const h1 = document.getElementById('counter');

const incr = document.getElementById('incr');
const decr = document.getElementById('decr');


incr.addEventListener("click", function () {
    counter++;
    changeCounter(counter);
});

decr.addEventListener("click", function () {
    counter--;
    changeCounter(counter);
});

function changeCounter(value) {
    h1.textContent = value;
}
