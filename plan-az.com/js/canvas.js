gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const loadingEl = document.getElementById('loading');

let images = [];
let loadedCount = 0;
let isLoaded = false;
let vw = 0;
let vh = 0;
const animationState = { index: 0 };

// -------------------- 묶음 단위 설정 상수 --------------------
// [수정] 이미지를 4개만 사용하도록 그룹당 이미지 수를 1로 설정
const imagesPerGroup = 1;
const totalGroups = 4; // 4개 그룹 고정 유지

const framesPerCardTransition = 3;
const maxAnimationIndex = (totalGroups - 1) * framesPerCardTransition; // (4-1) * 3 = 9

const radius = 40;
const maxRotate = 0.16;
const parallaxScaleFactor = 1;

// 깊이 스케일 및 초기 수직 오프셋을 0으로 설정
const DEPTH_SCALE_FACTOR = 0;
const INITIAL_OFFSET_Y = 0;

// -------------------- 이미지 URL 목록 (사용자 요청: 총 4개) --------------------
// 외부 서버 오류를 방지하기 위해 작동하는 플레이스홀더를 사용합니다.
const imageUrls = [
	// Group 1 (Card 1) - Red
	'/images_renew/main_project_preview0001.jpg',
	'/images_renew/main_project_preview02.jpg',
	'/images_renew/main_project_preview03.jpg',
	'/images_renew/main_project_preview04.jpg'
];

const groups = [];
for (let i = 0; i < imageUrls.length; i += imagesPerGroup) {
	groups.push(imageUrls.slice(i, i + imagesPerGroup));
}

// -------------------- 초기화 --------------------
function init() {
	onResize();
	window.addEventListener('resize', onResize);

	imageUrls.forEach((url, i) => {
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = url;
		img.onload = () => { loadedCount++; checkLoadComplete(); };
		img.onerror = () => {
			console.error("Image loading failed:", url);
			// 이미지가 로드되지 않아도 애니메이션을 진행하기 위해 카운트를 올림
			loadedCount++;
			checkLoadComplete();
		};
		images[i] = img;
	});
}

function checkLoadComplete() {
	if (loadedCount === imageUrls.length && !isLoaded) {
		isLoaded = true;
		loadingEl.style.opacity = '0';
		setTimeout(() => { loadingEl.style.display = 'none'; }, 500);
		setupScrollAnimation();
	}
}

// -------------------- ScrollTrigger 세팅 --------------------
function setupScrollAnimation() {
	render();

	gsap.to(animationState, {
		index: maxAnimationIndex,
		ease: "none",
		scrollTrigger: {
			trigger: ".canvas__wr",
			start: "top top",
			end: "+=400%",
			pin: true,
			scrub: 0,
			invalidateOnRefresh: true,
			id: "canvas-pin",
			refreshPriority: 1,
			onEnter: () => {
				const introCard = document.querySelector(".intro__card__img");
				if (introCard) introCard.classList.add("on");
			},
			onLeaveBack: () => {
				const introCard = document.querySelector(".intro__card__img");
				if (introCard) introCard.classList.remove("on");
			},
			onUpdate: () => {
				render();
			}
		}
	});

	ScrollTrigger.refresh();
}
// -------------------- 윈도우 리사이즈 --------------------
function onResize() {
	vw = window.innerWidth;
	vh = window.innerHeight;
	const dpr = window.devicePixelRatio || 1;
	canvas.width = vw * dpr;
	canvas.height = vh * dpr;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(dpr, dpr);

	if (isLoaded) {
		render();
		// 뷰포트 크기 변경 시 GSAP ScrollTrigger에게 레이아웃 재계산을 요청합니다.
		ScrollTrigger.refresh();
	}
}

// -------------------- 유틸 --------------------
function lerp(start, end, t) { return start * (1 - t) + end * t; }

