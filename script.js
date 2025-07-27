async function buscarMensagem() {
    const senha = document.getElementById("senha").value.trim();
    const container = document.getElementById("mensagem-container");
    container.innerHTML = "";

    if (!senha) return alert("Digite uma senha!");

    try {
        const response = await fetch("mensagens.json");
        const mensagens = await response.json();
        console.log("Mensagens carregadas:", mensagens);

        const senhaCriptografada = criptografarSenha(senha);
        console.log("Senha criptografada:", senhaCriptografada);
        const entrada = mensagens.find(msg => senhaCriptografada === msg.senha);

        if (!entrada) {
            container.innerHTML = "<p style='color: red;'>Senha incorreta. Tente novamente.</p>";
            return;
        }

        const textoDescriptografado = descriptografar(entrada.texto, senha);
        const nomeDescriptografado = descriptografar(entrada.nome, senha);
        const tituloDescriptografado = descriptografar(entrada.titulo, senha);
        exibirAnimado(`${tituloDescriptografado}\n\nPara: ${nomeDescriptografado}\n\n${textoDescriptografado}`, container);
    } catch (err) {
        console.error("Erro ao buscar mensagem:", err);
        container.innerHTML = "Erro ao carregar mensagens.";
    }
}

function criptografarSenha(senha) {
    return [...senha].map(char => String.fromCharCode(char.charCodeAt(0) + 5 - 2 + 3)).join('');
}

// function criptografarTexto(texto, senha) {
//     const deslocamento = calcularDeslocamento(senha);
//     return [...texto].map(char => String.fromCharCode(char.charCodeAt(0) + deslocamento)).join('');
// }

function descriptografar(texto, senha) {
    const deslocamento = calcularDeslocamento(senha);
    return [...texto].map(char => String.fromCharCode(char.charCodeAt(0) - deslocamento)).join('');
}

function calcularDeslocamento(senha) {
    return [...senha].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10 + 1;
}

function exibirAnimado(texto, container) {
    let i = 0;
    const intervalo = setInterval(() => {
        container.textContent += texto[i];
        i++;
        if (i >= texto.length) clearInterval(intervalo);
    }, 30);
}