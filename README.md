# 🚀 Desafio Técnico QA Sênior - Catálogo de Serviços Públicos

## 📌 Contexto do Projeto

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de **(QA) Sênior**. O objetivo foi validar a qualidade de uma API REST de catálogo de serviços públicos (semelhante a um sistema municipal), garantindo que a aplicação esteja robusta, segura e performática antes de ir para produção.

**Link da API:** `http://localhost:8080` (Ambiente local via Docker)

---

## 🎯 Estratégia de Testes

Adotei uma abordagem baseada em **análise de risco**, priorizando os fluxos que mais impactam o cidadão e o negócio. A estratégia foi dividida em 3 frentes principais:

1.  **Testes Exploratórios (Manuais)**: Mapeamento da API via Postman para entender o comportamento real e encontrar bugs rapidamente.
2.  **Testes Automatizados (API)**: Cobertura em código dos fluxos críticos e cenários de borda, utilizando **TypeScript + Jest + Supertest**.
3.  **Testes de Performance (Carga)**: Simulação de pico de acessos com **K6**, validando se a API suporta o tráfego esperado para um serviço público.

---

## 🐛 Resumo Executivo dos Defeitos Encontrados

Durante a execução, foram encontrados **4 bugs** e **2 observações de melhoria**. Destes, **2 são Bloqueadores (Críticos)** e impedem o deploy em produção.

| ID | Título | Gravidade | Status |
| :--- | :--- | :--- | :--- |
| **BUG-003** | Webhook aceita requisições sem assinatura HMAC (Falha de Segurança) | **Crítica (Blocker)** | ❌ Falha |
| **BUG-004** | GET `/services/:id` com ID inválido retorna `500 Internal Server Error` | **Crítica (Blocker)** | ❌ Falha |
| **BUG-006** | POST `/favorite` permite favoritar o mesmo serviço múltiplas vezes | **Alta** | ❌ Falha |
| **BUG-002** | Paginação ignora parâmetros inválidos (`page=-1`, `per_page=abc`) | **Média** | ❌ Falha |
| **OBS-001** | Busca com espaços retorna `"results": null` (UX/API) | Melhoria | ℹ️ Observação |
| **OBS-002** | Busca vazia retorna todos os registros (Risco de Performance Futura) | Melhoria | ℹ️ Observação |

> **Detalhamento completo dos bugs e passos para reprodução:** [Ver planilha de bugs](https://docs.google.com/spreadsheets/d/1E_i5__bOZ5vkXN_AkDSQDCV0z-rOm5oFksgSMfpTX7c/edit?gid=0#gid=0) (ou veja a seção de Testes Automatizados).

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript (Automação) / JavaScript (K6)
- **Framework de Testes:** Jest
- **Requisições HTTP:** Supertest
- **Testes de Carga:** K6
- **Containerização:** Docker / Docker Compose
- **Gerenciador de Pacotes:** npm



## 🚀 Instalação e Configuração do Ambiente

### 1. Clonar o repositório (ou descompactar)
```bash
cd /home/lucas/Documents/desafio-qa-senior-main/automacao
```

## 📬 Coleção Postman

Para facilitar a reprodução manual dos cenários testados ou a depuração local, disponibilizo a coleção do Postman utilizada durante a fase exploratória.

- **Collection**: [postman/collection.json](./postman/collection.json)
- **Environment (Variáveis)**: [postman/environment.json](./postman/environment.json)

**Como importar:**
1. Abra o Postman.
2. Clique em **File > Import** (ou no botão "Import" no canto superior esquerdo).
3. Selecione os arquivos `.json` baixados (ou faça upload via link).
4. Selecione o ambiente `Desafio QA Local` no canto superior direito e comece a testar.

> *Nota: Lembre-se de subir a API com `docker-compose up -d` antes de rodar as requisições.*
