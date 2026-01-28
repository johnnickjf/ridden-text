// Elementos DOM
const senhaForm = document.getElementById('senha-form');
const senhaInput = document.getElementById('senha');
const btnSubmit = document.getElementById('btn-submit');
const togglePassword = document.getElementById('toggle-password');
const mensagemContainer = document.getElementById('mensagem-container');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

// Estado da aplicação
let isLoading = false;

// Toggle visibilidade da senha
togglePassword.addEventListener('click', () => {
    const type = senhaInput.getAttribute('type');
    senhaInput.setAttribute('type', type === 'password' ? 'text' : 'password');
    
    // Animação de rotação suave no ícone
    const icon = togglePassword.querySelector('.eye-icon');
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        icon.style.transform = 'rotate(0deg)';
    }, 300);
});

// Submit do formulário
senhaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await buscarMensagem();
});

// Buscar mensagem
async function buscarMensagem() {
    const senha = senhaInput.value.trim();
    
    // Validação
    if (!senha) {
        mostrarErro('Por favor, digite uma senha.');
        senhaInput.focus();
        return;
    }
    
    if (isLoading) return;
    
    // Resetar estado
    esconderMensagem();
    esconderErro();
    
    // Mostrar loading
    setLoading(true);
    
    try {
        // Buscar mensagens do JSON
        const response = await fetch('mensagens.json');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar mensagens');
        }
        
        const mensagens = await response.json();
        
        // Criptografar senha para comparação
        const senhaCriptografada = criptografarSenha(senha);
        
        // Buscar mensagem correspondente
        const entrada = mensagens.find(msg => msg.senha === senhaCriptografada);
        
        if (!entrada) {
            // Senha incorreta
            await delay(500); // Simular processamento
            mostrarErro('Senha incorreta. Tente novamente.');
            senhaInput.select();
            setLoading(false);
            return;
        }
        
        // Descriptografar mensagem
        const tituloDescriptografado = descriptografar(entrada.titulo, senha);
        const nomeDescriptografado = descriptografar(entrada.nome, senha);
        const textoDescriptografado = descriptografar(entrada.texto, senha);
        
        // Pequeno delay para melhor UX
        await delay(500);
        
        // Exibir mensagem
        exibirMensagem(tituloDescriptografado, nomeDescriptografado, textoDescriptografado);
        
        setLoading(false);
        
    } catch (erro) {
        console.error('Erro ao buscar mensagem:', erro);
        await delay(300);
        mostrarErro('Erro ao carregar mensagens. Tente novamente.');
        setLoading(false);
    }
}

// Funções de criptografia
function criptografarSenha(senha) {
    return [...senha]
        .map(char => String.fromCharCode(char.charCodeAt(0) + 6))
        .join('');
}

function descriptografar(texto, senha) {
    const deslocamento = calcularDeslocamento(senha);
    return [...texto]
        .map(char => String.fromCharCode(char.charCodeAt(0) - deslocamento))
        .join('');
}

function calcularDeslocamento(senha) {
    return [...senha].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10 + 1;
}

// Exibir mensagem com animação de digitação
function exibirMensagem(titulo, nome, texto) {
    const tituloEl = document.getElementById('mensagem-titulo');
    const paraEl = document.getElementById('mensagem-para');
    const textoEl = document.getElementById('mensagem-texto');
    
    // Limpar conteúdo anterior
    tituloEl.textContent = '';
    paraEl.textContent = '';
    textoEl.textContent = '';
    
    // Mostrar container
    mensagemContainer.classList.remove('hidden');
    
    // Scroll suave até a mensagem
    setTimeout(() => {
        mensagemContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
    
    // Animar título
    animarTexto(titulo, tituloEl, 30, () => {
        // Animar "Para:"
        animarTexto(`Para: ${nome}`, paraEl, 20, () => {
            // Animar texto principal
            textoEl.classList.add('typing');
            animarTexto(texto, textoEl, 15, () => {
                textoEl.classList.remove('typing');
            });
        });
    });
}

// Função de animação de texto (digitação)
function animarTexto(texto, elemento, velocidade, callback) {
    let i = 0;
    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto[i];
            i++;
        } else {
            clearInterval(intervalo);
            if (callback) callback();
        }
    }, velocidade);
}

// Esconder mensagem
function esconderMensagem() {
    mensagemContainer.classList.add('hidden');
}

// Mostrar erro
function mostrarErro(mensagem) {
    errorText.textContent = mensagem;
    errorMessage.classList.remove('hidden');
    
    // Auto-esconder após 5 segundos
    setTimeout(() => {
        esconderErro();
    }, 5000);
}

// Esconder erro
function esconderErro() {
    errorMessage.classList.add('hidden');
}

// Controlar loading
function setLoading(loading) {
    isLoading = loading;
    
    if (loading) {
        btnSubmit.classList.add('loading');
        senhaInput.disabled = true;
    } else {
        btnSubmit.classList.remove('loading');
        senhaInput.disabled = false;
    }
}

// Função auxiliar de delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Limpar erro ao digitar
senhaInput.addEventListener('input', () => {
    if (!errorMessage.classList.contains('hidden')) {
        esconderErro();
    }
});

// Criar partículas animadas no fundo
function criarParticulas() {
    const particles = document.getElementById('particles');
    const numParticulas = 20;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.width = `${Math.random() * 4 + 1}px`;
        particula.style.height = particula.style.width;
        particula.style.background = `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`;
        particula.style.borderRadius = '50%';
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        particula.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particula.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particula);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    criarParticulas();
    senhaInput.focus();
});

// Prevenir multiple submits
senhaForm.addEventListener('submit', (e) => {
    if (isLoading) {
        e.preventDefault();
    }
});
