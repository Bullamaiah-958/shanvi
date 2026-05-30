(function ($) {
	"use strict";
	
	// tp_testimonial_active 
	let tp_testimonial_active = new Swiper('.tp-testi-active', {
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		spaceBetween: 0,
		speed: 1000,
		navigation: {
			prevEl: '.tp-testi-prev',
			nextEl: '.tp-testi-next',
		},
	});

	////brand-slider
	let tp_brand_slide = new Swiper(".tp_brand_active", {
		loop: true,
		freemode: true,
		slidesPerView: 6,
		spaceBetween: 10,
		allowTouchMove: true,
		speed: 2000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
		breakpoints: {
			'1400':{
				slidesPerView:6,
			},
			'1200':{
				slidesPerView:5,
			},
			'768':{
				slidesPerView:3.8,
			},
			'576': {
				slidesPerView:2.5,
			},
			'0': {
				slidesPerView:2,
			},
		}
	});

	////text-slider
	let tp_text_slide = new Swiper(".tp_text_active", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 8000,
		autoplay: {
		delay: 1,
		disableOnInteraction: true,
		},
	});

	////brand-slider
	let tp_work_slide = new Swiper(".ig-work-thumb-active", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 20,
		allowTouchMove: true,
		speed: 5000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	});

	////brand-slider
	let tp_team_slide = new Swiper(".cb-team-active", {
		loop: true,
		freemode: true,
		slidesPerView: 3,
		spaceBetween: 20,
		allowTouchMove: true,
		centeredSlides: true,
		breakpoints: {
			1400: { slidesPerView: 3 },
			1200: { slidesPerView: 3 },
			768: { slidesPerView: 2 },
			577: { slidesPerView: 1 },
			0: { slidesPerView: 1 },
		},
		pagination: {
			el: ".cb-team-dot",
			clickable: true,
		}
	});

	////testimonial-slider
	let tp_testi_slide = new Swiper(".ui-testimonial-active", {
	loop: true,
	freemode: true,
	slidesPerView: 4,
	spaceBetween: 30,
	allowTouchMove: true,
	speed: 20000,
	autoplay: {
		delay: 1,
		disableOnInteraction: true,
	},
	breakpoints: {
		1400: { slidesPerView: 4 },
		1200: { slidesPerView: 3 },
		768: { slidesPerView: 2 },
		577: { slidesPerView: 1 },
		0: { slidesPerView: 1 },
	},
	});

	// Stop autoplay on small screens
	if (window.innerWidth < 768) {
		tp_testi_slide.autoplay.stop();
	}


	////brand-slider
	let tp_card_slide = new Swiper(".tp_card_active", {
		loop: true,
		freemode: true,
		slidesPerView: 2,
		spaceBetween: 10,
		allowTouchMove: true,
		speed: 4000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	});

	///testimonial-slider
	let tp_testimonial = new Swiper('.ing-testimonial-active', {
		spaceBetween: 40,
		centeredSlides: true,
		loop: true,
		loopedSlides: 4,
		speed: 500,
		keyboard: {
			enabled: true,
		},
		pagination: {
			el: ".ing-dot",
			clickable: true,
		}
	});

	///postbox-slider
	var postbox_active = new Swiper('.postbox-slider-active', {
		slidesPerView: 1,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 20,
		speed: 1000,
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			}
		},
		a11y: false,

		// Navigation arrows
		navigation: {
			prevEl: '.postbox-arrow-prev',
			nextEl: '.postbox-arrow-next',
		},

	});

})(jQuery);