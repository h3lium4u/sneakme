// 페이지 위치 초기화
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
	window.scrollTo(0, 0);

	// Lenis 초기화
	const lenis = new Lenis({
	  duration: 1,
	  smooth: true
	});

	// GSAP + ScrollTrigger 연결
	gsap.registerPlugin(ScrollTrigger);
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 500));
	gsap.ticker.lagSmoothing(0);

	// ham 메뉴 오픈시 스크롤 막기
	function disablePageScroll() {
		if (lenis) {
			lenis.stop();
		}
	}

	function enablePageScroll() {
		if (lenis) {
			lenis.start();
		}
	}

	const sideMenu = document.getElementById('ham__menu__wr');
	const openMenuButton = document.querySelector('#open-menu-btn'); 
	const closeMenuButton = document.querySelector('.ham__close__wr a'); 
	if (openMenuButton && sideMenu) {
		openMenuButton.addEventListener('click', (e) => {
			e.preventDefault();
			
			disablePageScroll();
			
		});
	}

	if (closeMenuButton && sideMenu) {
		closeMenuButton.addEventListener('click', (e) => {
			e.preventDefault();
			enablePageScroll();
		});
	}





	  let resizeTimeout;
		window.addEventListener('resize', () => {
		  clearTimeout(resizeTimeout);
		  resizeTimeout = setTimeout(() => {
			lenis.raf(performance.now());
			ScrollTrigger.refresh();
			console.log("ScrollTrigger refreshed after debounce.");
		  }, 100);
	});




	  // main__conts__alignment__wr 액션
	// 텍스트 이미지 센터 계산
	function alignLetterImagesCenter(containerSelector) {
		const container = document.querySelector(containerSelector);
		if (!container) return;
		const spans = container.querySelectorAll("span img");
		let loadedCount = 0;
		spans.forEach(img => {
			img.onload = check;
			if (img.complete) check();
		});
		function check() {
			loadedCount++;
			if (loadedCount === spans.length) layout();
		}
		function layout() {
			let totalWidth = 0;
			spans.forEach(img => {
				totalWidth += img.width;
			});
			const parentWidth = container.offsetWidth;
			let currentLeft = (parentWidth - totalWidth) / 2;
			spans.forEach(img => {
				const span = img.parentElement;
				span.style.left = currentLeft + "px";
				span.style.position = "absolute";
				span.style.visibility = "visible";
				currentLeft += img.width;
			});
		}
	}



	ScrollTrigger.matchMedia({

		// ==================================================================
		// ============================== ~ 1025 =============================
		// ==================================================================

		"(min-width:1025px)": function() {

			var main__visual__act01 = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__intro__wr",
					start: "top top",
					end:"+=200%",
					scrub: 1,
					
				},
			});
			
			main__visual__act01.to(".header", { opacity:1, duration: 1, ease: "power1.inOut" },"<");
			main__visual__act01.to(".scroll__box", { opacity:0, duration: 2, ease: "power1.inOut" },"<");
			main__visual__act01.to(".main__intro__wr .video__wr", {scale:5, top:"50%", left:"73%", duration: 3, ease: "power1.inOut" },"<");
			main__visual__act01.to({}, { duration: 2 });


			var main__object__act = gsap.timeline({
			  scrollTrigger: {
				trigger: "#main__contents__wr00",
				start: "top top",
				end: "+=200%",
				scrub: 1,
				pin:true,
				refreshPriority: 1,
			  },
			});

			main__object__act.to(".main__intro__wr .video__wr", {opacity: 0, duration: 2});
			main__object__act.to(".main__intro__video__wr", {opacity: 0, duration: 2},"<");
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video01", {opacity: 1, ease:"power1.out" , duration: 2},">-=1");
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video01", {opacity: 0, ease:"power1.in" , duration: 2});
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video02", {opacity: 1, ease:"power1.out" , duration: 2},">-=1");
			main__object__act.to(".main__intro__wr .video__wr", {display: "none", ease:"power2.out" , duration: 1},"<");
			
			main__object__act.to(".scroll__box .tx", {opacity:0, ease:"power1.out" });
			main__object__act.to(".main__intro__video__wr", {display: "none"},"<");


			
			var main__card__act01 = gsap.timeline({
			  scrollTrigger: {
				trigger: "#fixed__act__card__wr",
				start: "-=10% top",
				end: "+=70%",
				scrub: 0.5,
			  },
			});

			main__card__act01.to("#fixed__act__card__wr", {opacity: 1, visibility:"visible", duration:1});
			main__card__act01.to(".action__card__box", {y: "-50%", duration: 2 },"<");

			var main__card__act02 = gsap.timeline({
			  scrollTrigger: {
				trigger: ".fixed__act__card",
				start: "-=10% top",
				end: "+=400%",
				scrub: 1,
			  },
			});

			main__card__act02.fromTo(".action__card__box .card__img01",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1.1, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img02",
				{y:"0", scale:1, duration: 2, ease: "power1.inOut"},
				{y:"-5%", scale:1.2, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img05",
				{rotate:0, scale:0.8, left:"53%",duration: 2, ease: "power1.inOut"},
				{rotate:"-5deg", scale:1.2, left:"50%", duration:2, ease: "power1.inOut"},"<");


			main__card__act02.fromTo(".action__card__box .card__img06",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1, duration:2, ease: "power1.inOut"},"<");
			main__card__act02.to({}, { duration: 1 });




			main__card__act02.to(".action__card__box .img__wr", {rotateX: 3, rotateY: 90, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {scale: 1.2, rotateX: 0, rotateY: 200, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {rotateX: 0, duration: 1}, "+=1");
			main__card__act02.to(".card__img01", {scale:1, duration: 1},"<");
			main__card__act02.to(".card__img02", {scale:1, duration: 1 , y:0}, "<+=0.1");
			main__card__act02.to(".card__img05", {rotate:0, scale:1, duration: 1}, "<+=0.1");
			main__card__act02.to(".card__img06", {scale:1, duration: 1}, "<");
			main__card__act02.to(".action__card__box", { duration: 1, width:"100%", height:"100%", rotateX:0, rotateY:0, rotate:0, pointerEvents:"none"},">-=1");
			main__card__act02.to(".action__card__box .img__wr", {rotateY: 180, scale: 1, duration: 1, borderRadius: 0}, "<");
			main__card__act02.to(".card__text__img", {opacity: 1, duration: 2},"+=1");
			main__card__act02.to(".action__card__box .card__img01", {opacity: 1, duration: 2},"<");

			var main01_03 = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__contents__wr02",
					start: "-=110% top",
					end:"+=60%",
					scrub: 1,
				},
			});

			main01_03.fromTo("#main__contents__wr02 .con02__video__box",
				{opacity:0, y:"-400%", scale:1, duration: 1, ease: "power1.inOut"},
				{opacity:0.7, y:"-100%", scale:5, duration: 1, ease: "power1.inOut"});
			

		}, /* 1025px END */


		"(min-width: 821px) and (max-width: 1024px)": function() {

			var main__visual__act01 = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__intro__wr",
					start: "top top",
					end:"+=150%",
					ease: "power1", 
					scrub: 1,
				}
			});

			main__visual__act01.to(".scroll__box", { opacity:0, "visibility":"hidden", ease: "power1.inOut" });
			main__visual__act01.to(".header", 1, { opacity:1, "visibility":"visible", ease: "power1.inOut" },"<");
			main__visual__act01.to(".main__intro__wr .video__wr", 2 , { scale:4.5, top:"50%", left:"75%", ease: "power1.inOut" },"<");
			main__visual__act01.to({}, { duration: 1 });


			var main__object__act = gsap.timeline({
			  scrollTrigger: {
				trigger: "#main__contents__wr00",
				start: "top top",
				end: "+=100%",
				scrub: 1,
				pin:true,
				refreshPriority: 1,
			  },
			});

			main__object__act.to(".main__intro__wr .video__wr", {opacity: 0, duration: 1});
			main__object__act.to(".main__intro__video__wr", {opacity: 0, duration: 1},"<");

			
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video01", {opacity: 1, ease:"power1.out" , duration: 1.5},">-=0.5");
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video01", {opacity: 0, ease:"power1.in" , duration: 1.5});
			main__object__act.to("#main__contents__wr00 .right__object__box .object__video__wr .object__video02", {opacity: 1, ease:"power1.out" , duration: 1.5},">-=0.5");

			main__object__act.to(".scroll__box .tx", {opacity:0, ease:"power1.out" });
			main__object__act.to(".main__intro__video__wr", {display: "none"},"<");




			var main__card__act01 = gsap.timeline({
				scrollTrigger: {
					trigger: "#fixed__act__card__wr",
					start: "-=8% top",
					end: "+=50%",
					scrub: 0.5,
				},
			});
			main__card__act01.to("#fixed__act__card__wr", {opacity: 1, visibility:"visible", duration:0.2});
			main__card__act01.to(".action__card__box", {y: "-50%", duration:0.1},"<");



			var main__card__act02 = gsap.timeline({
			  scrollTrigger: {
				trigger: ".fixed__act__card",
				start: "-=10% top",
				end: "+=300%",
				scrub: 1,
			  },
			});

			main__card__act02.fromTo(".action__card__box .card__img01",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1.1, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img02",
				{y:"0", scale:1, duration: 2, ease: "power1.inOut"},
				{y:"-5%", scale:1.2, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img05",
				{rotate:0, scale:0.8, left:"53%",duration: 2, ease: "power1.inOut"},
				{rotate:"-5deg", scale:1.2, left:"50%", duration:2, ease: "power1.inOut"},"<");


			main__card__act02.fromTo(".action__card__box .card__img06",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1, duration:2, ease: "power1.inOut"},"<");
			main__card__act02.to({}, { duration: 1 });




			main__card__act02.to(".action__card__box .img__wr", {rotateX: 3, rotateY: 90, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {scale: 1.2, rotateX: 0, rotateY: 200, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {rotateX: 0, duration: 1}, "+=1");

			main__card__act02.to(".card__img01", {scale:1, duration: 1},"<");
			main__card__act02.to(".card__img02", {scale:1, duration: 1 , y:0}, "<+=0.1");
			main__card__act02.to(".card__img05", {rotate:0, scale:1, duration: 1}, "<+=0.1");
			main__card__act02.to(".card__img06", {scale:1, duration: 1}, "<");


			main__card__act02.to(".action__card__box", {duration: 1, width: "100%", height: "100%", rotateX:0, rotateY:0, rotate:0, pointerEvents:"none" },"<");


			main__card__act02.to(".action__card__box .img__wr", {rotateY: 180, scale: 1, duration: 1, borderRadius: 0}, "<");
			main__card__act02.to(".card__text__img", {opacity: 1, duration: 2},"+=1");
			main__card__act02.to(".action__card__box .card__img01", {opacity: 1, duration: 2},"<");
			

			var main01_03 = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__contents__wr02",
					start: "-=110% top",
					end:"+=50%",
					scrub: 1,
				},
			});

			main01_03.fromTo("#main__contents__wr02 .con02__video__box",
				{opacity:0, y:"-250%", scale:1, duration: 1, ease: "power1.inOut"},
				{opacity:0.7, y:"-60%", scale:3, duration: 1, ease: "power1.inOut"});



			var container = document.querySelector(".main__contents__wr04 .rotating__letters__wr");
			if (!container) return;

			// li 생성 (A~Z + 남은 칸 -)
			if (container.innerHTML.trim() === "") {
			  for (let i = 65; i <= 90; i++) {
				container.innerHTML += `<li><p>${String.fromCharCode(i)}</p></li>`;
			  }
			  var total = 30;
			  var added = total - 26;
			  for (let i = 0; i < added; i++) {
				container.innerHTML += `<li><p>-</p></li>`;
			  }
			}

			var items = container.querySelectorAll('li');
			var reverseIndexes = [1,2,3,7,8,9,13,14,15,19,20];

			let targetRotation = 0;
			let currentRotation = 0;
			let totalRotation = 0; // 누적 회전값

			// GSAP timeline + ScrollTrigger
			var main01_04__mo = gsap.timeline({
			  scrollTrigger: {
				trigger: "#main__contents__wr04",
				start: "-=90% top",
				end: "+=90%",
				scrub: 1,
				onUpdate: self => {
				  let delta = self.getVelocity() * 0.02; // 이전 0.05 → 0.02로 줄임
				  // 너무 큰 delta 제한
				  delta = Math.max(Math.min(delta, 5), -5); 
				  totalRotation += delta;
				  targetRotation = totalRotation;
				}
			  }
			});

			function animateMobile() {
			  currentRotation += (targetRotation - currentRotation) * 0.08;

			  items.forEach((li, i) => {
				var p = li.querySelector('p');
				var isReverse = reverseIndexes.includes(i + 1);

				let rotation = isReverse ? -currentRotation : currentRotation;
				p.style.transform = `rotate(${rotation}deg)`;
			  });

			  requestAnimationFrame(animateMobile);
			}

			animateMobile();


		
	
		},/* 1024 ~ 821px END ~ */
		"(min-width: 571px) and (max-width: 820px)": function() {
			var main__visual__act01 = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__intro__wr",
					start: "top top",
					end:"+=100%",
					ease: "power1", 
					scrub: 1,
					
				},
			});

			main__visual__act01.to(".header", 1, { opacity:1, "visibility":"visible", ease: "power1.inOut" });
			main__visual__act01.to(".scroll__box", { opacity:0, "visibility":"hidden", ease: "power1.inOut" },"<");
			main__visual__act01.to(".main__intro__wr .video__wr", 1 ,{ top:"145%", scale:5.5, ease: "power1.inOut" },"<");


			var main__card__act01 = gsap.timeline({
			  scrollTrigger: {
				trigger: "#fixed__act__card__wr",
				start: "-=10% top",
				end: "+=50%",
				scrub: 0.5,
			  },
			});

			main__card__act01.to("#fixed__act__card__wr", { opacity: 1, visibility:"visible", duration: 1});
			main__card__act01.to(".action__card__box", {y: "-50%", duration:0.5},"<");


		

			var main__card__act02 = gsap.timeline({
			  scrollTrigger: {
				trigger: ".fixed__act__card",
				start: "-=10% top",
				end: "+=200%",
				scrub: 0.5,
			  },
			});

			main__card__act02.fromTo(".action__card__box .card__img01",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1.1, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img02",
				{y:"0", scale:1, duration: 2, ease: "power1.inOut"},
				{y:"-5%", scale:1.2, duration:2, ease: "power1.inOut"},"<");

			main__card__act02.fromTo(".action__card__box .card__img05",
				{rotate:0, scale:0.8, left:"53%",duration: 2, ease: "power1.inOut"},
				{rotate:"-5deg", scale:1.2, left:"50%", duration:2, ease: "power1.inOut"},"<");


			main__card__act02.fromTo(".action__card__box .card__img06",
				{scale:1.2, duration: 2, ease: "power1.inOut"},
				{scale:1, duration:2, ease: "power1.inOut"},"<");
			main__card__act02.to({}, { duration: 1 });



			 
			main__card__act02.to(".action__card__box .img__wr", {rotateX: 3, rotateY: 90, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {scale: 1.2, rotateX: 0, rotateY: 200, duration: 1});
			main__card__act02.to(".action__card__box .img__wr", {rotateX: 0, duration: 1}, "+=1");

			main__card__act02.to(".card__img01", {scale:1, duration: 1},"<");
			main__card__act02.to(".card__img02", {scale:1, duration: 1 , y:0}, "<+=0.1");
			main__card__act02.to(".card__img05", {rotate:0, scale:1, duration: 1}, "<+=0.1");
			main__card__act02.to(".card__img06", {scale:1, duration: 1}, "<");
			main__card__act02.to(".action__card__box", {duration: 1, width: "100%", height: "100%", rotateX:0, rotateY:0, rotate:0, pointerEvents:"none" },"<");
	

			main__card__act02.to(".action__card__box .img__wr", {rotateY: 180, scale: 1, duration: 1, borderRadius: 0}, "<");
			main__card__act02.to(".card__text__img", {opacity: 1, duration: 2},"+=1");
			main__card__act02.to(".action__card__box .card__img01", {opacity: 1, duration: 2},"<");

			
			var main01_03 = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__contents__wr02",
					start: "-=110% top",
					end:"+=50%",
					scrub: 1,
				},
			});

			main01_03.fromTo("#main__contents__wr02 .con02__video__box",
				{opacity:0, y:"-200%", scale:1, duration: 1, ease: "power1.inOut"},
				{opacity:0.7, y:"-50%", scale:3.5, duration: 1, ease: "power1.inOut"});





			var container = document.querySelector(".main__contents__wr04 .rotating__letters__wr");
			if (!container) return;

			// li 생성 (A~Z + 남은 칸 -)
			if (container.innerHTML.trim() === "") {
			  for (let i = 65; i <= 90; i++) {
				container.innerHTML += `<li><p>${String.fromCharCode(i)}</p></li>`;
			  }
			  var total = 30;
			  var added = total - 26;
			  for (let i = 0; i < added; i++) {
				container.innerHTML += `<li><p>-</p></li>`;
			  }
			}

			var items = container.querySelectorAll('li');
			var reverseIndexes = [1,2,3,7,8,9,13,14,15,19,20];

			let targetRotation = 0;
			let currentRotation = 0;
			let totalRotation = 0; // 누적 회전값

			// GSAP timeline + ScrollTrigger
			var main01_04__mo = gsap.timeline({
			  scrollTrigger: {
				trigger: "#main__contents__wr04",
				start: "-=100% top",
				end: "+=80%",
				scrub: 1,
				onUpdate: self => {
				  let delta = self.getVelocity() * 0.02; // 이전 0.05 → 0.02로 줄임
				  // 너무 큰 delta 제한
				  delta = Math.max(Math.min(delta, 5), -5); 
				  totalRotation += delta;
				  targetRotation = totalRotation;
				}
			  }
			});

			function animateMobile() {
			  currentRotation += (targetRotation - currentRotation) * 0.08;

			  items.forEach((li, i) => {
				var p = li.querySelector('p');
				var isReverse = reverseIndexes.includes(i + 1);

				let rotation = isReverse ? -currentRotation : currentRotation;
				p.style.transform = `rotate(${rotation}deg)`;
			  });

			  requestAnimationFrame(animateMobile);
			}

			animateMobile();

			

		
		}, /* 820px ~ 571px */

		"(max-width: 570px)": function() {

			var main__visual__act01 = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__intro__wr",
					start: "top top",
					end:"+=120%",
					ease: "power1", 
					scrub: 1,
					


				},
			});
			main__visual__act01.to(".header", 1, { opacity:1, "visibility":"visible", ease: "power1.inOut" });
			main__visual__act01.to(".scroll__box", { opacity:0, "visibility":"hidden", ease: "power1.inOut" },"<");
			main__visual__act01.to(".main__intro__wr .video__wr", 1 ,{ top:"145%", scale:5.5, ease: "power1.inOut" },"<");
			main__visual__act01.to({}, { duration: 0.5 });

			

			
			// 모바일 프로젝트 섹션

			var main__card01__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__contents__wr01__mo .card01",
					start: "-=50% top",
					end: "+=50%",
					scrub: 1,
				},
			});

			main__card01__act.to(".main__contents__wr01__mo .card01 .card__img01", {y: "-10%", scale: "1.3" , duration: 1, ease:"none" });
			main__card01__act.to(".main__contents__wr01__mo .card01 .card__img02", {scale: "1.1" , duration: 1, ease:"none" },"<");
			main__card01__act.to(".main__contents__wr01__mo .card01 .card__img03", {scale: "1.1" , duration: 1, ease:"none" },"<");

			main__card01__act.fromTo(".main__contents__wr01__mo .card01 .card__img04",
				{rotate:"-5deg", scale:0.6, duration: 1, ease: "power1.inOut"},
				{rotate:"0deg", scale:1, duration:1, ease: "power1.inOut"},"<");



			// card02
			var main__card02__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__contents__wr01__mo .card02",
					start: "-=50% top",
					end: "+=50%",
					scrub: 1,
				},
			});

			main__card02__act.to(".main__contents__wr01__mo .card02 .img__box .card__img01", {y: "-10%", scale: "1.15" , duration: 1, ease:"none" });

			main__card02__act.fromTo(".main__contents__wr01__mo .card02 .img__box .card__img02",
				{scale:1.2, duration: 1, ease: "power1.inOut"},
				{scale:1, duration:1, ease: "power1.inOut"},"<");




			// card03
			var main__card03__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__contents__wr01__mo .card03",
					start: "-=50% top",
					end: "+=50%",
					scrub: 1,
				},
			});

			main__card03__act.to(".main__contents__wr01__mo .card03 .img__box .card__img01", {y: "-10%", scale: "1.2" , duration: 1, ease:"none" });
			main__card03__act.to(".main__contents__wr01__mo .card03 .img__box .card__img02", {scale: "1.1" , duration: 1, ease:"none" },"<");
			main__card03__act.to(".main__contents__wr01__mo .card03 .img__box .card__img03", {rotate: "-5deg", scale: "1.1" , duration: 1, ease:"none" },"<");
			main__card03__act.to(".main__contents__wr01__mo .card03 .img__box .card__img04", {rotate: "5deg", scale: "1.1" , duration: 1, ease:"none" },"<");


			// card04
			var main__card04__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__contents__wr01__mo .card04",
					start: "-=50% top",
					end: "+=50%",
					scrub: 1,
				},
			});

			main__card04__act.to(".main__contents__wr01__mo .card04 .img__box .card__img01", {y: "-10%", scale: "1.3" , duration: 1, ease:"none" });
			main__card04__act.to(".main__contents__wr01__mo .card04 .img__box .card__img02", {scale: "1.1" , duration: 1, ease:"none" },"<");
			main__card04__act.to(".main__contents__wr01__mo .card04 .img__box .card__img03", {scale: "1.1" , duration: 1, ease:"none" },"<");

			main__card04__act.fromTo(".main__contents__wr01__mo .card04 .card__img04",
				{rotate: "5deg", scale: "1.2" , duration: 1, ease:"none"},
				{rotate: 0, scale: "1" , duration: 1, ease:"none"},"<");




			var main01_03 = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__contents__wr02",
					start: "-=110% top",
					end:"+=50%",
					scrub: 1,
				},
			});

			main01_03.fromTo("#main__contents__wr02 .con02__video__box",
				{opacity:0, y:"-200%", scale:1, duration: 1, ease: "power1.inOut"},
				{opacity:0.7, y:"-50%", scale:3, duration: 1, ease: "power1.inOut"});



			var container = document.querySelector(".main__contents__wr04 .rotating__letters__wr");
			if (!container) return;

			// li 생성 (A~Z + 남은 칸 -)
			if (container.innerHTML.trim() === "") {
			  for (let i = 65; i <= 90; i++) {
				container.innerHTML += `<li><p>${String.fromCharCode(i)}</p></li>`;
			  }
			  var total = 30;
			  var added = total - 26;
			  for (let i = 0; i < added; i++) {
				container.innerHTML += `<li><p>-</p></li>`;
			  }
			}

			var items = container.querySelectorAll('li');
			var reverseIndexes = [1,2,3,7,8,9,13,14,15,19,20];

			let targetRotation = 0;
			let currentRotation = 0;
			let totalRotation = 0; // 누적 회전값

			var main01_04__mo = gsap.timeline({
			  scrollTrigger: {
				trigger: "#main__contents__wr04",
				start: "-=20% top",
				end: "+=100%",
				scrub: 1,
			  }
			});

			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(1) p", {color: "#fff", duration: 1});
			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(12) p", {color: "#fff", duration: 1});
			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(14) p", {color: "#fff", duration: 1});
			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(16) p", {color: "#fff", duration: 1});
			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(26) p", {color: "#fff", duration: 1});
			main01_04__mo.to("#main__contents__wr04 .rotating__letters__wr li:nth-child(28) p", {color: "#fff", duration: 1});
		
		} /* 570px EMD*/

	}); 
});