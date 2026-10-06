const alvos = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window && alvos.length) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: .15 });

    alvos.forEach((el) => observador.observe(el));
} else {
    alvos.forEach((el) => el.classList.add('visivel'));
}
