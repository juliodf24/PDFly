![logo](https://github.com/user-attachments/assets/44b4d1ae-fbf1-4011-8159-6d29ff3e99ae)

# 📄 PDFly - Atividades em PDF para Estudantes

[![Deploy on Vercel](https://img.shields.io/badge/deploy-vercel-000?logo=vercel)](https://vercel.com/)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Made with React](https://img.shields.io/badge/made%20with-react-61dafb?logo=react)

**PDFly** é uma aplicação web desenvolvida com Next.js e React que gera **atividades de revisão em PDF** a partir de conteúdo estruturado em JSON. É ideal para educadores, tutores e estudantes que desejam criar listas de exercícios com gabarito de forma rápida, prática e automatizada.

link de acesso: https://pdflyplus.vercel.app/
---

## ✨ Funcionalidades

- 📋 Geração automática de PDFs a partir de um modelo de conteúdo.
- 🧠 Ideal para atividades de **revisão de conteúdo**, **fixação** e **autoavaliação**.
- 📄 Visualização integrada do PDF (em desktop).
- 📲 Download direto em dispositivos móveis.
- 🧾 Gabarito incluso automaticamente.

---
![image](https://github.com/user-attachments/assets/867e2e5f-40ba-4947-b9b0-c7b4757e6fed)
---

## 🚀 Como usar

### 1. Copie o modelo de conteúdo

Clique no botão **Copiar modelo** para copiar o conteúdo base:

```json
{
  "titulo": "Nome do Documento",
  "questoes": [
    {
      "questao": "1 - Tema da questão",
      "pergunta": "Texto da pergunta aqui",
      "alternativas": ["A", "B", "C", "D"]
    }
  ],
  "gabarito": {
    "titulo": "Gabarito",
    "questoes": [
      {
        "questao": "1",
        "alternativas": ["A"]
      }
    ]
  }
}
```

### 2. Cole seu conteúdo no campo de texto

Adapte o modelo com suas próprias perguntas e respostas e cole no campo indicado.

### 3. Gere o documento

Clique em **Gerar Documento** e o PDF será exibido (em desktop) ou disponibilizado para download (em mobile).

---

## 🧪 Tecnologias utilizadas

- **Next.js**
- **React**
- **@react-pdf/renderer**
- **Tailwind CSS**
- **Lucide React**
- **TypeScript**

---

## 📁 Estrutura do Projeto

```
📁 components
📁 pages
 └── index.tsx          # Página principal com o formulário e lógica de geração
📁 public
 └── logo.png           # Logo do sistema
 └── Contrato.tsx  # Componente que monta o PDF com base nos dados
```

---

## 📦 Executar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pdfly.git
cd pdfly

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📌 Observações

- O conteúdo inserido deve estar no formato JSON válido.
- Em dispositivos móveis, o PDF é baixado em vez de visualizado.
- O gabarito é incluído automaticamente no final do documento.
- Use esse sistema para reforçar conteúdos, revisar temas ou estudar com mais autonomia.

---

## 👨‍🏫 Indicações de uso

- Revisão de conteúdo antes de provas
- Exercícios para reforço escolar
- Autoavaliações
- Atividades complementares

---
