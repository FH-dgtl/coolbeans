
import './assets/css/index.css';
import { renderGalleryImages } from './assets/ts/renderGalleryImages';
import { setupNavigation } from './assets/ts/navigation';

setupNavigation();

const allScroller: NodeListOf<HTMLElement> | null = document.querySelectorAll("[data-scroller]");
allScroller.forEach(element => {
    if(!element.dataset.url) return
    renderGalleryImages(element, element.dataset.url, 500);
});

const backToTopButton: HTMLElement | null = document.querySelector("[data-back-to-top]");
backToTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL) 
});


const allOverlays = document.querySelectorAll<HTMLElement>("[data-overlay-button]");
allOverlays.forEach(element => {
    const targetId = element.dataset.overlayButton;
    if (!targetId) return;
    const target = document.getElementById(targetId) as HTMLDialogElement | null;
    if (!target) return;
    element.addEventListener("click", () => target.showModal());
    const closeBtn = target.querySelector<HTMLElement>("[data-overlay-close]");
    closeBtn?.addEventListener("click", () => target.close());
});