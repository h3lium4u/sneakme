document.addEventListener("DOMContentLoaded", () => {
	const today = new Date();

	// 서수(ordinal) 함수
	function getOrdinalSuffix(day) {
		if (day >= 11 && day <= 13) return "th"; // 11th, 12th, 13th
		const lastDigit = day % 10;
		switch (lastDigit) {
			case 1: return "st";
			case 2: return "nd";
			case 3: return "rd";
			default: return "th";
		}
	}

	const day = today.getDate();
	const suffix = getOrdinalSuffix(day);

	const formatted =
		today.toLocaleString("en-US", { month: "short" }).toUpperCase() +
		" " +
		day +
		suffix + " " +
		today.getFullYear();

	document.getElementById("date").textContent = formatted;

	//---------------------- CLOCK ----------------------//

	function updateClock() {
		const now = new Date();
		const h = String(now.getHours()).padStart(2, '0');
		const m = String(now.getMinutes()).padStart(2, '0');
		const s = String(now.getSeconds()).padStart(2, '0');
		const cs = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

		const time = `${h}:${m}:${s}:${cs}`;

		document.querySelectorAll('.clock__time').forEach(el => {
			el.textContent = time;
		});
	}

	setInterval(updateClock, 50);
	updateClock();



		// A-Z 인트로
		const element = document.getElementById("scramble");
		const FINAL_TEXT = "A -- Z";
		const LENGTH = FINAL_TEXT.length;
		const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

		function randomChar() {
			return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
		}

		function playScramble() {
			const display = Array.from({ length: LENGTH }, (_, index) => {
				if (index < 5) {
					return randomChar();
				}
				return ' '; // 6번째 글자는 초기에 공백으로 둡니다.
			});

			element.innerHTML = display.map((c, i) => renderChar(c, i)).join("");

			FINAL_TEXT.split("").forEach((targetChar, index) => {

				const startDelay = index * 250; // 글자별 딜레이 (원하면 조절 가능)

				setTimeout(() => {
					let frame = 0;
					let maxFrames = 10 + index * 5;

					const interval = setInterval(() => {
						frame++;

						// 랜덤 돌리는 중
						display[index] = randomChar();

						element.innerHTML = display.map((c, i) => renderChar(c, i)).join("");

						// 최종 글자로 고정
						if (frame >= maxFrames) {
							clearInterval(interval);
							display[index] = targetChar;
							element.innerHTML = display.map((c, i) => renderChar(c, i)).join("");
						}

					}, 60);

				}, startDelay);
			});
		}

		function renderChar(c, i) {
			// 대시면 special 클래스 적용
			if (FINAL_TEXT[i] === "-") return `<span class="special">${c}</span>`;
			return `<span>${c}</span>`;
		}

		playScramble();

	

	// A~Z 
	const ul = document.querySelector(".main__contents__wr04 .rotating__letters__wr");
	if (!ul) return;
	if (window.innerWidth >= 1025) {

		// A-Z 채우기
		for (let i = 65; i <= 90; i++) {
			const ch = String.fromCharCode(i);
			ul.innerHTML += `<li><p>${ch}</p></li>`;
		}

		// 30칸 맞추기 위해 '-' 추가
		const total = 30;
		const added = total - 26;
		for (let i = 0; i < added; i++) {
			ul.innerHTML += `<li><p>-</p></li>`;
		}

		const container = document.querySelector('.main__contents__wr04 .rotating__letters__wr');
		const items = container.querySelectorAll('li');
		const reverseIndexes = [1, 2, 3, 7, 8, 9, 13, 14, 15, 19, 20];

		let targetRotation = 0;
		let currentRotation = 0;
		let hoverIndex = null;

		// 마우스 움직임 → 전체 회전 목표 계산
		container.addEventListener('mousemove', e => {
			const rect = container.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const percent = x / rect.width;
			targetRotation = percent * 360;

			// 마우스 좌표 저장
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		container.addEventListener('mouseleave', () => {
			targetRotation = 0;
			hoverIndex = null;
		});

		items.forEach((li, i) => {
			li.addEventListener('mouseenter', () => {
				hoverIndex = i;
			});
			li.addEventListener('mouseleave', () => {
				hoverIndex = null;
			});
		});

		let mouseX = 0;
		let mouseY = 0;

		function animate() {
			currentRotation += (targetRotation - currentRotation) * 0.08;

			items.forEach((li, i) => {
				const p = li.querySelector('p');
				const isReverse = reverseIndexes.includes(i + 1);

				let rotation = isReverse ? -currentRotation : currentRotation;

				// 마우스 올라간 li는 마우스 방향에 따라 회전
				if (hoverIndex === i) {
					const rect = li.getBoundingClientRect();
					const centerX = rect.left + rect.width / 2;
					const centerY = rect.top + rect.height / 2;

					// 마우스 위치 기준 각도 계산
					const dx = mouseX - centerX;
					const dy = mouseY - centerY;
					const angle = Math.atan2(dy, dx) * (180 / Math.PI);

					rotation = angle; // 마우스 방향에 따라 회전
				}

				p.style.transform = `rotate(${rotation}deg)`;
			});

			requestAnimationFrame(animate);
		}

		animate();

	}


	// Card Hover
//	const carditems = document.querySelectorAll('.action__card__box');
//	carditems.forEach(item => {
//	  const baseRotateX = 2;  // 기본 CSS 회전값
//	  const baseRotateY = -20;
//
//	  function onMouseMove(e) {
//		const rect = item.getBoundingClientRect();
//		const x = e.clientX - rect.left;
//		const y = e.clientY - rect.top;
//
//		const rotateX = baseRotateX + ((y / rect.height) - 0.5) * 45;
//		const rotateY = baseRotateY + ((x / rect.width) - 0.5) * -45;
//
//		item.style.transform = `
//		  translate(-50%, -50%)
//		  rotateX(${rotateX}deg)
//		  rotateY(${rotateY}deg)
//		`;
//	  }
//
//	  function onMouseLeave() {
//		item.style.transform = `translate(-50%, -50%) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg)`;
//	  }
//
//	  item.addEventListener('mousemove', onMouseMove);
//	  item.addEventListener('mouseleave', onMouseLeave);
//
//	});


	// Slide Text
	document.querySelectorAll('.text__act__sw .swiper-slide:not(.swiper-slide-duplicate) p')
	  .forEach(p => {
		const text = p.textContent;
		const letters = text.split('');
		p.innerHTML = letters.map(l => `<span>${l}</span>`).join('');
	  });

	// 초기화 함수
	function resetLetters(slide) {
	  if (slide.classList.contains('swiper-slide-duplicate')) return;
	  slide.querySelectorAll("span").forEach(letter => {
		letter.style.opacity = 0;
		letter.style.transform = "translateY(60px)";
	  });
	}

	// 등장 애니메이션
	function animateIn(slide) {
	  if (slide.classList.contains('swiper-slide-duplicate')) return;
	  const letters = slide.querySelectorAll('span');
	  letters.forEach((letter, i) => {
		setTimeout(() => {
		  letter.style.opacity = 1;
		  letter.style.transform = "translateY(0)";
		}, i * 80);
	  });
	}

	// 사라짐 애니메이션
	function animateOut(slide) {
	  if (slide.classList.contains('swiper-slide-duplicate')) return;
	  const letters = slide.querySelectorAll('span');
	  letters.forEach((letter, i) => {
		setTimeout(() => {
		  letter.style.opacity = 0;
		  letter.style.transform = "translateY(-60px)";
		}, i * 80);
	  });
	}

	var textsw = new Swiper(".text__act__sw", {
	  slidesPerView: 1,
	  loopAdditionalSlides: 1,
	  centeredSlides: true,
	  allowTouchMove: false,
	  loop: true,
	  speed: 2000,
	  autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	  },
	  direction: 'vertical',
	  spaceBetween: 0,

	  on: {
		init() {
		  // 실제 슬라이드만 초기화
		  this.slides.forEach(s => resetLetters(s));
		  animateIn(this.slides[this.activeIndex]);
		},

		slideChangeTransitionStart() {
		  const prev = this.slides[this.previousIndex];
		  const current = this.slides[this.activeIndex];

		  animateOut(prev);
		  resetLetters(current);
		  animateIn(current);
		}
	  }
	});


	$(window).on('scroll', function () {

		let scrollTop = $(this).scrollTop();
		let winWidth = $(window).width();

		// 기본값 10%
		let showPoint = $(document).height() * 0.1;

		// 570px 이하일 때 6%
		if (winWidth <= 570) {
			showPoint = $(document).height() * 0.06;
		}

		if (scrollTop > showPoint) {
			$('.topscr__btn__wr').addClass('show');
		} else {
			$('.topscr__btn__wr').removeClass('show');
		}
	});

	// 버튼 클릭 시 맨 위로 이동
	$('.topscr__btn__wr').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 500);
	});






}); //DOMContentLoaded END






