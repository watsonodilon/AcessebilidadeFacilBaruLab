# Acessibilidade Fácil BARU LAB

Barra de ferramentas de acessibilidade para sites em HTML puro. É um único arquivo JavaScript,
sem dependências, inspirado no conjunto de recursos do plugin One Click Accessibility
(código próprio, escrito do zero).

## Instalação (uma linha)

1. Copie `acessibilidade.js` para o seu site (por exemplo, na pasta `js/`).
2. Cole antes de `</body>` em cada página:

```html
<script src="js/acessibilidade.js" defer></script>
```

Pronto. Abra `demo.html` no navegador para ver funcionando.

## Recursos

- Aumentar e diminuir texto (de 70% a 160%)
- Escala de cinza
- Alto contraste
- Contraste negativo (fundo preto, texto branco, links amarelos)
- Fundo claro
- Sublinhar links
- Fonte legível (sem serifa)
- Pausar animações
- Destacar foco do teclado
- Redefinir tudo
- Link "Pular para o conteúdo" (aparece na primeira tecla Tab)

As escolhas do visitante ficam salvas no navegador (localStorage) e valem para todas as páginas do site.

## Configuração (opcional)

Adicione atributos `data-*` na própria tag `<script>`:

| Atributo | Valores | Padrão |
|---|---|---|
| `data-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left`, `right`, `left` | `bottom-right` |
| `data-color` | cor do botão, ex.: `#c0392b` | `#1a56db` |
| `data-lang` | `pt-BR`, `en`, `es` | `pt-BR` |
| `data-skip-target` | seletor do conteúdo principal, ex.: `#artigo` | detecta `main`, `#content`, `h1`… |
| `data-skip-link` | `false` para desativar o link "Pular para o conteúdo" | `true` |
| `data-sitemap` | URL do mapa do site (mostra um link no painel) | — |
| `data-help` | URL da página de ajuda | — |
| `data-feedback` | URL de contato | — |

Exemplo completo:

```html
<script src="js/acessibilidade.js"
        data-position="left"
        data-color="#2d6a4f"
        data-lang="pt-BR"
        data-sitemap="/mapa-do-site.html"
        defer></script>
```

Escolha uma cor escura no `data-color`: o ícone e o texto do painel são brancos sobre ela.

## Acessibilidade do próprio widget

- Botão e opções operáveis só pelo teclado (Tab, Enter, Espaço, setas ↑ ↓, Home, End).
- `Esc` fecha o painel e devolve o foco ao botão.
- Cada opção informa o estado ao leitor de tela (`aria-pressed`) e as mudanças são anunciadas.
- O widget roda em Shadow DOM, então o CSS do seu site não o quebra e vice-versa.

## API JavaScript (opcional)

```js
AcessibilidadeFacil.open();   // abre o painel
AcessibilidadeFacil.close();  // fecha o painel
AcessibilidadeFacil.reset();  // limpa as preferências do visitante
```

## Observações

- O aumento de texto age sobre o texto já presente quando a opção é usada; conteúdo carregado
  depois só é ajustado no próximo clique.
- Uma barra de ferramentas ajuda o visitante, mas não substitui um site construído de forma
  acessível (textos alternativos, contraste adequado, títulos bem estruturados).

Licença: MIT.