function drawImageCover(ctx, img, x, y, w, h) {
	if (!img.complete || img.naturalWidth === 0) {
		// 이미지가 로드되지 않은 경우 대체 사각형을 그립니다.
		ctx.fillStyle = '#374151'; // Gray-700
		ctx.fillRect(x, y, w, h);
		ctx.fillStyle = '#f3f4f6'; // Gray-100
		ctx.font = '20px Inter, sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		// 이미지 경로가 길 수 있으므로 간결하게 표시
		const urlText = img.src.substring(img.src.lastIndexOf('/') + 1);
		ctx.fillText(`Image Error: ${urlText}`, x + w / 2, y + h / 2);
		return;
	}
	const imgRatio = img.naturalWidth / img.naturalHeight;
	const screenRatio = w / h;
	let drawW, drawH, drawX, drawY;

	if (imgRatio > screenRatio) {
		drawH = h;
		drawW = h * imgRatio;
		drawX = x + (w - drawW) / 2;
		drawY = y;
	} else {
		drawW = w;
		drawH = w / imgRatio;
		drawX = x;
		drawY = y + (h - drawH) / 2;
	}
	ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

function drawExpandedRoundedRect(ctx, x, y, w, h, r, padding = 10) {
	const radiusValue = Math.max(0, r);
	const x_exp = x - padding;
	const y_exp = y - padding;
	const w_exp = w + padding * 2;
	const h_exp = h + padding * 2;

	ctx.beginPath();
	ctx.moveTo(x_exp + radiusValue, y_exp);
	ctx.lineTo(x_exp + w_exp - radiusValue, y_exp);
	ctx.quadraticCurveTo(x_exp + w_exp, y_exp, x_exp + w_exp, y_exp + radiusValue);
	ctx.lineTo(x_exp + w_exp, y_exp + h_exp - radiusValue);
	ctx.quadraticCurveTo(x_exp + w_exp, y_exp + h_exp, x_exp + w_exp - radiusValue, y_exp + h_exp);
	ctx.lineTo(x_exp + radiusValue, y_exp + h_exp);
	ctx.quadraticCurveTo(x_exp, y_exp + h_exp, x_exp, y_exp + h_exp - radiusValue);
	ctx.lineTo(x_exp, y_exp + radiusValue);
	ctx.quadraticCurveTo(x_exp, y_exp, x_exp + radiusValue, y_exp);
	ctx.closePath();
}

const getGroupTiltDirection = (index) => (index % 2 === 0) ? 1 : -1;

// -------------------- 렌더링 --------------------
function render() {
	ctx.clearRect(0, 0, vw, vh);

	const currentFrame = animationState.index;
	const groupFloatIndex = currentFrame / framesPerCardTransition;

	const currentIndex = Math.floor(groupFloatIndex);
	const nextIndex = Math.min(currentIndex + 1, totalGroups - 1);
	const localProgress = groupFloatIndex - currentIndex;

	// --- 마지막 그룹에 도달했을 때 (G4) - 고정 상태 ---
	if (currentIndex === totalGroups - 1) {
		// [수정] imagesPerGroup이 1이므로 루프는 한 번만 실행됨
		for (let i = groups[currentIndex].length - 1; i >= 0; i--) {
			const globalIndex = currentIndex * imagesPerGroup + i;
			const imgObj = images[globalIndex];

			const depthScale = 1.0;
			const scale = depthScale * parallaxScaleFactor;
			const currentRadius = radius;
			const y = 0;

			const w = vw * scale;
			const h = vh * scale;
			const xPos = (vw - w) / 2;
			const yPos = y + (vh - h) / 2;

			ctx.save();
			ctx.translate(vw / 2, vh / 2);

			const centeredX = xPos - vw / 2;
			const centeredY = yPos - vh / 2;

			drawExpandedRoundedRect(ctx, centeredX, centeredY, w, h, currentRadius);
			ctx.clip();
			drawImageCover(ctx, imgObj, -vw / 2, -vh / 2, vw, vh);
			ctx.restore();
		}
		return;
	}

	// --- 현재 묶음 (위로 사라짐) ---
	// [수정] imagesPerGroup이 1이므로 루프는 한 번만 실행됨
	for (let i = groups[currentIndex].length - 1; i >= 0; i--) {
		const globalIndex = currentIndex * imagesPerGroup + i;
		const imgObj = images[globalIndex];

		const depthScale = 1.0;
		const initialOffset = 0;

		// 스케일 변화: 1.0 * parallaxScaleFactor 에서 0.5로 축소
		const scaleStart = depthScale * parallaxScaleFactor;
		const scaleEnd = 0.5;
		let scale = lerp(scaleStart, scaleEnd, localProgress);

		let extraRotation = 0;
		let wobbleDirection = getGroupTiltDirection(currentIndex);

		// G1 특수 효과 제거 유지
		if (currentIndex === 0) {
			const sinProgress = Math.sin(localProgress * Math.PI);
			extraRotation = lerp(0, (maxRotate / 8) * wobbleDirection, sinProgress);
		}

		// Y 위치 계산: 초기 오프셋 제거
		const startY = 0 + initialOffset;
		const endY = -vh * 1.1;
		const y = lerp(startY, endY, localProgress);

		const w = vw * scale;
		const h = vh * scale;
		const xPos = (vw - w) / 2;
		const yPos = y + (vh - h) / 2;

		ctx.save();
		ctx.translate(vw / 2, vh / 2);

		// 회전 적용
		const finalRotate = lerp(0, -maxRotate, localProgress);
		ctx.rotate(finalRotate + extraRotation);

		const centeredX = xPos - vw / 2;
		const centeredY = yPos - vh / 2;

		drawExpandedRoundedRect(ctx, centeredX, centeredY, w, h, radius);
		ctx.clip();

		// 내부 패럴랙스 효과 제거
		drawImageCover(ctx, imgObj, -vw / 2, -vh / 2, vw, vh);
		ctx.restore();
	}

	// --- 다음 묶음 (아래에서 나타남) ---
	if (currentIndex < totalGroups - 1) {

		let startRotation = maxRotate;

		// [수정] imagesPerGroup이 1이므로 루프는 한 번만 실행됨
		for (let i = groups[nextIndex].length - 1; i >= 0; i--) {
			const globalIndex = nextIndex * imagesPerGroup + i;
			const imgObj = images[globalIndex];

			const depthScale = 1.0;
			const initialOffset = 0;

			// 스케일 변화: 0.5에서 1.0 * parallaxScaleFactor 로 확대
			const scaleStart = 0.5;
			const scaleEnd = depthScale * parallaxScaleFactor;

			let scale = lerp(scaleStart, scaleEnd, localProgress);

			// Y 위치 계산: 초기 오프셋 제거
			const startY = vh * 1.1 + initialOffset;
			const endY = 0;
			const y = lerp(startY, endY, localProgress);

			const w = vw * scale;
			const h = vh * scale;
			const xPos = (vw - w) / 2;
			const yPos = y + (vh - h) / 2;

			ctx.save();
			ctx.translate(vw / 2, vh / 2);

			// 회전 적용
			ctx.rotate(lerp(startRotation, 0, localProgress));

			const centeredX = xPos - vw / 2;
			const centeredY = yPos - vh / 2;

			drawExpandedRoundedRect(ctx, centeredX, centeredY, w, h, radius);
			ctx.clip();
			drawImageCover(ctx, imgObj, -vw / 2, -vh / 2, vw, vh);
			ctx.restore();
		}
	}
}

// -------------------- 실행 --------------------
window.onload = init;