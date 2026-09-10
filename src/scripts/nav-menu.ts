/** Toggles the mobile nav menu and keeps hamburger ARIA state in sync. */

import { closeNavDropdown } from "./nav-dropdown";

const MOBILE_QUERY = "(width < 48rem)";

export function initNavMenu(): void {
	const nav = document.querySelector<HTMLElement>("[data-nav]");
	if (!nav || nav.dataset.navReady === "true") return;

	const toggle = nav.querySelector<HTMLButtonElement>("[data-nav-toggle]");
	const menu = nav.querySelector<HTMLElement>("[data-nav-menu]");
	if (!toggle || !menu) return;

	nav.dataset.navReady = "true";
	const media = window.matchMedia(MOBILE_QUERY);

	const isMobile = () => media.matches;

	const setOpen = (open: boolean) => {
		nav.dataset.open = String(open);
		toggle.setAttribute("aria-expanded", String(open));
		toggle.setAttribute(
			"aria-label",
			open ? "Menü bezárása" : "Menü megnyitása",
		);

		if (isMobile()) {
			menu.toggleAttribute("inert", !open);
		} else {
			menu.removeAttribute("inert");
		}

		if (!open) closeNavDropdown();
	};

	setOpen(false);

	toggle.addEventListener("click", () => {
		setOpen(nav.dataset.open !== "true");
	});

	nav.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Element) || !target.closest("a")) return;
		setOpen(false);
	});

	document.addEventListener("pointerdown", (event) => {
		if (nav.dataset.open !== "true") return;
		if (event.target instanceof Node && nav.contains(event.target)) return;
		setOpen(false);
	});

	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape") return;

		const dropdown = nav.querySelector<HTMLElement>("[data-nav-dropdown]");
		if (dropdown?.dataset.open === "true") {
			closeNavDropdown();
			nav.querySelector<HTMLButtonElement>("[data-nav-dropdown-toggle]")?.focus();
			return;
		}

		if (nav.dataset.open !== "true") return;
		setOpen(false);
		toggle.focus();
	});

	media.addEventListener("change", () => {
		setOpen(false);
	});
}
