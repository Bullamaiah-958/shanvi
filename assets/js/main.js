/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. Mobile Menu Js
03. Common Js
04. Menu Controls JS
05. Offcanvas Js
06. Search Js
07. cartmini Js
08. filter
09. Body overlay Js
10. Sticky Header Js
11. Theme Settings Js
12. Nice Select Js
13. Smooth Scroll Js
14. Slider Activation Area Start
15. Masonary Js
16. Wow Js
17. Counter Js
18. InHover Active Js
19. Line Animation Js
20. Video Play Js
21. Password Toggle Js
****************************************************
****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);

	// Preloader
	windowOn.on("load", () => {
		const preloader = $(".preloader");
		const init = () => {
			gsapHandeller();
		};
		if (!preloader.length) return init();
		setTimeout(() => {
			preloader.removeClass("is-loading").addClass("is-loaded");
			setTimeout(() => {
				preloader.fadeOut(200);
				init();
			}, 500);
		}, 1500);
	});
	

	// Common Js//
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-height]").each(function () {
		$(this).css("height", $(this).attr("data-height"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	$("[data-text-color]").each(function () {
		$(this).css("color", $(this).attr("data-text-color"));
	});

	//  Nice Select Js//
	$('.Aimaker-select').niceSelect();


	// Masonary Js//
	$('.grid').imagesLoaded(function () {
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item',
			}
		});
		// filter items on button click
		$('.masonary-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
		//for menu active class
		$('.masonary-menu button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

	});

	// magnificPopup img view //
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	// magnificPopup video view //
	$(".popup-video").magnificPopup({
		type: "iframe",
	});
	// Counter Js //
	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 10,
	});

	// Smooth Scroll Js//
	function smoothSctoll() {
		$('.smooth a').on('click', function (event) {
			let target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 60
				}, 1500);
			}
		});
	}
	smoothSctoll();

    // back to top //
	function back_to_top() {
	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');
		windowOn.scroll(function () {
			if (windowOn.scrollTop() > 300) {
				btn_wrapper.addClass('back-to-top-btn-show');
			} else {
				btn_wrapper.removeClass('back-to-top-btn-show');
			}
		});

		btn.on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, '300');
		});
	}
	back_to_top();


	// Sticky Header Js //
	windowOn.on('scroll', function () {
		let scroll = windowOn.scrollTop();
		if (scroll < 20) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});


	// mobile menu Js//
	let tpMenuWrap = $('.tp-mobile-menu-active > ul').clone();
	let tpSideMenu = $('.tp-offcanvas-menu nav');
	tpSideMenu.append(tpMenuWrap);
	if ($(tpSideMenu).find('.submenu, .mega-menu').length != 0) {
	   $(tpSideMenu).find('.submenu, .mega-menu').parent().append
	   ('<button class="tp-menu-close"><i class="fa-solid fa-plus"></i></button>');
	}
	let sideMenuList = $('.tp-offcanvas-menu nav > ul > li button.tp-menu-close, .tp-offcanvas-menu nav > ul li.has-dropdown > a, .tp-offcanvas-menu nav > ul li.has-dropdown > ul > li.menu-item-has-children > a');
	$(sideMenuList).on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('active');
		$(this).siblings('.submenu, .mega-menu').slideToggle();
	});


	$(function () {

		// Onepage Menu
		$('.tp-onepage-menu li a').on('click', function (e) {
			if ($(e.target).is('button')) return;
			e.preventDefault();

			$('.tp-offcanvas-area, .tp-search-area').removeClass('opened');
			$('.body-overlay').removeClass('opened');

			$('.tp-onepage-menu li a.active').removeClass('active');
			$(this).addClass('active');

			const target = $(this).attr('href');
			if ($(target).length) {
				$('html, body').stop().animate({
					scrollTop: $(target).offset().top - 80
				}, 300);
			}
		});

		// Open Offcanvas
		$(".tp-offcanvas-open-btn").on("click", function () {
			$(".tp-offcanvas-area, .body-overlay").addClass("opened");
		});

		// Open Search
		$(".tp-search-open-btn").on("click", function () {
			$(".tp-search-area, .body-overlay").addClass("opened");
		});

		// Close (FIXED)
		$(".tp-offcanvas-close-btn, .tp-search-close-btn, .body-overlay").on("click", function () {
			$(".tp-offcanvas-area, .tp-search-area").removeClass("opened");
			$(".body-overlay").removeClass("opened");
		});

    });


	// scroll wrapper //
	let tl = gsap.timeline();
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
	if ($('#smooth-wrapper').length && $('#smooth-content').length) {
		ScrollSmoother.create({
			smooth: 1.35,
			effects: true,
			smoothTouch: 0.15,
			ignoreMobileResize: true,
		});
		ScrollTrigger.refresh();
	}

	// Hover to Active
	$('.cb-testimonial-item').on('mouseenter', function () {
		$(this).addClass('active').parent().siblings().find('.cb-testimonial-item').removeClass('active');
	});

	// tp_ecommerce
	function tp_ecommerce() {
		$('.tp-cart-minus').on('click', function () {
			var $input = $(this).parent().find('input');
			var count = Number($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});
	
		$('.tp-cart-plus').on('click', function () {
			var $input = $(this).parent().find('input');
			$input.val(Number($input.val()) + 1);
			$input.change();
			return false;
		});

		$('.tp-color-variation-btn').on('click', function () {
		  $(this).addClass('active').siblings().removeClass('active');
		});

		//  tpReturnCustomerLoginForm //
		$('.tp-checkout-login-form-reveal-btn').on('click', function () {
			$('#tpReturnCustomerLoginForm').slideToggle(400);
		  });
		
		//  Show Coupon Toggle Js //
		$('.tp-checkout-coupon-form-reveal-btn').on('click', function () {
		$('#tpCheckoutCouponForm').slideToggle(400);
		});
	
		// Create An Account Toggle Js //
		$('#cbox').on('click', function () {
			$('#cbox_info').slideToggle(900);
		});
	
		// Shipping Box Toggle Js //
		$('#ship-box').on('click', function () {
			$('#ship-box-info').slideToggle(1000);
		});

		if ($("#slider-range").length > 0) {
			$("#slider-range").slider({
				range: true,
				min: 0,
				max: 500,
				values: [75, 300],
				slide: function (event, ui) {
					$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
				}
			});
			$("#amount").val("$" + $("#slider-range").slider("values", 0) +
				" - $" + $("#slider-range").slider("values", 1));
	
			$("#slider-range-offcanvas").slider({
				range: true,
				min: 0,
				max: 500,
				values: [75, 300],
				slide: function (event, ui) {
					$("#amount-offcanvas").val("$" + ui.values[0] + " - $" + ui.values[1]);
				}
			});
			$("#amount-offcanvas").val("$" + $("#slider-range-offcanvas").slider("values", 0) +
				" - $" + $("#slider-range-offcanvas").slider("values", 1));
		}
	}
	tp_ecommerce();


    //  Password Toggle Js 
    if ($('#password-show-toggle').length > 0) {
        var btn = document.getElementById('password-show-toggle');
        btn.addEventListener('click', function (e) {
            var inputType = document.getElementById('tp_password');
            var openEye = document.getElementById('open-eye');
            var closeEye = document.getElementById('close-eye');

            if (inputType.type === "password") {
                inputType.type = "text";
                openEye.style.display = 'block';
                closeEye.style.display = 'none';
            } else {
                inputType.type = "password";
                openEye.style.display = 'none';
                closeEye.style.display = 'block';
            }
        });
    }

     
    //---------- gsapHandeller ------- //
	function gsapHandeller(){

		if ($('.pr-feature-main').length > 0) {
			ScrollTrigger.create({
				trigger: ".pr-feature-main",
				start: "top 75px",
				end: "bottom 48%",
				pin: ".pr-feature-wrapper",
				pinSpacing: false,
			});
		}


		//fade-class-active //
		if ($(".tp-fade-anim").length > 0) {
			gsap.utils.toArray(".tp-fade-anim").forEach((item) => {
				let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
					tp_duration_value = item.getAttribute("data-duration") || 0.75,
					tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
					tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
					tp_delay_value = item.getAttribute("data-delay") || 0.15,
					tp_ease_value = item.getAttribute("data-ease") || "power2.out",
					tp_anim_setting = {
						opacity: 0,
						ease: tp_ease_value,
						duration: tp_duration_value,
						delay: tp_delay_value,
						x: (tp_fade_direction == "left" ? -tp_fade_offset : (tp_fade_direction == "right" ? tp_fade_offset : 0)),
						y: (tp_fade_direction == "top" ? -tp_fade_offset : (tp_fade_direction == "bottom" ? tp_fade_offset : 0)),
					};
				if (tp_onscroll_value == 1) {
					tp_anim_setting.scrollTrigger = {
						trigger: item,
						start: 'top 85%',
					};
				}
				gsap.from(item, tp_anim_setting);
			});
		}

		// Select all elements with single class
		document.querySelectorAll(".words-rotate").forEach(el => {

			// Split text into words
			new SplitType(el, {
			types: "words",
			tagName: "span"
			});

			const words = el.querySelectorAll(".word");

			// Set 3D perspective
			gsap.set(words, {
			transformPerspective: 1000,
			transformOrigin: "center bottom"
			});

			// Animate words on scroll
			gsap.from(words, {
			scrollTrigger: {
				trigger: el,
				start: "top 80%",
			},
			rotationX: -90,
			opacity: 0,
			duration: 0.6,
			ease: "power2.out",
			stagger: { amount: 0.6 }
			});

		});

		// Parallax Js//
		if ($('.scene').length > 0) {
			$('.scene').parallax({
				scalarX: 5.0,
				scalarY: 5.0,
			});
		};
		if ($('.scene-y').length > 0) {
			$('.scene-y').parallax({
				scalarY: 5.0,
				scalarX: 0,
			});
		};

		//  handle data-speed attr
		let speedXTriggers = [];
		function initSpeedX() {
			speedXTriggers.forEach(st => st.kill());
			speedXTriggers = [];
			if (window.innerWidth < 1200) return;
			gsap.utils.toArray("[data-speed-x]").forEach(el => {
				const speedX = parseFloat(el.dataset.speedX) || 0;
				const st = ScrollTrigger.create({
					trigger: el,
					scrub: true,
					onUpdate: (self) => {
						const progress = self.progress;
						const move = progress * speedX * 300;
						gsap.set(el, { x: -move });
					}
				});
				speedXTriggers.push(st);
			});
		}
		function handleDataSpeedAttr() {
			const elements = document.querySelectorAll("[data-speed], [data-speed-original]");
			elements.forEach(el => {
				if (!el.dataset.speedOriginal && el.dataset.speed) {
					el.dataset.speedOriginal = el.dataset.speed;
				}
				if (window.innerWidth < 1200) {
					el.removeAttribute("data-speed");
				} else {
					if (el.dataset.speedOriginal) {
						el.setAttribute("data-speed", el.dataset.speedOriginal);
					}
				}
			});
			initSpeedX();
		}
		handleDataSpeedAttr();
		window.addEventListener("resize", () => { 
			handleDataSpeedAttr();
			ScrollTrigger.refresh();
		});

		// Drag animation js
		const cards = document.querySelectorAll(".tp-card-drag");
		cards.forEach((card) => {
			const items = card.querySelectorAll(".tp-dragable");
			items.forEach((item) => {
				let isDragging = false;
				let offsetX = 0;
				let offsetY = 0;
				item.addEventListener("mousedown", (e) => {
					isDragging = true;
					const rect = item.getBoundingClientRect();
					offsetX = e.clientX - rect.left;
					offsetY = e.clientY - rect.top;

					item.style.position = "absolute";
				});

				document.addEventListener("mousemove", (e) => {
					if (!isDragging) return;

					const cardRect = card.getBoundingClientRect();

					item.style.left = e.clientX - cardRect.left - offsetX + "px";
					item.style.top  = e.clientY - cardRect.top  - offsetY + "px";
				});

				document.addEventListener("mouseup", () => {
					isDragging = false;
				});
			});
		});

		// portfolio slider active
		let pr = gsap.matchMedia();
		pr.add("(min-width: 991px)", () => {
			let otherSections = document.querySelectorAll(
				'.rb-portfolio-item, .nn-project-item'
			);
			otherSections.forEach((section) => {
				gsap.set(section, { scale: 1 });
				gsap.to(section, {
					scale: 0.8,
					scrollTrigger: {
						trigger: section,
						pin: section,
						scrub: 1,
						start: section.getAttribute("data-start") || "top 0",
						end: section.getAttribute("data-end") || "bottom 60%",
						endTrigger: '.rb-portfolio-wrapper, .nn-project-wrapper',
						pinSpacing: false,
						markers: false,
					},
				});
			});
		});


		// card border hover style
		document.querySelectorAll(".tp-border-effect").forEach((element) => {
			element.addEventListener("mousemove", (e) => {
				const rect = element.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				element.style.setProperty("--x", `${x}px`);
				element.style.setProperty("--y", `${y}px`);
			});
		});

	}

	// placeholder text typing js
	window.addEventListener("load", () => {
	const section = document.querySelector(".ig-creativity-ptb");

	if (!section) return;
	const textareas = section.querySelectorAll(".message");
	if (!textareas.length) return;

	const observer = new IntersectionObserver(
		(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
			textareas.forEach((textarea) => {
				const originalText = textarea.placeholder;
				textarea.placeholder = "";

				let index = 0;

				const typePlaceholder = () => {
				if (index <= originalText.length) {
					textarea.placeholder = originalText.slice(0, index);
					index++;
					setTimeout(typePlaceholder, 80);
				}
				};

				typePlaceholder();
			});

			observer.unobserve(section); 
			}
		});
		},
		{
		threshold: 0.3,
		}
	);

	observer.observe(section);
	});



})(jQuery);
