function click(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function doc() {
    document.querySelectorAll('.content-menu a').forEach(anchor => {
        anchor.addEventListener('click', click);
    });
}

document.addEventListener('DOMContentLoaded', doc);