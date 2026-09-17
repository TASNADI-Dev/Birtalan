/* Loads GLightbox from CDN and opens gallery images in non-looping groups. */

const GLIGHTBOX_VERSION = '3.3.1';
const GLIGHTBOX_CSS = `https://cdn.jsdelivr.net/npm/glightbox@${GLIGHTBOX_VERSION}/dist/css/glightbox.min.css`;
const GLIGHTBOX_JS = `https://cdn.jsdelivr.net/npm/glightbox@${GLIGHTBOX_VERSION}/dist/js/glightbox.min.js`;

type GLightboxInstance = {
	destroy: () => void;
};

type GLightboxFactory = (options?: Record<string, unknown>) => GLightboxInstance;

declare global {
	interface Window {
		GLightbox?: GLightboxFactory;
	}
}

let loading: Promise<GLightboxFactory> | null = null;
let instance: GLightboxInstance | null = null;
let expandReady = false;

function ensureStylesheet(): void {
	if (document.querySelector('link[data-glightbox-css]')) return;

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = GLIGHTBOX_CSS;
	link.dataset.glightboxCss = '';
	document.head.appendChild(link);
}

function loadGLightbox(): Promise<GLightboxFactory> {
	if (typeof window.GLightbox === 'function') {
		return Promise.resolve(window.GLightbox);
	}

	if (loading) return loading;

	loading = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = GLIGHTBOX_JS;
		script.async = true;
		script.onload = () => {
			if (typeof window.GLightbox === 'function') {
				resolve(window.GLightbox);
				return;
			}
			reject(new Error('GLightbox failed to load'));
		};
		script.onerror = () => reject(new Error('GLightbox failed to load'));
		document.head.appendChild(script);
	});

	return loading;
}

function clearExpandVisible(except?: HTMLElement): void {
	document
		.querySelectorAll<HTMLElement>('[data-gallery-item][data-expand-visible]')
		.forEach((item) => {
			if (item !== except) item.removeAttribute('data-expand-visible');
		});
}

function supportsHover(): boolean {
	return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** On touch devices, first tap reveals the expand icon; icon opens the lightbox. */
function initGalleryExpandTriggers(): void {
	if (expandReady) return;
	expandReady = true;

	document.addEventListener(
		'click',
		(event) => {
			if (supportsHover()) return;

			const target = event.target;
			if (!(target instanceof Element)) return;

			const item = target.closest<HTMLElement>('[data-gallery-item]');
			if (!item) {
				clearExpandVisible();
				return;
			}

			if (target.closest('[data-gallery-lightbox]')) {
				clearExpandVisible();
				return;
			}

			const alreadyVisible = item.hasAttribute('data-expand-visible');
			clearExpandVisible();
			if (!alreadyVisible) item.setAttribute('data-expand-visible', '');
		},
		true,
	);
}

export async function initGalleryLightbox(): Promise<void> {
	if (!document.querySelector('[data-gallery-lightbox]')) return;

	initGalleryExpandTriggers();
	ensureStylesheet();

	const GLightbox = await loadGLightbox();

	instance?.destroy();
	instance = GLightbox({
		selector: '[data-gallery-lightbox]',
		touchNavigation: true,
		loop: false,
		zoomable: false,
		draggable: false,
		openEffect: 'fade',
		closeEffect: 'fade',
		slideEffect: 'slide',
		skin: 'clean',
	});
}
