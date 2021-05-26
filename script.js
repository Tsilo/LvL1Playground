import productCard from './exports/testmodule'
import api from './exports/testmodule'
let images = [
    'https://a.allegroimg.com/s512/03c8ea/8f57a72146f792e700482de7a93a/Baner-REKLAMOWY-200x100cm-gotowy-do-powieszenia',
    'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    'https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg',
];
  

class Slider {
    imgs = [];
    container;
    selector;
    activeSide = 1;
    interval = 0;

    constructor(selector, imgs = []) {
        productCard({title: 'asd', price: 5})
        this.imgs = imgs;
        this.container = document.getElementById(selector);
        this.selector = selector;
        this.prevSlideBtn = document.getElementById('slider-prev');
        this.nextSlideBtn = document.getElementById('slider-next');
        console.log(this.prevSlideBtn);
        this.prevSlideBtn.addEventListener('click', this.slideLeft.bind(this));
        this.nextSlideBtn.addEventListener('click', this.slideRight.bind(this));
        this.container.addEventListener('mouseenter', e => {
            clearInterval(this.interval);
        });
        this.container.addEventListener('mouseleave', e => {
            this.loop();
        });
        this.renderImages();
        this.loop();
    }
    fetch(){
        api.getAll().then(
            this.render()
        );
    }

    loop(){
        this.interval = setInterval(this.slideRight.bind(this), 1000);
    }
    renderImages() {
        let tmp = '';
        this.imgs.forEach(el => {
            tmp += `<div class="img">
                        <img src="${el}" alt="slider image"  />
                    </div>`;
        });
        this.container.innerHTML = tmp;
    }

    slideLeft() {
        this.activeSide =
            this.activeSide === 1 ?
            this.imgs.length
            : this.activeSide - 1;
        let width = this.container.offsetWidth;
        this.container.querySelector('.img').style.margin
            = `-${this.activeSide * width}px`;
        console.log(this.activeSide, width, this.activeSide+width);

    }
    slideRight() {
        this.activeSide =
            this.activeSide ===  this.imgs.length ?
               1
                : this.activeSide + 1;
        let width = this.container.offsetWidth;
        console.log(this.activeSide, width, this.activeSide+width);
        this.container.querySelector('.img').style.margin
            = `-${this.activeSide * width}px`;
    }
}

new Slider('slider-container', images);