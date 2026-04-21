document.addEventListener("DOMContentLoaded", () => {

    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            cursorRing.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Expand ring on hover over links and buttons
        document.querySelectorAll('a, button, .main__btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '60px';
                cursorRing.style.height = '60px';
                cursorRing.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '40px';
                cursorRing.style.height = '40px';
                cursorRing.style.backgroundColor = 'transparent';
            });
        });
    }

    // 2. Loading Overlay – fade out after page loads
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        setTimeout(() => {
            loadingEl.style.opacity = '0';
            setTimeout(() => { loadingEl.style.display = 'none'; }, 600);
        }, 1500);
    }

    // 3. Date (right side) – formatted like "FEB 21st 2026"
    const today = new Date();
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) return "th";
        const last = day % 10;
        switch (last) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    const dayNum = today.getDate();
    const dateStr =
        today.toLocaleString("en-US", { month: "short" }).toUpperCase() +
        " " + dayNum + getOrdinalSuffix(dayNum) + " " + today.getFullYear();
    const dateEl = document.getElementById('date');
    if (dateEl) dateEl.textContent = dateStr;

    // 4. Clock (left side) – HH:MM:SS:CC with centiseconds
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

    // 5. A — Z Scramble Animation
    const scrambleEl = document.getElementById('scramble');
    if (scrambleEl) {
        const FINAL_TEXT = "CODE -- AI";
        const LENGTH = FINAL_TEXT.length;
        const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        function randomChar() {
            return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
        }

        function renderChar(c, i) {
            if (FINAL_TEXT[i] === "-") return `<span class="special">${c}</span>`;
            return `<span>${c}</span>`;
        }

        function playScramble() {
            const display = Array.from({ length: LENGTH }, (_, i) => {
                if (i < 5) return randomChar();
                return ' ';
            });

            scrambleEl.innerHTML = display.map((c, i) => renderChar(c, i)).join("");

            FINAL_TEXT.split("").forEach((targetChar, index) => {
                const startDelay = index * 250;
                setTimeout(() => {
                    let frame = 0;
                    const maxFrames = 10 + index * 5;
                    const interval = setInterval(() => {
                        frame++;
                        display[index] = randomChar();
                        scrambleEl.innerHTML = display.map((c, i) => renderChar(c, i)).join("");
                        if (frame >= maxFrames) {
                            clearInterval(interval);
                            display[index] = targetChar;
                            scrambleEl.innerHTML = display.map((c, i) => renderChar(c, i)).join("");
                        }
                    }, 60);
                }, startDelay);
            });
        }

        playScramble();
    }

    // 6. Intro Scroll-Out Animation
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main__intro__wr",
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true
        }
    });

    introTl.to(".scramble", { scale: 3, opacity: 0, filter: "blur(10px)", ease: "power2.inOut" })
        .to(".video__box", { scale: 2, opacity: 0, ease: "power2.inOut" }, "<")
        .to(".intro__contents__box .left", { x: -100, opacity: 0, ease: "power2.inOut" }, "<")
        .to(".intro__contents__box .right", { x: 100, opacity: 0, ease: "power2.inOut" }, "<")
        .to(".scroll__box", { opacity: 0, ease: "power2.inOut" }, "<");

    // Cinematic Strips (Plan-AZ effect)
    const cStripsLg = document.querySelectorAll('.c-strip--lg .parallax-wrapper');
    const cStripsSm = document.querySelectorAll('.c-strip--sm .parallax-wrapper');

    if (cStripsLg.length && cStripsSm.length) {
        // Move Right Automatically (Start at -50% to hide the left gap and move to 0%)
        gsap.fromTo(cStripsLg,
            { xPercent: -50 },
            {
                xPercent: 0,
                repeat: -1,
                duration: 20,
                ease: "linear"
            }
        );

        // Move Left Automatically (Start at 0% and move to -50%)
        gsap.fromTo(cStripsSm,
            { xPercent: 0 },
            {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear"
            }
        );
    }

    // Cinematic Letters Parallax
    gsap.to("#cinematicA", {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: "#cinematic",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to("#cinematicZ", {
        y: -100,
        ease: "none",
        scrollTrigger: {
            trigger: "#cinematic",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });


    // 7. Hero Section Animations
    const heroLines = document.querySelectorAll(".e__text");
    heroLines.forEach((line, index) => {
        gsap.fromTo(line,
            { y: 80, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.2, delay: index * 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#main__contents__wr00",
                    start: "top 80%",
                }
            }
        );
    });

    // Hero subtitle fade in
    gsap.fromTo(".text02",
        { y: 30, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: "#main__contents__wr00", start: "top 80%" }
        }
    );

    // 3D Glass Object – scroll-driven entrance moving to the right side
    const objectBox = document.querySelector('.right__object__box');
    if (objectBox) {
        gsap.fromTo(objectBox,
            { x: "-50vw", y: 150, opacity: 0, scale: 0.5, rotation: -15 },
            {
                x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, duration: 2, delay: 0.2,
                ease: "power3.out",
                scrollTrigger: { trigger: "#main__contents__wr00", start: "top 90%" }
            }
        );

        // Continuous gentle floating motion
        gsap.to(objectBox, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    // LFG Marquee Animation (Expertise Section - 4 Lines Alternating)
    const tracks = [
        { id: 'track1', dir: -1 }, // Left
        { id: 'track2', dir: 1 },  // Right
        { id: 'track3', dir: -1 }, // Left
        { id: 'track4', dir: 1 }   // Right
    ];

    const marqueeTweens = [];

    tracks.forEach(track => {
        const el = document.getElementById(track.id);
        if (el) {
            const tween = gsap.fromTo(el,
                { xPercent: track.dir === -1 ? 0 : -50 },
                {
                    xPercent: track.dir === -1 ? -50 : 0,
                    repeat: -1,
                    duration: 15,
                    ease: "linear"
                }
            );
            marqueeTweens.push(tween);
        }
    });

    if (marqueeTweens.length > 0) {
        let targetSpeed = 1;
        let currentSpeed = 1;

        ScrollTrigger.create({
            trigger: "#main__contents__wr00",
            start: "top bottom",
            end: "bottom top",
            onEnter: () => marqueeTweens.forEach(tween => tween.play()),
            onLeave: () => marqueeTweens.forEach(tween => tween.pause()),
            onEnterBack: () => marqueeTweens.forEach(tween => tween.play()),
            onLeaveBack: () => marqueeTweens.forEach(tween => tween.pause()),
            onUpdate: (self) => {
                targetSpeed = 1 + Math.abs(self.getVelocity() / 100);
            },
            onLeave: () => {
                targetSpeed = 1;
                marqueeTweens.forEach(tween => tween.pause());
            },
            onLeaveBack: () => {
                targetSpeed = 1;
                marqueeTweens.forEach(tween => tween.pause());
            }
        });

        // Optimized smooth speed update using ticker (prevents spamming new tweens)
        gsap.ticker.add(() => {
            if (currentSpeed !== targetSpeed) {
                currentSpeed += (targetSpeed - currentSpeed) * 0.1;
                if (Math.abs(currentSpeed - targetSpeed) < 0.01) currentSpeed = targetSpeed;
                marqueeTweens.forEach(tween => tween.timeScale(currentSpeed));
            }
        });

        // Reset to normal on scroll end
        ScrollTrigger.addEventListener("scrollEnd", () => {
            targetSpeed = 1;
        });
    }

    // 5. Projects – Professional Scroll-Pinned Card Reveal
    const projectSection = document.querySelector('.main__card__wr01');
    const fixedCard = document.querySelector('.fixed__act__card');
    const cards = gsap.utils.toArray('.action__card__box');

    if (projectSection && fixedCard && cards.length > 0) {
        const numCards = cards.length;

        // The section needs enough height to "hold" each card
        // (numCards - 1) transitions + 1 full-view at start + 0.5 at end
        projectSection.style.height = `${(numCards + 0.5) * 100}vh`;

        // ---- Initial states ----
        // Later cards must have HIGHER z-index so they wipe OVER earlier ones
        cards.forEach((card, i) => {
            const img = card.querySelector('.card__img');
            const overlay = card.querySelector('.card__text__overlay');
            const explanation = card.querySelector('.card__explanation');

            gsap.set(card, { zIndex: i + 1 });

            if (i === 0) {
                // Card 0: fully visible
                gsap.set(card, { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 });
                gsap.set(img, { scale: 1.08 });
                gsap.set(overlay, { opacity: 1, y: 0 });
                if (explanation) gsap.set(explanation, { opacity: 1, y: 0 });
            } else {
                // Cards 1-3: hidden below via clip-path
                gsap.set(card, { clipPath: 'inset(100% 0% 0% 0% round 28px)', opacity: 1 });
                gsap.set(img, { scale: 1.2 });
                gsap.set(overlay, { opacity: 0, y: 40 });
                if (explanation) gsap.set(explanation, { opacity: 0, y: 50 });
            }
        });

        // ---- Build the master timeline ----
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectSection,
                start: 'top top',
                end: () => `+=${(numCards - 1 + 0.5) * window.innerHeight}`,
                pin: fixedCard,
                scrub: 1,
            }
        });

        // Hold first card visible for a moment
        tl.to({}, { duration: 0.4 });

        for (let i = 0; i < numCards - 1; i++) {
            const currentCard = cards[i];
            const nextCard = cards[i + 1];
            const currentImg = currentCard.querySelector('.card__img');
            const currentOverlay = currentCard.querySelector('.card__text__overlay');
            const currentExplanation = currentCard.querySelector('.card__explanation');

            const nextImg = nextCard.querySelector('.card__img');
            const nextOverlay = nextCard.querySelector('.card__text__overlay');
            const nextExplanation = nextCard.querySelector('.card__explanation');

            // --- Phase 1: Current card zooms & fades its text out ---
            tl.to(currentOverlay, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' })
                .to(currentExplanation, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }, '<')
                .to(currentImg, { scale: 1.18, duration: 0.6, ease: 'power2.in' }, '<');

            // --- Phase 2: Next card wipes UP with a clip-path reveal ---
            tl.to(nextCard, {
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                duration: 0.8,
                ease: 'power3.inOut'
            }, '-=0.3')
                .to(nextImg, {
                    scale: 1.08,
                    duration: 0.8,
                    ease: 'power3.inOut'
                }, '<');

            // --- Phase 3: Text of new card fades in with a slight upward drift ---
            tl.to(nextOverlay, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
                .to(nextExplanation, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');

            // Hold on the new card briefly
            tl.to({}, { duration: 0.4 });
        }

        // Final hold
        tl.to({}, { duration: 0.5 });
    }



    // 6. USP Cards Scroll Animation & Swiper
    function throttle(callback, delay) {
        let lastTimeout = null;
        let lastArgs = null;
        return function () {
            lastArgs = arguments;
            if (!lastTimeout) {
                lastTimeout = setTimeout(() => {
                    callback.apply(this, lastArgs);
                    lastTimeout = null;
                }, delay);
            }
        };
    }

    function handleListAnimation() {
        const listItems = document.querySelectorAll('#main__contents__box03 .list__ul > li');
        if (listItems.length === 0) return;

        const triggerPoint = window.innerHeight * 0.4;
        let currentActiveLi = null;

        for (let i = listItems.length - 1; i >= 0; i--) {
            const li = listItems[i];
            const itemTop = li.getBoundingClientRect().top;
            if (itemTop <= triggerPoint) {
                currentActiveLi = li;
                break;
            }
        }

        listItems.forEach(li => {
            if (li === currentActiveLi) {
                if (!li.classList.contains('active')) li.classList.add('active');
            } else {
                if (li.classList.contains('active')) li.classList.remove('active');
            }
        });

        if (window.scrollY === 0) {
            if (listItems[0] && !listItems[0].classList.contains('active')) {
                listItems.forEach(li => li.classList.remove('active'));
                listItems[0].classList.add('active');
            }
        }
    }

    const throttledScrollHandler = throttle(handleListAnimation, 50);
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('DOMContentLoaded', () => {
        handleListAnimation();
    });
    window.addEventListener('resize', throttledScrollHandler);

    // USP Swiper Initialization
    const flowSwiper = (selector, reverse = false) => {
        if (document.querySelector(selector)) {
            return new Swiper(selector, {
                loop: true,
                allowTouchMove: false,
                slidesPerView: 'auto',
                speed: 40000,
                spaceBetween: 0,
                autoplay: {
                    delay: 1,
                    disableOnInteraction: false,
                    reverseDirection: reverse,
                },
            });
        }
    };
    flowSwiper(".mySwiper", false);
    flowSwiper(".mySwiper01", true);
    flowSwiper(".mySwiper02", false);

    // 7. Marquee Text
    const marqueeContent = document.querySelector('.marquee__content');
    if (marqueeContent) {
        const marqueeTween = gsap.to(marqueeContent, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1,
            paused: true // Start paused
        });

        ScrollTrigger.create({
            trigger: marqueeContent,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => marqueeTween.play(),
            onLeave: () => marqueeTween.pause(),
            onEnterBack: () => marqueeTween.play(),
            onLeaveBack: () => marqueeTween.pause()
        });
    }

    // 8. Text Alignment Animation ("CRAFTING EVERY MOMENT")
    function alignLetterImagesCenter(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const spans = container.querySelectorAll("span");
        let loadedCount = 0;
        const imgs = container.querySelectorAll("img");

        imgs.forEach(img => {
            if (img.complete) check();
            else img.onload = check;
        });

        function check() {
            loadedCount++;
            if (loadedCount === imgs.length) layout();
        }

        function layout() {
            let totalWidth = 0;
            imgs.forEach(img => totalWidth += img.width || 70); // default width fallback
            const parentWidth = container.offsetWidth;
            let currentLeft = (parentWidth - totalWidth) / 2;

            spans.forEach(span => {
                const img = span.querySelector('img');
                span.style.left = currentLeft + "px";
                span.style.position = "absolute";
                currentLeft += img.width || 70;
            });
        }

        // Timeout fallback just in case
        setTimeout(layout, 500);
    }

    window.addEventListener('load', () => {
        alignLetterImagesCenter(".main__conts__align__text__box01");
        alignLetterImagesCenter(".main__conts__align__text__box02");
    });

    const alignTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main__conts__alignment__wr",
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1
        }
    });

    // Set initial off-screen states so they fly up as you scroll
    gsap.set(".main__conts__align__img__wr video", { y: "150%", scale: 0.2, opacity: 0 });
    gsap.set(".main__conts__align__tbox1__c1, .main__conts__align__tbox1__a1", { y: "500%" });
    gsap.set(".main__conts__align__tbox1__r1", { y: "600%" });
    gsap.set(".main__conts__align__tbox1__f1, .main__conts__align__tbox1__i1, .main__conts__align__tbox1__g1", { y: "450%" });
    gsap.set(".main__conts__align__tbox1__t1, .main__conts__align__tbox1__n1", { y: "550%" });

    gsap.set(".main__conts__align__tbox2__e2, .main__conts__align__tbox2__t2", { y: "500%" });
    gsap.set(".main__conts__align__tbox2__v2, .main__conts__align__tbox2__n2", { y: "800%" });
    gsap.set(".main__conts__align__tbox2__e2__1, .main__conts__align__tbox2__e2__2", { y: "580%" });
    gsap.set(".main__conts__align__tbox2__r2, .main__conts__align__tbox2__m2__1", { y: "700%" });
    gsap.set(".main__conts__align__tbox2__y2, .main__conts__align__tbox2__o2", { y: "550%" });
    gsap.set(".main__conts__align__tbox2__m2", { y: "650%" });
    gsap.set(".main__conts__align__text__wr2", { y: "50%", opacity: 0 });

    // 1st Stage: Scatter
    alignTl
        .to(".main__conts__align__img__wr video", { y: "75%", scale: 0.4, opacity: 0.7, ease: "power3.out" })
        .to(".align__line", { strokeDashoffset: 0, ease: "none" }, "<")
        .to(".main__conts__align__tbox1__c1", { y: "150%", rotation: -40, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__r1", { y: "200%", rotation: -30, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__a1", { y: "150%", rotation: -20, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__f1", { y: "100%", rotation: -10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__t1", { y: "210%", rotation: 10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__i1", { y: "140%", rotation: 20, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__n1", { y: "210%", rotation: 30, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox1__g1", { y: "140%", rotation: 40, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__e2", { y: "200%", rotation: 20, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__v2", { y: "500%", rotation: 0, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__e2__1", { y: "280%", rotation: -10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__r2", { y: "400%", rotation: 0, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__y2", { y: "250%", rotation: 0, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__m2", { y: "350%", rotation: -10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__o2", { y: "250%", rotation: 10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__m2__1", { y: "400%", rotation: -10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__e2__2", { y: "280%", rotation: 10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__n2", { y: "500%", rotation: -10, ease: "power3.out" }, "<")
        .to(".main__conts__align__tbox2__t2", { y: "200%", rotation: 10, ease: "power3.out" }, "<")
        .to({}, { duration: 0.1 })

        // 2nd Stage: Align
        .to(".main__conts__align__img__wr video", { y: "0%", scale: 1, opacity: 1, ease: "power3.out" }, "<")
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
        .to(".main__conts__align__text__wr2", { y: "0%", opacity: 1, ease: "power3.out" }, "<")
        .to({}, { duration: 0.5 })

        // 3rd Stage: Move out
        .to(".main__conts__align__img__wr video", { y: "10%", opacity: 0.4, ease: "power3.out" })
        .to(".main__conts__align__box", { y: "-170px", ease: "power3.out" }, "<");


    // 9. Services Stack Animation
    const stackCards = gsap.utils.toArray(".stack__card");
    const stackVideos = stackCards.map(card => card.querySelector('.stack__bg__video'));

    function manageStackVideos(activeIndex) {
        stackVideos.forEach((video, idx) => {
            if (video) {
                if (idx === activeIndex) {
                    video.play().catch(e => console.log("Video Play Blocked:", e));
                } else {
                    video.pause();
                }
            }
        });
    }

    if (stackCards.length > 0) {
        gsap.set(stackCards[0], { y: "0%" });
        gsap.set(stackCards[1], { y: "100%" });
        gsap.set(stackCards[2], { y: "200%" });
        gsap.set(stackCards[3], { y: "300%" });

        const stackTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#main__conts__stack__wr",
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
                onEnter: () => manageStackVideos(0), // Play first video on enter
                onLeave: () => manageStackVideos(-1), // Pause all on leave
                onEnterBack: () => manageStackVideos(3), // Play last video on enter back (assuming card 3 is top)
                onLeaveBack: () => manageStackVideos(-1) // Pause all on leave back
            }
        });

        stackTl.to({}, { duration: 1, onStart: () => manageStackVideos(0), onReverseComplete: () => manageStackVideos(0) })
            .to(stackCards[1], { y: 0, ease: "power3.out", duration: 1, onStart: () => manageStackVideos(1), onReverseComplete: () => manageStackVideos(0) })
            .to(stackCards[0], { scale: 0.85, filter: "blur(10px)", opacity: 0.5, ease: "power3.out", duration: 1 }, "<")

            .to(stackCards[2], { y: 0, ease: "power3.out", duration: 1, onStart: () => manageStackVideos(2), onReverseComplete: () => manageStackVideos(1) })
            .to(stackCards[1], { scale: 0.85, filter: "blur(10px)", opacity: 0.5, ease: "power3.out", duration: 1 }, "<")

            .to(stackCards[3], { y: 0, ease: "power3.out", duration: 1, onStart: () => manageStackVideos(3), onReverseComplete: () => manageStackVideos(2) })
            .to(stackCards[2], { scale: 0.85, filter: "blur(10px)", opacity: 0.5, ease: "power3.out", duration: 1 }, "<");
    }

    // 11. Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('on');
        } else {
            header.classList.remove('on');
        }
    });

    // 12. Nav links – smooth scroll via Lenis
    document.querySelectorAll('.hd__nav__wr a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: 0, duration: 1.8 });
            }
        });
    });

    // Logo click → scroll to top
    document.querySelector('.hd__logo__wr a')?.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.8 });
    });

    // 13. Footer entrance animations
    const footerCta = document.querySelector('.footer__cta');
    if (footerCta) {
        // Title lines slide up staggered
        gsap.fromTo('.footer__cta__title span',
            { y: 80, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: '.footer__wr', start: 'top 75%' }
            }
        );

        // Subtitle fades in
        gsap.fromTo('.footer__cta__sub',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out',
                scrollTrigger: { trigger: '.footer__wr', start: 'top 75%' }
            }
        );

        // Button slides up
        gsap.fromTo('.footer__btn',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out',
                scrollTrigger: { trigger: '.footer__wr', start: 'top 75%' }
            }
        );

        // Bottom links stagger in
        gsap.fromTo('.footer__links a',
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                scrollTrigger: { trigger: '.footer__bottom', start: 'top 90%' }
            }
        );

        // Email fades in
        gsap.fromTo('.footer__email',
            { opacity: 0 },
            {
                opacity: 1, duration: 1, ease: 'power2.out',
                scrollTrigger: { trigger: '.footer__bottom', start: 'top 90%' }
            }
        );
    }
});

