// Time: 2h02p

const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
    isDown = false;
    slider.classList.remove('active');
});
slider.addEventListener('mouseup', event => {
    isDown = false;
    slider.classList.remove('active');
    let index = Math.round(Math.round(event.target.parentElement.parentElement.scrollLeft / (186 + 16) * 10) / 10) + 1
    index = (index - index % 4) / 4;
    clearActiveDot()
    document.getElementById(`tqt${index}`).classList.add('active')
});

slider.addEventListener('scroll', debounce(event => {
    let index = Math.round(Math.round(event.target.scrollLeft / (186 + 16) * 10) / 10) + 1
    index = (index - index % 4) / 4;
    clearActiveDot()
    document.getElementById(`tqt${index}`).classList.add('active')
}, 300));

slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const SCROLL_SPEED = 4;
    const walk = (x - startX) * SCROLL_SPEED;
    slider.scrollLeft = scrollLeft - walk;
});

const buttonsWrapper = document.querySelector(".map");

buttonsWrapper.addEventListener("click", e => {
    if (e.target.nodeName === "DIV" && !e.target.classList.contains('map')) {
        clearActiveDot()
        if (e.target.classList.contains("tqt0")) {
            slider.scrollTo(186 * 4 * 0, 0)
            e.target.classList.add("active");
        } else if (e.target.classList.contains("tqt1")) {
            slider.scrollTo(186 * 4 * 1, 0)
            e.target.classList.add("active");
        } else if (e.target.classList.contains('tqt2')) {
            slider.scrollTo(186 * 4 * 2, 0)
            e.target.classList.add('active');
        }
    }
});

const clearActiveDot = () => {
    Array.from(buttonsWrapper.children).forEach(item =>
        item.classList.remove("active")
    );
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}