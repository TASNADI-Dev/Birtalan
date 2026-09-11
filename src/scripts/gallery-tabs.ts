/* Switches gallery category tabs and their empty panels. */
export function initGalleryTabs(): void {
	const root = document.querySelector<HTMLElement>('[data-gallery-tabs]');
	if (!root || root.dataset.ready === 'true') return;

	const tablist = root.querySelector<HTMLElement>('[data-gallery-tablist]');
	const tabs = [
		...root.querySelectorAll<HTMLButtonElement>('[data-gallery-tab]'),
	];
	const panels = [
		...root.querySelectorAll<HTMLElement>('[data-gallery-panel]'),
	];

	if (!tablist || tabs.length === 0) return;

	root.dataset.ready = 'true';

	const activateTab = (index: number) => {
		tabs.forEach((tab, tabIndex) => {
			const selected = tabIndex === index;
			tab.setAttribute('aria-selected', String(selected));
			tab.tabIndex = selected ? 0 : -1;
			panels[tabIndex]?.toggleAttribute('hidden', !selected);
		});
	};

	const focusTab = (index: number) => {
		const nextIndex = (index + tabs.length) % tabs.length;
		tabs[nextIndex]?.focus();
		activateTab(nextIndex);
	};

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => activateTab(index));

		tab.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowRight':
					event.preventDefault();
					focusTab(index + 1);
					break;
				case 'ArrowLeft':
					event.preventDefault();
					focusTab(index - 1);
					break;
				case 'Home':
					event.preventDefault();
					focusTab(0);
					break;
				case 'End':
					event.preventDefault();
					focusTab(tabs.length - 1);
					break;
			}
		});
	});
}
