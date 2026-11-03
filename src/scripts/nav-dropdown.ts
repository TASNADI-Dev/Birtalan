/* Opens the services dropdown on hover-capable pointers; tap-to-toggle elsewhere. */

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

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
	const hoverMedia = window.matchMedia(HOVER_QUERY);
	const canHover = () => hoverMedia.matches;

	const setOpen = (open: boolean) => {
		dropdown.dataset.open = String(open);
		toggle.setAttribute("aria-expanded", String(open));
		panel.inert = !open;
	};

	setDropdownOpen = setOpen;
	setOpen(false);

	toggle.addEventListener("click", () => {
		if (canHover()) return;
		setOpen(dropdown.dataset.open !== "true");
	});

	dropdown.addEventListener("pointerenter", () => {
		if (canHover()) setOpen(true);
	});

	dropdown.addEventListener("pointerleave", () => {
		if (canHover()) setOpen(false);
	});

	dropdown.addEventListener("focusin", () => {
		if (canHover()) setOpen(true);
	});

	dropdown.addEventListener("focusout", (event) => {
		if (!canHover()) return;
		const next = event.relatedTarget;
		if (next instanceof Node && dropdown.contains(next)) return;
		setOpen(false);
	});

	document.addEventListener("pointerdown", (event) => {
		if (canHover()) return;
		if (dropdown.dataset.open !== "true") return;
		if (event.target instanceof Node && dropdown.contains(event.target)) return;
		setOpen(false);
	});

	hoverMedia.addEventListener("change", () => {
		setOpen(false);
	});
}
