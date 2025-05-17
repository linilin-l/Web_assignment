const sliderData = {
    virtual: [
        {
            src: './public/images/virtual/stardew-valley.jpg',
            caption: 'Stardew Valley - My favorite farming simulation game'
        },
        {
            src: './public/images/virtual/detroit.jpg',
            caption: 'Detroit: Become Human - An amazing interactive drama'
        },
        {
            src: './public/images/virtual/miku.jpg',
            caption: 'Hatsune Miku - Virtual Singer'
        }
    ],
    real: [
        {
            src: './public/images/real/photo1.jpg',
            caption: 'My graduation photo'
        },
        {
            src: './public/images/real/photo2.jpg',
            caption: 'Travel memories'
        },
        {
            src: './public/images/real/photo3.jpg',
            caption: 'With my friends'
        }
    ]
};

class Slider {
    constructor(container, data) {
        this.container = container;
        this.slider = container.querySelector('.slider');
        this.dots = container.querySelector('.slider-dots');
        this.caption = container.querySelector('.slider-caption');
        this.currentIndex = 0;
        this.data = data;
        this.autoSlideInterval = null;
    }

    init(type) {
        this.currentIndex = 0;
        this.data = sliderData[type];
        this.render();
        this.startAutoSlide();
    }

    render() {
        this.slider.innerHTML = this.data.map(item => 
            `<img src="${item.src}" alt="${item.caption}">`
        ).join('');

        this.dots.innerHTML = this.data.map((_, index) => 
            `<div class="dot ${index === 0 ? 'active' : ''}"></div>`
        ).join('');

        this.updateCaption();
        this.attachEvents();
    }

    updateCaption() {
        this.caption.textContent = this.data[this.currentIndex].caption;
    }

    slide(index) {
        this.currentIndex = index;
        this.slider.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
        this.updateCaption();
    }

    updateDots() {
        const dots = this.dots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        this.autoSlideInterval = setInterval(() => {
            const nextIndex = (this.currentIndex + 1) % this.data.length;
            this.slide(nextIndex);
        }, 5000);
    }

    attachEvents() {
        const dots = this.dots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.slide(index));
        });

        this.slider.addEventListener('mouseenter', () => {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
        });

        this.slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
}

// 初始化滑块和选项切换
const sliderContainer = document.querySelector('.slider-container');
const slider = new Slider(sliderContainer, sliderData.real);
const options = document.querySelectorAll('.option');
const typing = new TypingEffect(document.getElementById('typing'));

options.forEach(option => {
    option.addEventListener('click', () => {
        const type = option.dataset.type;
        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        // 更新背景
        document.body.style.background = type === 'virtual' 
            ? `url('../public/images/stardew-sky.jpg')`
            : `url('../public/images/real-bg.jpg')`;

        // 更新打字效果
        typing.start(type === 'virtual' 
            ? "This is my virtual life."
            : "This is my real life");

        // 显示滑块并初始化
        sliderContainer.style.display = 'block';
        slider.init(type);
    });
});