// ========================================
// AI CHATBOT LOGIC
// ========================================

function toggleChat() {
    const chatWindow = document.getElementById('ai-chat-window');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            const input = document.getElementById('chat-input');
            if (input) input.focus();
        }
    }
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // Add User Message to UI
    appendMessage('USER', message, 'user-msg');
    input.value = '';

    // Show AI "Thinking" state
    const thinkingId = appendMessage('NEURAL_LINK', 'SCANNING_KNOWLEDGE_BASE...', 'system-msg');

    try {
        // 1. Attempt Real API Call to Vercel Backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: message }]
            })
        });

        removeMessage(thinkingId);

        if (response.ok) {
            // Create a message placeholder for the streaming response
            const botMsgId = appendMessage('NEURAL_LINK', '', 'bot-msg');
            const botMsgElement = document.getElementById(botMsgId).querySelector('.msg-content');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let fullText = '';

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;
                botMsgElement.textContent = fullText;

                // Scroll to bottom
                const chatMessages = document.getElementById('chat-messages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        } else {
            // Handle API error
            try {
                const errorData = await response.json();
                appendMessage('NEURAL_LINK', `ERROR: ${errorData.error || 'Failed to connect to brain.'}`, 'system-msg');
            } catch (e) {
                // Fallback if response is not JSON
                appendMessage('NEURAL_LINK', `ERROR: Failed to connect to brain status ${response.status}`, 'system-msg');
            }
        }
    } catch (error) {
        console.error('Chat Error:', error);
        removeMessage(thinkingId);
        appendMessage('SYSTEM', 'CONNECTIVITY_ISSUE: PLEASE_RETRY_AFTER_DEPLOYMENT.', 'system-msg');
    }
}

