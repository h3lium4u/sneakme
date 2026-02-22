document.addEventListener("DOMContentLoaded", () => {
	
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
		"(min-width:1025px)": function() {
			//////////////////////////////////////////////// 텍스트 정렬 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			const alignLines = document.querySelectorAll(".align__line");

			alignLines.forEach(line => {
				const length = line.getTotalLength();
				line.style.strokeDasharray = length;
				line.style.strokeDashoffset = length;

				gsap.to(line, {
					strokeDashoffset: 0,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".main__conts__align__box",
						start: "-50% top",
						end: "bottom+=170% bottom",
						scrub: 1
					}
				});
			});

			const main__conts__align__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__conts__alignment__wr",
					start: "top top",
					end: "+=3000",
					pin: true,
					scrub: 1,
				}
			});
			main__conts__align__act				
				.to(".main__conts__align__img__wr video", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "150%", rotation: -40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "200%", rotation: -30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "150%", rotation: -20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "100%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__t1", { y: "210%", rotation: 10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__i1", { y: "140%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "210%", rotation: 30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "140%", rotation: 40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "200%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "500%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "280%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "400%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "250%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "350%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox2__o2", { y: "250%", rotation: 10, ease: "power3.out" }, "<")				
				.to(".main__conts__align__tbox2__m2__1", { y: "400%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "280%", rotation: 10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "500%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "200%", rotation: 10, ease: "power3.out" }, "<")
				.to({}, { duration: 0.1 })
				.to(".main__conts__align__img__wr video", { y: "0%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "0%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__t1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__i1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__o2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")					
				.to(".main__conts__align__tbox2__m2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__wr2", { y: "0%", opacity: "1", ease: "power3.out" }, "<")
				.to({}, { duration: 0.5 })
				.to(".main__conts__align__img__wr video", { y: "10%", opacity: 0.4, ease: "power3.out" })
				.to(".main__conts__align__text__bg", { y: "10%", opacity: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__box", { y: "-170px", ease: "power3.out" }, "<")
				window.addEventListener("load", () => {
					alignLetterImagesCenter(".main__conts__align__text__box01");
					alignLetterImagesCenter(".main__conts__align__text__box02");
					//alignLetterImagesCenter(".main__conts__align__text__box01__mo");
					//alignLetterImagesCenter(".main__conts__align__text__box02__mo");
					//alignLetterImagesCenter(".main__conts__align__text__box03__mo");
				});
			;

			//////////////////////////////////////////////// 텍스트 스택 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////	
			const stack__boxes = gsap.utils.toArray(".main__conts__stack__box00");
			gsap.set(stack__boxes[0], { y: "0%" });
			gsap.set(stack__boxes[1], { y: "100%" });
			gsap.set(stack__boxes[2], { y: "200%" });
			gsap.set(stack__boxes[3], { y: "300%" });

			const main__conts__stack__act = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__conts__stack__wr",
					start: "top top",
					end: "+=5000",
					scrub: true,
					pin: true
				}
			});
			main__conts__stack__act
				.to({}, { duration: 1 })

				.to(stack__boxes[1], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[3], { y: "200%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[0], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.05")

				.to(stack__boxes[2], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[3], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[1], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.05")

				.to(stack__boxes[3], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.05")
			;

			////////////////////////////////////////////////푸터 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			gsap.to(".footer__video__box video", {
				scale: 1,
				opacity: 0.3,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".footer__video__box",   // 푸터 영역
					start: "top bottom",      // 푸터가 화면에 들어올 때
					end: "top top",        // 푸터가 화면 중앙에 위치할 때까지
					scrub: true               // 스크롤에 따라 진행
				}
			});
		}, /* 1025px END */




		"(min-width: 821px) and (max-width: 1024px)": function() {
			//////////////////////////////////////////////// 텍스트 정렬 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			const alignLines = document.querySelectorAll(".align__line");

			alignLines.forEach(line => {
				const length = line.getTotalLength();
				line.style.strokeDasharray = length;
				line.style.strokeDashoffset = length;

				gsap.to(line, {
					strokeDashoffset: 0,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".main__conts__align__box",
						start: "-50% top",
						end: "bottom+=320% bottom",
						scrub: 1
					}
				});
			});

			const main__conts__align__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__conts__alignment__wr",
					start: "top top",
					end: "+=2000",
					pin: true,
					scrub: 1,
				}
			});
			main__conts__align__act
				.to(".main__conts__align__img__wr video", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "150%", rotation: -40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "200%", rotation: -30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "150%", rotation: -20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "100%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__t1", { y: "210%", rotation: 10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__i1", { y: "140%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "210%", rotation: 30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "140%", rotation: 40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "200%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "500%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "280%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "400%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "250%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "350%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox2__o2", { y: "250%", rotation: 10, ease: "power3.out" }, "<")				
				.to(".main__conts__align__tbox2__m2__1", { y: "400%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "280%", rotation: 10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "500%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "200%", rotation: 10, ease: "power3.out" }, "<")
				.to({}, { duration: 0.1 })
				.to(".main__conts__align__img__wr video", { y: "20%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "20%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__t1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__i1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__o2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")					
				.to(".main__conts__align__tbox2__m2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__wr2", { y: "0%", opacity: "1", ease: "power3.out" }, "<")
				.to({}, { duration: 0.5 })
				.to(".main__conts__align__img__wr video", { y: "10%", opacity: 0.4, ease: "power3.out" })
				.to(".main__conts__align__text__bg", { y: "10%", opacity: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__box", { y: "-90px", ease: "power3.out" }, "<")
				window.addEventListener("load", () => {
					alignLetterImagesCenter(".main__conts__align__text__box01");
					alignLetterImagesCenter(".main__conts__align__text__box02");
					//alignLetterImagesCenter(".main__conts__align__text__box01__mo");
					//alignLetterImagesCenter(".main__conts__align__text__box02__mo");
					//alignLetterImagesCenter(".main__conts__align__text__box03__mo");
				});
			;

			//////////////////////////////////////////////// 텍스트 스택 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////	
			const stack__boxes = gsap.utils.toArray(".main__conts__stack__box00");
			gsap.set(stack__boxes[0], { y: "0%" });
			gsap.set(stack__boxes[1], { y: "100%" });
			gsap.set(stack__boxes[2], { y: "200%" });
			gsap.set(stack__boxes[3], { y: "300%" });

			const main__conts__stack__act = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__conts__stack__wr",
					start: "top top",
					end: "+=3000",
					scrub: true,
					pin: true
				}
			});
			main__conts__stack__act
				.to({}, { duration: 1 })

				.to(stack__boxes[1], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[3], { y: "200%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[0], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")
				.to({}, { duration: 1 })

				.to(stack__boxes[2], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[3], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[1], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")
				.to({}, { duration: 1 })

				.to(stack__boxes[3], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")
				.to({}, { duration: 1 })
			;


			//////////////////////////////////////////////// 푸터 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			gsap.to(".footer__video__box video", {
				scale: 1,
				opacity: 0.3,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".footer__video__box",   // 푸터 영역
					start: "top bottom",      // 푸터가 화면에 들어올 때
					end: "top top",        // 푸터가 화면 중앙에 위치할 때까지
					scrub: true               // 스크롤에 따라 진행
				}
			});
		}, /* 821px 1024px END */
		"(min-width: 571px) and (max-width: 820px)": function() {
			//////////////////////////////////////////////// 텍스트 정렬 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			const alignLines = document.querySelectorAll(".align__line");

			alignLines.forEach(line => {
				const length = line.getTotalLength();
				line.style.strokeDasharray = length;
				line.style.strokeDashoffset = length;

				gsap.to(line, {
					strokeDashoffset: 0,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".main__conts__align__box",
						start: "-50% top",
						end: "bottom+=150% bottom",
						scrub: 1
					}
				});
			});

			const main__conts__align__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__conts__alignment__wr",
					start: "top top",
					end: "+=1500",
					pin: true,
					scrub: 1,
				}
			});
			main__conts__align__act
				.to(".main__conts__align__img__wr video", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "75%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "150%", rotation: -40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "200%", rotation: -30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "150%", rotation: -20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "100%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__t1", { y: "210%", rotation: 10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__i1", { y: "140%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "210%", rotation: 30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "140%", rotation: 40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "200%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "500%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "280%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "400%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "250%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "350%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox2__o2", { y: "250%", rotation: 10, ease: "power3.out" }, "<")				
				.to(".main__conts__align__tbox2__m2__1", { y: "400%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "280%", rotation: 10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "500%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "200%", rotation: 10, ease: "power3.out" }, "<")
				.to({}, { duration: 0.1 })
				.to(".main__conts__align__img__wr video", { y: "30%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "30%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__t1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__i1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__o2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")					
				.to(".main__conts__align__tbox2__m2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__wr2", { y: "0%", opacity: "1", ease: "power3.out" }, "<")
				.to({}, { duration: 0.5 })
				.to(".main__conts__align__img__wr video", { y: "10%", opacity: 0.4, ease: "power3.out" })
				.to(".main__conts__align__text__bg", { y: "10%", opacity: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__box", { y: "-90px", ease: "power3.out" }, "<")
				window.addEventListener("load", () => {
					alignLetterImagesCenter(".main__conts__align__text__box01");
					alignLetterImagesCenter(".main__conts__align__text__box02");
					alignLetterImagesCenter(".main__conts__align__text__box01__mo");
					alignLetterImagesCenter(".main__conts__align__text__box02__mo");
					alignLetterImagesCenter(".main__conts__align__text__box03__mo");
				});
			;

			//////////////////////////////////////////////// 텍스트 스택 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////	
			const stack__boxes = gsap.utils.toArray(".main__conts__stack__box00");
			gsap.set(stack__boxes[0], { y: "0%" });
			gsap.set(stack__boxes[1], { y: "100%" });
			gsap.set(stack__boxes[2], { y: "200%" });
			gsap.set(stack__boxes[3], { y: "300%" });

			const main__conts__stack__act = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__conts__stack__wr",
					start: "top top",
					end: "+=4000",
					scrub: true,
					pin: true
				}
			});
			main__conts__stack__act
				.to({}, { duration: 1 })

				.to(stack__boxes[1], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[3], { y: "200%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[0], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")

				.to(stack__boxes[2], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[3], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[1], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")

				.to(stack__boxes[3], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")
			;


			////////////////////////////////////////////////푸터 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			gsap.to(".footer__video__box video", {
				scale: 1,
				opacity: 0.3,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".footer__video__box",   // 푸터 영역
					start: "top bottom",      // 푸터가 화면에 들어올 때
					end: "top top",        // 푸터가 화면 중앙에 위치할 때까지
					scrub: true               // 스크롤에 따라 진행
				}
			});
		}, /* 571px 820px END */
		"(max-width: 570px)": function() {			
			//////////////////////////////////////////////// 텍스트 정렬 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			const alignLines = document.querySelectorAll(".align__line");

			alignLines.forEach(line => {
				const length = line.getTotalLength();
				line.style.strokeDasharray = length;
				line.style.strokeDashoffset = length;

				gsap.to(line, {
					strokeDashoffset: 0,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".main__conts__align__box",
						start: "-50% top",
						end: "bottom+=160% bottom",
						scrub: 1
					}
				});
			});

			const main__conts__align__act = gsap.timeline({
				scrollTrigger: {
					trigger: ".main__conts__alignment__wr",
					start: "top top",
					end: "+=2000",
					pin: true,
					scrub: 1,
				}
			});
			main__conts__align__act
				.to(".main__conts__align__img__wr video", { y: "85%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "85%", scale: 0.4, opacity: 0.5, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "450%", rotation: -40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "500%", rotation: -30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "450%", rotation: -20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "400%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__t1", { y: "610%", rotation: 10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox1__i1", { y: "440%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "610%", rotation: 30, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "440%", rotation: 40, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "600%", rotation: 20, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "800%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "580%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "700%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "550%", rotation: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "650%", rotation: -10, ease: "power3.out" }, "<")/* cen */
				.to(".main__conts__align__tbox2__o2", { y: "550%", rotation: 10, ease: "power3.out" }, "<")				
				.to(".main__conts__align__tbox2__m2__1", { y: "700%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "580%", rotation: 10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "800%", rotation: -10, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "500%", rotation: 10, ease: "power3.out" }, "<")
				.to({}, { duration: 0.1 })
				.to(".main__conts__align__img__wr video", { y: "15%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__bg", { y: "15%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__c1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__r1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__a1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__f1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__t1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__i1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__n1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox1__g1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__v2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__r2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__y2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__m2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__o2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")					
				.to(".main__conts__align__tbox2__m2__1", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__e2__2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__n2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__tbox2__t2", { y: "0%", rotation: 0, scale: 1, ease: "power3.out" }, "<")
				.to(".main__conts__align__text__wr2", { y: "0%", opacity: "1", ease: "power3.out" }, "<")
				.to({}, { duration: 0.5 })
				.to(".main__conts__align__img__wr video", { y: "10%", opacity: 0.4, ease: "power3.out" })
				.to(".main__conts__align__text__bg", { y: "10%", opacity: 0, ease: "power3.out" }, "<")
				.to(".main__conts__align__box", { y: "-40px", ease: "power3.out" }, "<")
				window.addEventListener("load", () => {
					alignLetterImagesCenter(".main__conts__align__text__box01");
					alignLetterImagesCenter(".main__conts__align__text__box02");
					alignLetterImagesCenter(".main__conts__align__text__box01__mo");
					alignLetterImagesCenter(".main__conts__align__text__box02__mo");
					alignLetterImagesCenter(".main__conts__align__text__box03__mo");
				});
			;

			//////////////////////////////////////////////// 텍스트 스택 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////	
			const stack__boxes = gsap.utils.toArray(".main__conts__stack__box00");
			gsap.set(stack__boxes[0], { y: "0%" });
			gsap.set(stack__boxes[1], { y: "100%" });
			gsap.set(stack__boxes[2], { y: "200%" });
			gsap.set(stack__boxes[3], { y: "300%" });

			const main__conts__stack__act = gsap.timeline({
				scrollTrigger: {
					trigger: "#main__conts__stack__wr",
					start: "top top",
					end: "+=3000",
					scrub: true,
					pin: true
				}
			});
			main__conts__stack__act
				.to({}, { duration: 1 })

				.to(stack__boxes[1], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[3], { y: "200%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[0], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")

				.to(stack__boxes[2], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[3], { y: "100%", ease: "power3.out", duration: 1 }, "<")
				.to(stack__boxes[1], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")

				.to(stack__boxes[3], { y: 0, ease: "power3.out", duration: 1 })
				.to(stack__boxes[2], { 
					scale: 0.85, 
					filter: "blur(10px)", 
					ease: "power3.out",
					duration: 1
				}, "<+0.1")
			;

			////////////////////////////////////////////////푸터 액션
			////////////////////////////////////////////////
			////////////////////////////////////////////////
			gsap.to(".footer__video__box video", {
				scale: 1,
				opacity: 0.3,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".footer__video__box",   // 푸터 영역
					start: "top bottom",      // 푸터가 화면에 들어올 때
					end: "top top",        // 푸터가 화면 중앙에 위치할 때까지
					scrub: true               // 스크롤에 따라 진행
				}
			});
		}, /* 570px END */
	});

});