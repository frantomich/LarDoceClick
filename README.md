# 🏡 Lar Doce Click

Solução desenvolvida por estudantes da *Universidade Federal de Ouro Preto (UFOP) - Campus ICEA* para o *Desafio Frontend* proposto pela *Visão Jr*.  
O projeto consiste em um protótipo de website para uma imobiliária fictícia, com foco em design moderno, responsividade e interatividade.

---

## 📋 Índice

- [Visão Geral do Desafio](#visao-geral-do-desafio)
  - [Contexto do Desafio](#contexto-do-desafio)
  - [Objetivos Cumpridos](#objetivos-cumpridos)
- [Demonstração Interativa](#demonstracao-interativa)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Tecnologias e Ferramentas](#tecnologias-e-ferramentas)
  - [Decisões de Arquitetura](#decisoes-de-arquitetura)
- [Instalação e Execução](#instalacao-e-execucao)
  - [Pré-requisitos](#pre-requisitos)
  - [Passo a Passo](#passo-a-passo)
- [Configuração Adicional](#configuracao-adicional)
- [Roteiro de Melhorias (Roadmap)](#roteiro-de-melhorias-roadmap)
- [Como Contribuir](#como-contribuir)
- [Agradecimentos](#agradecimentos)
- [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)
- [Licença](#licenca)

---

<a id="visao-geral-do-desafio"><a>
## 📌 Visão Geral do Desafio

O *Lar Doce Click* é a nossa solução para o desafio de desenvolvimento frontend proposto pela *Visão Jr*, a Empresa Júnior dos cursos de Sistemas de Informação e Engenharia da Computação da *UFOP - Campus ICEA*.

<a id="contexto-do-desafio"><a>
### 📝 Contexto do Desafio

O desafio consistia em simular um cenário de cliente real, onde a demanda era criar uma landing page para uma imobiliária fictícia.  
O projeto deveria ser visualmente atraente, totalmente responsivo e interativo, demonstrando habilidades técnicas em desenvolvimento web frontend.

<a id="objetivos-cumpridos"><a>
### 🎯 Objetivos Cumpridos

- *Estrutura Semântica e Acessível*: Uso de HTML5 semântico para acessibilidade e SEO.
- *Layout Moderno e Responsivo*: CSS3 com Flexbox, Grid, Media Queries e variáveis.
- *Interatividade com JavaScript Puro*: Componentes como carrosséis criados do zero.
- *Formulário com API*: Integração com EmailJS para envio de mensagens.
- *Código Limpo e Documentado*: Foco em boas práticas de desenvolvimento.

---

<a id="demonstracao-interativa"><a>
## 🚀 Demonstração Interativa

Acesse o projeto completo em:  
👉 [Clique aqui para visitar o Lar Doce Click](https://frantomich.github.io/)

---

<a id="funcionalidades-implementadas"><a>
## ✨ Funcionalidades Implementadas

- 🎠 *Carrosséis Dinâmicos* (Benefícios, Imóveis, Depoimentos).
- 🖼 *Vitrine de Imóveis* com dados como quartos, banheiros, vagas.
- 📧 *Formulário de Contato Funcional* com integração ao EmailJS.
- 📱 *Design 100% Responsivo* em desktop, tablet e mobile.

---

<a id="estrutura-de-arquivos"><a>
## 📁 Estrutura de Arquivos

```bash
lar-doce-click/
├── assets/
│   ├── images/         # Imagens dos imóveis, banners, etc.
│   └── icons/          # Ícones (SVG ou PNG)
├── css/
│   └── style.css       # Folha de estilos principal
├── js/
│   └── script.js       # Lógica de interatividade e EmailJS
├── index.html          # Arquivo principal da aplicação
├── LICENSE             # Arquivo da licença do projeto
└── README.md           # Documentação do projeto
```

---

<a id="tecnologias-e-ferramentas"><a>
## 🛠 Tecnologias e Ferramentas

| Tecnologia           | Descrição                                                                |
|----------------------|-------------------------------------------------------------------------|
| HTML5                | Marcação semântica do conteúdo                                          |
| CSS3                 | Estilização, responsividade e animações                                |
| JavaScript (ES6+)    | Lógica, manipulação do DOM e interatividade                            |
| EmailJS              | Envio de mensagens via frontend                                         |
| Git & GitHub         | Controle de versão e hospedagem do repositório                         |
| VSCode               | Editor de código com suporte ao Live Server                            |

---

<a id="decisoes-de-arquitetura"><a>
## ⚖ Decisões de Arquitetura

- *Vanilla JS*: Evitamos frameworks para focar no domínio dos fundamentos.
- *EmailJS*: Permite o envio de e-mails sem backend, mantendo o foco no frontend.

---

<a id="instalacao-e-execucao"><a>
## ⚙ Instalação e Execução

<a id="pre-requisitos"><a>
### ✅ Pré-requisitos

- Git instalado.
- Navegador moderno (Chrome, Firefox, etc.).
- VSCode com a extensão Live Server.

<a id="passo-a-passo"><a>
### 🚀 Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/frantomich/LarDoceClick.git

# 2. Acesse o diretório
cd LarDoceClick

# 3. Abra no VSCode
code .

# 4. Execute com Live Server no arquivo `index.html`
```

---

<a id="configuracao-adicional"><a>
## 🔧 Configuração Adicional (EmailJS)

1. Crie uma conta no [EmailJS](https://www.emailjs.com/).
2. Configure um serviço de e-mail (ex: Gmail) e um template.
3. Substitua no arquivo js/script.js:

---

<a id="roteiro-de-melhorias-roadmap"><a>
## 🗺 Roteiro de Melhorias (Roadmap)

- [ ] Página de detalhes para cada imóvel.
- [ ] Filtros avançados (preço, quartos, cidade).
- [ ] Animações e transições sutis.
- [ ] Otimização de performance (CSS/JS e imagens).
- [ ] Testes unitários para funções JS.

---

<a id="como-contribuir"><a>
## 🤝 Como Contribuir

1. Faça um *fork*.
2. Crie uma branch: git checkout -b feature/sua-feature.
3. Commit: git commit -m 'Minha contribuição'.
4. Push: git push origin feature/sua-feature.
5. Abra um *Pull Request*.
   
---

<a id="agradecimentos"><a>
## 🙏 Agradecimentos

- À *Visão Jr.* pela oportunidade e desafio estimulante.  
- Aos professores e colegas da *UFOP - ICEA* pelo apoio. 
- À comunidade open source por compartilhar tanto conhecimento.

---

<a id="equipe-de-desenvolvimento"><a>
## 👨‍💻 Equipe de Desenvolvimento

| Integrante | GitHub | LinkedIn |
|-----------|--------|----------|
| ![](https://via.placeholder.com/100) <br> *Fábio Ramos Zeferino Júnior* | [GitHub](https://github.com/fabiojr01) | [LinkedIn](https://www.linkedin.com/in/f%C3%A1bio-ramos-zeferino-j%C3%BAnior-a13589376/) |
| ![](https://via.placeholder.com/100) <br> *Franklin Liesner Tomich* | [GitHub](https://github.com/frantomich) | [LinkedIn](https://www.linkedin.com/in/franklin-l-tomich-b6256936a/) |
| ![](https://via.placeholder.com/100) <br> *Kaua Kirk Xavier De Oliveira*   | [GitHub](https://github.com/kauakirk) | [LinkedIn](https://www.linkedin.com/in/kaua-k-992400209/) |
| ![](https://via.placeholder.com/100) <br> *Kelvin Fernando Milagres de Castro* | [GitHub](https://github.com/Kelvinmilagres) | [LinkedIn](https://www.linkedin.com/in/kelvinfernandofront-end/) |
| ![](https://via.placeholder.com/100) <br> *Mateus de Oliveira Silveira* | [GitHub](https://github.com/mateus2911 ) | [LinkedIn](https://www.linkedin.com/in/[LINKEDIN_USER_3]/) |
| ![](https://via.placeholder.com/100) <br> *Vitória de Souza Miranda* | [GitHub](https://github.com/vitoriasmiranda) | [LinkedIn](https://www.linkedin.com/in/vitoriasmiranda/) |

---

<a id="licenca"><a>
## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