function appendMessage(origin, content, className, animate = false) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return null;

    const msgDiv = document.createElement('div');
    const id = 'msg-' + Date.now() + Math.random().toString(36).substr(2, 9);
    msgDiv.id = id;
    msgDiv.className = `message ${className}`;

    msgDiv.innerHTML = `
    <span class="msg-origin">[${origin}]</span>
    <span class="msg-content">${animate ? '' : content}</span>
  `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (animate) {
        typeWriter(msgDiv.querySelector('.msg-content'), content);
    }

    return id;
}

function removeMessage(id) {
    const msg = document.getElementById(id);
    if (msg) msg.remove();
}

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(() => typeWriter(element, text, i), 15);
    }
}

/* ============ CONTACT FORM & ACTIONS ============ */

// Initialize EmailJS with your Public Key
if (typeof emailjs !== 'undefined') {
    emailjs.init('V4rP1oW3WscgXjyq8');
}

// Handle Form Submission
const contactForm = document.getElementById('contact-form');
const formNotification = document.getElementById('form-notification');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = contactForm.querySelector('button');
        const btnText = btn.querySelector('.btn__text__scroll');
        const originalText = btnText.innerHTML;

        // Show loading state
        btnText.innerHTML = '<span>SENDING...</span>';
        btn.disabled = true;

        // Get form data
        const templateParams = {
            from_name: document.getElementById('user-name').value,
            from_email: document.getElementById('user-email').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('user-email').value
        };

        // Send email using EmailJS
        emailjs.send('service_ox0v9jm', 'template_1z1h5ao', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);

                // Send auto-reply to the user
                const autoReplyParams = {
                    to_name: templateParams.from_name,
                    to_email: templateParams.from_email,
                    from_name: 'Faizaan'
                };

                emailjs.send('service_ox0v9jm', 'template_llslbnz', autoReplyParams)
                    .then((autoReplyResponse) => {
                        console.log('Auto-reply sent!', autoReplyResponse.status);
                    })
                    .catch((autoReplyError) => {
                        console.error('Auto-reply failed:', autoReplyError);
                    });

                // Show success notification
                formNotification.textContent = "Message sent successfully! I'll get back to you soon.";
                formNotification.className = "form-notification success";
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                formNotification.textContent = "Failed to send message. Please try again.";
                formNotification.className = "form-notification error";
            })
            .finally(() => {
                btnText.innerHTML = originalText;
                btn.disabled = false;

                // Clear notification after 5 seconds
                setTimeout(() => {
                    formNotification.textContent = "";
                    formNotification.className = "form-notification";
                }, 5000);
            });
    });
}

