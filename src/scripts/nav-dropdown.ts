/** Opens the services dropdown on desktop hover and on mobile tap. */

const MOBILE_QUERY = "(width < 48rem)";

let setDropdownOpen: ((open: boolean) => void) | null = null;

export function closeNavDropdown(): void {
	setDropdownOpen?.(false);
}

export function initNavDropdown(): void {
	const dropdown = document.querySelector<HTMLElement>("[data-nav-dropdown]");
	const toggle = document.querySelector<HTMLButtonElement>(
		"[data-nav-dropdown-toggle]",
	);
	const panel = document.querySelector<HTMLElement>("[data-nav-dropdown-panel]");
	if (!dropdown || !toggle || !panel || dropdown.dataset.ready === "true") {
		return;
	}

	dropdown.dataset.ready = "true";
	const media = window.matchMedia(MOBILE_QUERY);
	const isMobile = () => media.matches;

	const setOpen = (open: boolean) => {
		dropdown.dataset.open = String(open);
		toggle.setAttribute("aria-expanded", String(open));
		panel.inert = !open;
	};

	setDropdownOpen = setOpen;
	setOpen(false);

	toggle.addEventListener("click", (event) => {
		if (!isMobile()) return;
		event.preventDefault();
		setOpen(dropdown.dataset.open !== "true");
	});

	dropdown.addEventListener("pointerenter", () => {
		if (!isMobile()) setOpen(true);
	});

	dropdown.addEventListener("pointerleave", () => {
		if (!isMobile()) setOpen(false);
	});

	dropdown.addEventListener("focusin", () => {
		if (!isMobile()) setOpen(true);
	});

	dropdown.addEventListener("focusout", (event) => {
		if (isMobile()) return;
		const next = event.relatedTarget;
		if (next instanceof Node && dropdown.contains(next)) return;
		setOpen(false);
	});

	media.addEventListener("change", () => {
		setOpen(false);
	});
}
