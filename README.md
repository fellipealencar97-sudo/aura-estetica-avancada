# Aura Estética Avançada

Landing page institucional de alta conversão desenvolvida para o segmento de estética avançada, com foco em desempenho, acessibilidade, segurança em produção e estrutura semântica otimizada para mecanismos de busca e inteligência artificial generativa (GEO).

🔗 **Acesse o projeto online:** [aura-estetica-avancada.vercel.app](https://aura-estetica-avancada.vercel.app)

---

## Sobre o Projeto

A **Aura Estética Avançada** é um projeto de portfólio concebido para demonstrar padrões modernos de desenvolvimento web comercial: hierarquia visual elegante, carregamento instantâneo na primeira dobra (*Hero*), navegação acessível por teclado e cabeçalhos HTTP de segurança configurados diretamente na camada de entrega.

> **Nota de transparência:** A clínica, os profissionais, os depoimentos e os dados de contato apresentados nesta página são fictícios e foram criados exclusivamente para fins de demonstração técnica e portfólio. Por esse motivo, a indexação em buscadores públicos foi desativada intencionalmente (`noindex` e `robots.txt`).

---

## Destaques de Engenharia e Qualidade

* **Desempenho e Renderização (*Web Vitals*):**
  * Carregamento assíncrono não-bloqueante da tipografia externa (*Google Fonts*), evitando atrasos no *First Contentful Paint (FCP)*.
  * Pintura imediata da seção principal (*Hero*) e imagem otimizada em formato moderno `.webp` com proporção controlada (`4:5`) para evitar deslocamento de layout (*CLS*).
  * Animações suaves acionadas sob demanda via `IntersectionObserver` e transições de acordeão (*FAQ*) construídas com CSS Grid.
* **Acessibilidade (*WCAG*):**
  * Estrutura semântica em HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
  * Link de salto direto para o conteúdo principal (*skip-link*), estados de `:focus-visible` e atributos ARIA para navegação assistiva e por teclado.
* **Segurança em Produção (`vercel.json`):**
  * **Content-Security-Policy (CSP):** Restrição explícita de origens para scripts, estilos, fontes e imagens (`default-src 'self'`).
  * **Strict-Transport-Security (HSTS):** Reforço de conexão criptografada via HTTPS.
  * **Proteções adicionais:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` e `Permissions-Policy`.
* **SEO Técnico e GEO (*Generative Engine Optimization*):**
  * Dados estruturados em **JSON-LD (Schema.org)** tipados como `WebPage` e `FAQPage` para compreensão precisa por motores de busca e assistentes de IA.

### Auditoria Lighthouse (Ambiente Local)

* **Performance:** `93`
* **Accessibility:** `100`
* **Best Practices:** `100`
* **SEO:** `66` *(pontuação esperada devido ao bloqueio ético intencional de indexação via `noindex` e `robots.txt`)*

---

## Tecnologias Utilizadas

* **HTML5** (estrutura semântica e dados estruturados JSON-LD)
* **CSS3** (variáveis customizadas, Flexbox, CSS Grid, *mobile-first* e micro-interações)
* **JavaScript (ES6+ / Vanilla JS)** (controle de estado sem dependências externas, `ResizeObserver` e `IntersectionObserver`)
* **Vercel** (hospedagem estática em CDN global e cabeçalhos de segurança HTTP)

---

## Estrutura de Pastas

```text
aura-estetica-avancada/
├── assets/
│   └── images/
│       └── hero-estetica-avancada.webp
├── css/
│   └── style.css
├── js/
│   └── main.js
├── .gitignore
├── index.html
├── README.md
├── robots.txt
└── vercel.json
```

---

## Como Executar Localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/fellipealencar97-sudo/aura-estetica-avancada.git](https://github.com/fellipealencar97-sudo/aura-estetica-avancada.git)
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd aura-estetica-avancada
   ```
3. Abra o arquivo `index.html` diretamente no navegador ou utilize uma extensão de servidor local (como o **Live Server** no VS Code).

---

## Autor

Desenvolvido por **Fellipe Alencar** — [GitHub](https://github.com/fellipealencar97-sudo)
