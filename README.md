# 🔒 Mensagem Secreta - Sistema de Mensagens Criptografadas

Sistema moderno e fluido para criar e visualizar mensagens secretas criptografadas.

## ✨ Características

- **Design Moderno**: Interface contemporânea com gradientes e animações suaves
- **Animações Fluidas**: Transições e efeitos visuais profissionais
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Criptografia**: Sistema de criptografia simples mas eficaz
- **UX Melhorada**: Feedbacks visuais, loading states e validações em tempo real
- **Sem Bugs**: Código refatorado e otimizado

## 📁 Estrutura de Arquivos

```
├── index.html          # Página principal (visualizar mensagens)
├── gerar.html          # Página de geração de mensagens
├── style.css           # Estilos globais
├── script.js           # Lógica da página principal
├── gerar.js            # Lógica da página de geração
├── mensagens.json      # Banco de dados de mensagens
└── README.md           # Este arquivo
```

## 🔐 Como Funciona a Criptografia

1. **Senha**: Criptografada com deslocamento fixo (+6)
2. **Conteúdo**: Criptografado com deslocamento calculado baseado na senha
3. **Deslocamento**: Calculado pela soma dos códigos ASCII da senha % 10 + 1


### Design
- ✅ Paleta de cores moderna (roxo/azul)
- ✅ Gradientes suaves
- ✅ Bordas arredondadas
- ✅ Sombras e profundidade
- ✅ Ícones SVG integrados
- ✅ Tipografia Inter (Google Fonts)

### Animações
- ✅ Fade in ao carregar
- ✅ Animação de digitação para mensagens
- ✅ Loading states nos botões
- ✅ Hover effects suaves
- ✅ Transições de slide e scale
- ✅ Partículas animadas no fundo
- ✅ Heartbeat no coração do footer

### Funcionalidades
- ✅ Toggle para mostrar/ocultar senha
- ✅ Validação em tempo real
- ✅ Mensagens de erro amigáveis
- ✅ Auto-foco nos campos
- ✅ Scroll suave automático
- ✅ Copiar JSON com um clique
- ✅ Toast notifications
- ✅ Prevenção de múltiplos submits
- ✅ Estados de loading
- ✅ Acessibilidade melhorada

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🌈 Recursos de Acessibilidade

- Labels apropriados em todos os inputs
- Contraste de cores adequado
- Suporte a `prefers-reduced-motion`
- Aria-labels nos botões
- Foco visível nos elementos interativos

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 moderno (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ (Async/Await, Arrow Functions)
- Font: Inter (Google Fonts)

## 📝 Notas

- As mensagens ficam armazenadas em `mensagens.json`
- A criptografia é simples e não deve ser usada para dados realmente sensíveis
- Para adicionar novas mensagens, use sempre o gerador (gerar.html)


## 👨‍💻 Autor

**Johnnick F Landim**
- Website: [links.johnnick.com.br](https://links.johnnick.com.br)

