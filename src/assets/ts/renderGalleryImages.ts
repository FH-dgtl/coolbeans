export async function renderGalleryImages(
    container: HTMLElement | null,
    url: string,
    width: number = 300,
    styleClass: string = "scroller__img"
): Promise<void> {
    if (!container) return;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!Array.isArray(data.resources)) return;

        const imagesHtml = data.resources.map((img: { public_id: string, format: string }) => {
            const imgUrl = `https://res.cloudinary.com/coolbeans-moodfood/image/upload/f_auto,q_auto,c_scale,w_${width}/${img.public_id}.${img.format}`;
            return `<figure class="scroller__item"><img src="${imgUrl}" alt="${img.public_id}" loading="lazy" class="${styleClass}" /></figure>`;
        }).join("");

        container.innerHTML = `<div class="scroller__inner">${imagesHtml}${imagesHtml}</div>`;
    } catch (error) {
        container.innerHTML = "<p>Bilder konnten nicht geladen werden.</p>";
    }
}