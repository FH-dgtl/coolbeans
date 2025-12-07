import './assets/css/index.css'

const navigationToggle: HTMLElement | null = document.querySelector("[data-navigation-toggle]");
const navigation: HTMLElement | null = document.querySelector("[data-navigation]");
const navigationItems: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("[data-navigation] a");

navigationItems.forEach((element: HTMLAnchorElement) => element.addEventListener("click", toggleNavigation));
navigationToggle?.addEventListener("click", toggleNavigation);

function toggleNavigation (): void {
    if (!navigation) return;
    navigation.classList.toggle("navigation--hidden");
    if(!navigation.classList.contains("navigation--hidden")) {
     navigation.setAttribute("aria-expanded", "true")
    } else {
     navigation.setAttribute("aria-expanded", "false")
    }
}