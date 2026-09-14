/* Smoothly scrolls to in-page anchor targets with custom easing. */

const DURATION_MS = 800;

function easeInOutCubic(progress: number): number {
	return progress < 0.5
		? 4 * progress * progress * progress
		: 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function getScrollMarginTop(element: Element): number {
	const value = window.getComputedStyle(element).scrollMarginTop;
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

export function scrollToElement(
	element: Element,
	duration = DURATION_MS,
): void {
	const startY = window.scrollY;
	const targetY =
		element.getBoundingClientRect().top +
		window.scrollY -
		getScrollMarginTop(element);
	const distance = targetY - startY;

	if (distance === 0) return;

	const startTime = performance.now();
	let frameId = 0;

	const step = (currentTime: number) => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		window.scrollTo(0, startY + distance * easeInOutCubic(progress));

		if (progress < 1) {
			frameId = window.requestAnimationFrame(step);
		}
	};

	window.requestAnimationFrame(step);
}

export function initSmoothScroll(root: ParentNode = document): void {
	root.querySelectorAll<HTMLAnchorElement>("[data-smooth-scroll]").forEach(
		(link) => {
			if (link.dataset.smoothScrollReady === "true") return;
			link.dataset.smoothScrollReady = "true";

			link.addEventListener("click", (event) => {
				const href = link.getAttribute("href");
				if (!href?.startsWith("#")) return;

				const target = document.querySelector(href);
				if (!target) return;

				event.preventDefault();
				scrollToElement(target);
			});
		},
	);
}
