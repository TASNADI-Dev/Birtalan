/* Shows a nav bottom border after the page has scrolled 100px. */

const SCROLL_THRESHOLD = 100;

export function initNavScroll(): void {
	const nav = document.querySelector<HTMLElement>("[data-nav]");
	if (!nav || nav.dataset.scrollReady === "true") return;

	nav.dataset.scrollReady = "true";

	const scrollY = () => {
		if (document.body.style.position === "fixed") {
			return Math.abs(parseFloat(document.body.style.top) || 0);
		}

		return window.scrollY;
	};

	const update = () => {
		nav.dataset.scrolled = String(scrollY() >= SCROLL_THRESHOLD);
	};

	update();
	window.addEventListener("scroll", update, { passive: true });
}