/**
 * Scrolls to a specific section smoothly
 * @param {string} target - Selector of the element to scroll to
 */
function scrollToSection(target) {
    const element = document.querySelector(target);
    if (element) {
        // For Lenis (which is detected in index.html):
        if (window.lenis) {
            window.lenis.scrollTo(element);
        } else {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

/**
 * Celebration animation with shockwave, confetti, and toast
 * Inspired by bartbeyond.art
 */
function celebrateWithToast(message, options = {}) {
    const { confetti: withConfetti = false } = options;

    // 1. Create Shockwave
    const shockwave = document.createElement('div');
    Object.assign(shockwave.style, {
        position: 'fixed', top: '50%', left: '50%',
        width: '100px', height: '100px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: '0.8', zIndex: '9997', pointerEvents: 'none',
        transition: 'transform 0.6s ease-out, opacity 0.8s ease-out',
    });
    document.body.appendChild(shockwave);

    // Trigger shockwave expansion
    setTimeout(() => {
        shockwave.style.transform = 'translate(-50%, -50%) scale(20)';
        shockwave.style.opacity = '0';
    }, 10);

    // Clean up shockwave
    setTimeout(() => shockwave.remove(), 1000);

    // 2. Create Toast
    const toast = document.createElement('div');
    toast.textContent = message;
    Object.assign(toast.style, {
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) scale(0.9)',
        background: '#0a0a0a', color: '#fff',
        padding: '18px 32px', borderRadius: '10px',
        fontSize: '24px', fontFamily: 'inherit',
        letterSpacing: '1px', fontWeight: '500',
        zIndex: '9999', opacity: '0',
        transition: 'all 0.25s ease-in-out',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center', whiteSpace: 'nowrap',
    });
    document.body.appendChild(toast);

    // Animate toast in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);

    // Animate toast out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(1.05)';
    }, 2200);

    // Clean up toast
    setTimeout(() => toast.remove(), 2600);

    // 3. Confetti Canvas
    if (withConfetti) {
        const canvas = document.createElement('canvas');
        Object.assign(canvas.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100vw', height: '100vh',
            pointerEvents: 'none', zIndex: '9998',
        });
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const colors = ['#ffffff', '#aaaaaa', '#555555', '#cccccc', '#888888'];
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Create particles
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 8;
            particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: 3 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: 0.005 + Math.random() * 0.015,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                shape: Math.random() > 0.5 ? 'rect' : 'circle',
            });
        }

        let animFrame;
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            particles.forEach(p => {
                if (p.life <= 0) return;
                alive = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15; // gravity
                p.life -= p.decay;
                p.rotation += p.rotSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });

            if (alive) {
                animFrame = requestAnimationFrame(animateConfetti);
            } else {
                cancelAnimationFrame(animFrame);
                canvas.remove();
            }
        }

        animateConfetti();
    }
}

