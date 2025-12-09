import './assets/css/index.css'
import { renderGalleryImages } from './assets/ts/renderGalleryImages'

const navigationToggle: HTMLElement | null = document.querySelector("[data-navigation-toggle]");
const navigation: HTMLElement | null = document.querySelector("[data-navigation]");
const navigationItems: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("[data-navigation] a");

navigationItems.forEach((element: HTMLAnchorElement) => element.addEventListener("click", toggleNavigation));
navigationToggle?.addEventListener("click", toggleNavigation);

function openNavigation(): void {
    if (!navigation) return;
    navigation.classList.remove("navigation--hidden");
    navigation.setAttribute("aria-expanded", "true");
    navigation.setAttribute("aria-hidden", "false");
    navigationItems.forEach((element: HTMLAnchorElement) => element.removeAttribute("tabindex"));
    document.addEventListener("mousedown", handleOutsideClick);
}

function closeNavigation(): void {
    if (!navigation) return;
    navigation.classList.add("navigation--hidden");
    navigation.setAttribute("aria-expanded", "false");
    navigation.setAttribute("aria-hidden", "true");
    navigationItems.forEach((element: HTMLAnchorElement) => element.setAttribute("tabindex", "-1"));
    document.removeEventListener("mousedown", handleOutsideClick);
}

function toggleNavigation(): void {
    if (!navigation) return;
    if (navigation.classList.contains("navigation--hidden")) {
        openNavigation();
    } else {
        closeNavigation();
    }
}

function handleOutsideClick(event: MouseEvent): void {
    if (!navigation) return;
    if (
        !navigation.contains(event.target as Node) &&
        !navigationToggle?.contains(event.target as Node)
    ) {
        closeNavigation();
    }
}

const backToTopButton: HTMLElement | null = document.querySelector("[data-back-to-top]");
backToTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const allScroller: NodeListOf<HTMLElement> | null = document.querySelectorAll("[data-scroller]");
allScroller.forEach(element => {
    if(!element.dataset.url) return
    renderGalleryImages(element, element.dataset.url, 500);
});