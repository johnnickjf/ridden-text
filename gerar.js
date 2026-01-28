// Funções de criptografia (devem ser idênticas ao script.js)
function criptografarSenha(senha) {
    return [...senha]
        .map(char => String.fromCharCode(char.charCodeAt(0) + 6))
        .join('');
}

function calcularDeslocamento(senha) {
    return [...senha].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10 + 1;
}

function criptografarTexto(texto, senha) {
    const deslocamento = calcularDeslocamento(senha);
    return [...texto]
        .map(char => String.fromCharCode(char.charCodeAt(0) + deslocamento))
        .join('');
}

// Elementos DOM
const form = document.getElementById('gerador-form');
const resultadoContainer = document.getElementById('resultado-container');
const resultado = document.getElementById('resultado');
const copyBtn = document.getElementById('copy-btn');
const successToast = document.getElementById('success-toast');
const toastText = document.getElementById('toast-text');

// Estado
let isGenerating = false;

// Submit do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isGenerating) return;
    
    const titulo = document.getElementById('titulo').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const texto = document.getElementById('texto').value.trim();
    
    // Validação
    if (!titulo || !nome || !senha || !texto) {
        mostrarToast('Preencha todos os campos!', false);
        return;
    }
    
    // Mostrar loading
    setGenerating(true);
    
    // Pequeno delay para feedback visual
    await delay(500);
    
    // Criptografar dados
    const senhaCriptografada = criptografarSenha(senha);
    const textoCriptografado = criptografarTexto(texto, senha);
    const nomeCriptografado = criptografarTexto(nome, senha);
    const tituloCriptografado = criptografarTexto(titulo, senha);
    
    // Criar objeto JSON
    const entradaJSON = {
        titulo: tituloCriptografado,
        nome: nomeCriptografado,
        texto: textoCriptografado,
        senha: senhaCriptografada
    };
    
    // Exibir resultado
    resultado.textContent = JSON.stringify(entradaJSON, null, 2);
    resultadoContainer.style.display = 'block';
    
    // Scroll suave até o resultado
    setTimeout(() => {
        resultadoContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
    
    setGenerating(false);
    
    // Animação de aparecimento
    resultadoContainer.style.animation = 'fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
});

// Copiar JSON
copyBtn.addEventListener('click', async () => {
    try {
        const texto = resultado.textContent;
        await navigator.clipboard.writeText(texto);
        
        // Feedback visual
        copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
            </svg>
            Copiado!
        `;
        
        mostrarToast('JSON copiado com sucesso!', true);
        
        // Resetar botão após 2s
        setTimeout(() => {
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
                </svg>
                Copiar
            `;
        }, 2000);
        
    } catch (err) {
        console.error('Erro ao copiar:', err);
        mostrarToast('Erro ao copiar. Tente novamente.', false);
    }
});

// Mostrar toast
function mostrarToast(mensagem, sucesso = true) {
    toastText.textContent = mensagem;
    successToast.style.background = sucesso ? 'var(--success)' : 'var(--error)';
    successToast.classList.add('show');
    
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 3000);
}

// Controlar estado de geração
function setGenerating(generating) {
    isGenerating = generating;
    const btnSubmit = form.querySelector('.btn-submit');
    
    if (generating) {
        btnSubmit.classList.add('loading');
        form.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
    } else {
        btnSubmit.classList.remove('loading');
        form.querySelectorAll('input, textarea').forEach(el => el.disabled = false);
    }
}

// Função auxiliar de delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Criar partículas animadas no fundo
function criarParticulas() {
    const particles = document.getElementById('particles');
    const numParticulas = 20;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.width = `${Math.random() * 4 + 1}px`;
        particula.style.height = particula.style.width;
        particula.style.background = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`;
        particula.style.borderRadius = '50%';
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        particula.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particula.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particula);
    }
}

// Adicionar animação de fade in para os elementos do formulário
document.addEventListener('DOMContentLoaded', () => {
    criarParticulas();
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
});

// Validação em tempo real
document.getElementById('titulo').addEventListener('input', validarCampo);
document.getElementById('nome').addEventListener('input', validarCampo);
document.getElementById('senha').addEventListener('input', validarCampo);
document.getElementById('texto').addEventListener('input', validarCampo);

function validarCampo(e) {
    const campo = e.target;
    if (campo.value.trim()) {
        campo.style.borderColor = 'var(--success)';
    } else {
        campo.style.borderColor = 'var(--border)';
    }
}
