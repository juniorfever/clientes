// Formulário de contato não tem backend (site estático): monta a mensagem com os dados
// preenchidos e abre o WhatsApp da Barbara já com o texto pronto pra enviar.
const NUMERO_BARBARA = '5551999212321';
const formContato = document.getElementById('form-contato');

if (formContato) {
    const botao = formContato.querySelector('.ficha__enviar');
    const textoBotao = formContato.querySelector('.ficha__texto-botao');
    const aviso = formContato.querySelector('.ficha__aviso');

    formContato.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nome = formContato.nome.value.trim();
        const telefone = formContato.telefone.value.trim();
        const mensagem = formContato.mensagem.value.trim();

        if (!nome || !telefone) {
            aviso.textContent = 'Preenche nome e telefone pra continuar.';
            (!nome ? formContato.nome : formContato.telefone).focus();
            return;
        }

        aviso.textContent = '';
        botao.disabled = true;
        textoBotao.textContent = 'Abrindo o WhatsApp…';

        const partes = [
            'Olá, Barbara! Vim pelo site e gostaria de agendar uma consulta.',
            `Nome: ${nome}`,
            `Telefone: ${telefone}`
        ];
        if (mensagem) partes.push(`Mensagem: ${mensagem}`);

        const link = `https://wa.me/${NUMERO_BARBARA}?text=${encodeURIComponent(partes.join('\n'))}`;

        window.setTimeout(() => {
            window.open(link, '_blank', 'noopener');
            botao.disabled = false;
            textoBotao.textContent = 'Enviar pelo WhatsApp';
        }, 450);
    });
}

// Revela os blocos marcados com .revelar conforme entram na tela — único momento de
// animação orquestrado da página, o resto é estático de propósito.
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
