# ✦ Lista de Desejos da Amanda ✦

Site estático (só HTML, CSS e JavaScript). Não tem banco de dados: os presentes ficam num arquivo dentro da pasta `presentes/`.

## Como abrir

Dê dois cliques no `index.html`. A senha é a data de aniversário: **23/11/2005** (também aceita `23112005`, `23-11-2005` ou `23/11/05`).

## Estrutura das pastas

```
site-presentes/
├── index.html          ← a página
├── estilo.css          ← cores e animações
├── script.js           ← senha, vaga-lumes, faíscas...
└── presentes/
    ├── lista.js        ← ✏️ AQUI você edita os presentes
    └── fotos/          ← 📷 AQUI você coloca as fotos
```

## Como adicionar um presente

1. Coloque a foto em `presentes/fotos/` (ex.: `bolsa.jpg`). Pode ser `.jpg`, `.png`, `.webp`...
2. Abra `presentes/lista.js` num editor de texto (Bloco de Notas, VS Code...).
3. Copie um bloco e cole no final da lista, antes do `];`:

```js
  {
    nome: "Bolsa de couro",
    foto: "bolsa.jpg",
    link: "https://loja.com/bolsa",
    observacao: "Na cor caramelo, tamanho médio."
  },
```

Algumas dicas:

- Coloque **vírgula** entre um bloco `{ ... }` e outro.
- Use aspas `"` em volta dos textos. Se o texto tiver aspas, troque por `'` ou `“ ”`.
- `link` e `observacao` podem ficar vazios: `link: ""`.
- Na `foto` dá pra usar um link de imagem da internet em vez de um arquivo (`foto: "https://..."`).
- O nome do arquivo precisa ser **igual**, inclusive maiúsculas e minúsculas (`Bolsa.JPG` ≠ `bolsa.jpg`).
- Para tirar um presente, apague o bloco inteiro dele.
- Os 4 presentes de exemplo e as fotos `exemplo-*.svg` podem ser apagados.

Salvou o arquivo, atualizou a página e pronto.

Se a lista sumir depois de editar, quase sempre é uma vírgula ou aspa faltando no `lista.js`.

## Como colocar no ar (grátis)

**Netlify Drop (mais fácil):** entre em https://app.netlify.com/drop e arraste a pasta `site-presentes` inteira. Ele te dá um link pra mandar pras pessoas. Pra atualizar, é só arrastar de novo.

**GitHub Pages:** crie um repositório, suba os arquivos e ative em *Settings → Pages* (branch `main`, pasta raiz).

## Sobre a senha

A senha é verificada no próprio navegador. Ela impede que alguém veja a lista por acaso, mas quem souber mexer no código-fonte consegue ler os presentes sem ela. Para uma lista de aniversário isso costuma ser suficiente; só não coloque nada realmente sigiloso aqui.

Depois de entrar, o site lembra a senha até a aba ser fechada. O botão "trancar o jardim", no rodapé, fecha de novo.

## Personalizar

- Nome e data no topo: em `index.html`, procure por `Amanda` e `23 · novembro`.
- Cores: no começo do `estilo.css`, na parte `:root`.
