function criptografarSenha(senha) {
    return [...senha].map(char => String.fromCharCode(char.charCodeAt(0) + 5 - 2 + 3)).join('');
}

function calcularDeslocamento(senha) {
    return [...senha].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10 + 1;
}

function criptografarTexto(texto, senha) {
    const deslocamento = calcularDeslocamento(senha);
    return [...texto].map(char => String.fromCharCode(char.charCodeAt(0) + deslocamento)).join('');
}

document.getElementById("gerarBtn").addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (!titulo || !nome || !senha || !texto) {
        alert("Preencha todos os campos antes de gerar!");
        return;
    }

    const senhaCriptografada = criptografarSenha(senha);
    const textoCriptografado = criptografarTexto(texto, senha);
    const nomeCriptografado = criptografarTexto(nome, senha);
    const tituloCriptografado = criptografarTexto(titulo, senha);

    const entradaJSON = {
        titulo: tituloCriptografado,
        nome: nomeCriptografado,
        texto: textoCriptografado,
        senha: senhaCriptografada
    };

    document.getElementById("resultado").textContent = JSON.stringify(entradaJSON, null, 2);
});