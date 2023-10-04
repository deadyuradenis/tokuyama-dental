
import Swiper, { Navigation, Pagination, EffectFade, Parallax } from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade, Parallax]);

const introSlider = new Swiper('.jsIntroSlider', {
	speed: 750,
    parallax: true,
    pagination: {
		el: ".swiper-pagination",
        type: "fraction",
	},
	navigation: {
		nextEl: ".jsIntroSlider .slider__button--next",
		prevEl: ".jsIntroSlider .slider__button--prev",
	},
});

const sliderPrizes = new Swiper('.jsPrizesSlider', {
	loop: true,
	navigation: {
		nextEl: ".jsPrizesSliderNav .slider__button--next",
		prevEl: ".jsPrizesSliderNav .slider__button--prev",
	},
	speed: 550,
	slidesPerView: 1,
	spaceBetween: 24,
	breakpoints: {

		480: {
			slidesPerView: "auto",

		},
		1440: {
			slidesPerView: 3,
		},
	}
});

const modalPromoSlider = new Swiper('.jsModalPromoSlider', {
	speed: 500,
	slidesPerView: 1,
	spaceBetween: 24,
    pagination: {
		el: ".swiper-pagination",
        type: "fraction",
	},
	navigation: {
		nextEl: ".jsModalPromoSlider .slider__button--next",
		prevEl: ".jsModalPromoSlider .slider__button--prev",
	},
});