/**
 * Copies the email address to clipboard with celebration animation
 */
function copyEmail() {
    const email = "mohamedfaizaan5779@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        celebrateWithToast("Email's copied. Don't fuck it up.", { confetti: true });
    }).catch(err => {
        console.error('Could not copy email: ', err);
        // Fallback for non-HTTPS
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        celebrateWithToast("Email's copied. Don't fuck it up.", { confetti: true });
    });
}


/**
 * Checks for the Philosophy section and initializes ABCD grid rotation and marquee
 */
function initPhilosophySection() {
    const philSection = document.getElementById('philosophy');
    if (!philSection) return;

    // 1. ABCD Grid Letter Rotation
    const letters = philSection.querySelectorAll('.rotating__letters__wr li p');

    gsap.fromTo(letters,
        {
            rotate: -45,
            scale: 0.8,
            opacity: 0
        },
        {
            rotate: 0,
            scale: 1,
            opacity: 1,
            stagger: {
                each: 0.02,
                from: "random",
                grid: "auto"
            },
            ease: "power2.out",
            scrollTrigger: {
                trigger: philSection,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            }
        }
    );

    // 2. Explore More Work Marquee
    const marquee = philSection.querySelector('.explore-marquee');
    if (marquee) {
        // Clone for seamless loop
        const firstChild = marquee.children[0];
        if (marquee.children.length < 4) { // Avoid double cloning if re-initted
            for (let i = 0; i < 3; i++) {
                marquee.appendChild(firstChild.cloneNode(true));
            }
        }

        const philTween = gsap.to(marquee, {
            xPercent: -50,
            repeat: -1,
            duration: 10,
            ease: "linear",
            paused: true
        });

        ScrollTrigger.create({
            trigger: philSection,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => philTween.play(),
            onLeave: () => philTween.pause(),
            onEnterBack: () => philTween.play(),
            onLeaveBack: () => philTween.pause()
        });
    }

    // 3. Text content reveal
    const content = philSection.querySelector('.philosophy-content');
    if (content) {
        gsap.from(content.children, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: content,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Global initialization call (ensure it runs after DOM is ready)
document.addEventListener('DOMContentLoaded', () => {
    initPhilosophySection();
});

// Also call immediately if script is loaded late
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPhilosophySection();
}
