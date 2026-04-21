# E2 — Design Técnico, Arquitetura e Backlog

> **Disciplina:** Teoria dos Grafos  
> **Prazo:** 13 de abril de 2026  
> **Peso:** 20% da nota final  

---

## Identificação do Grupo

| Campo              | Preenchimento                         |
|--------------------|---------------------------------------|
| Nome do projeto    | GameShop                              |
| Repositório GitHub | https://github.com/Masana000/GameShop |
| Integrante 1       | Calo — 38092361                       |
| Integrante 2       | Fillipy — 37115928                    |
| Integrante 3       | Leonardo — 40731677                   |

---

## 1. Algoritmos Escolhidos

### 1.1 Algoritmo Principal

| Campo                  | Resposta                                                                |
|------------------------|-------------------------------------------------------------------------|
| Nome do algoritmo      | Busca em Largura (BFS)                                                  |
| Categoria              | Busca                                                                   |
| Complexidade de tempo  | O(V + E)                                                                |
| Complexidade de espaço | O(V)                                                                    |
| Problema que resolve   | Identificar conexões indiretas entre usuários para sugestões de amizade |

### Por que este algoritmo foi escolhido?

O BFS foi escolhido por sua eficiência em explorar a rede social de forma radial.  
Para sugerir novos amigos, o algoritmo percorre o grafo de amizades até a profundidade 2, permitindo encontrar **amigos de amigos** que ainda não possuem conexão direta com o usuário.

### Alternativa descartada e motivo

| Algoritmo alternativo       | Motivo da exclusão                                                                       |
|-----------------------------|------------------------------------------------------------------------------------------|
| Busca em Profundidade (DFS) | Não garante encontrar conexões mais próximas com eficiência para recomendações imediatas |

### Limitações no contexto do problema

Em redes sociais muito densas (com milhões de conexões), o BFS pode consumir memória elevada devido à quantidade de nós visitados.  
Para o escopo acadêmico (profundidade 2), isso não é um problema relevante.

### Referência bibliográfica

> CORMEN, T. H. et al. *Algoritmos: teoria e prática*. 3. ed. Rio de Janeiro: Elsevier, 2012.

---

### 1.2 Algoritmo Adicional

| Campo                  | Resposta                                                   |
|------------------------|------------------------------------------------------------|
| Nome do algoritmo      | Filtragem Colaborativa baseada em Similaridade de Vértices |
| Categoria              | Heurística / Recomendação                                  |
| Complexidade de tempo  | O(V · k), onde k é o grau médio                            |
| Complexidade de espaço | O(V + E)                                                   |

### Justificativa

Este algoritmo complementa o sistema utilizando um **grafo bipartido (usuário-jogo)** para sugerir títulos com base em perfis com gostos semelhantes.

A recomendação ocorre analisando vizinhos em comum no grafo de interações.

### Referência bibliográfica

> NEWMAN, M. E. J. *Networks: An Introduction*. Oxford University Press, 2010.

---

## 2. Arquitetura em Camadas

A arquitetura foi projetada para separar a lógica de grafos da interface.

### Descrição das camadas

| Camada                | Responsabilidade                          | Artefatos principais                  |
|-----------------------|-------------------------------------------|---------------------------------------|
| Apresentação (UI/CLI) | Renderização da interface e recomendações | React, Tailwind CSS                   |
| Aplicação (Service)   | Orquestração dos algoritmos               | Hooks (`useGraph`), Context API       |
| Domínio (Core)        | Implementação de grafos e algoritmos      | `Graph.ts`, `BFS.ts`, `Similarity.ts` |
| Infraestrutura (I/O)  | Entrada e persistência de dados           | `JSONReader`, `LocalStorageAdapter`   |

---

## 3. Estrutura de Diretórios
gameshop-grafos/
├── docs/
│ ├── README.md
│ ├── E1_GameShop_Documento_Visao.pdf
│ └── E2_Design_Tecnico.md
├── src/
│ ├── core/
│ │ ├── graph.ts # Estrutura de grafo (lista de adjacência)
│ │ └── types.ts # Tipos de usuário e jogo
│ ├── algorithms/
│ │ ├── bfs.ts # Algoritmo de busca em largura
│ │ └── recommender.ts # Filtragem colaborativa
│ ├── services/
│ │ └── useGraph.ts # Hook para gerenciamento do grafo
│ ├── components/
│ │ └── RecommendationList.tsx
│ └── main.tsx
├── data/
│ └── dataset.json
└── package.json

---

## 4. Definição do Dataset

### Formato de entrada

O sistema utilizará **lista de adjacência em JSON**, ideal para grafos esparsos.

### Exemplo de estrutura

```json
{
  "users": [
    { "id": "U1", "name": "Calo", "friends": ["U2", "U3"] },
    { "id": "U2", "name": "Fillipy", "friends": ["U1"] }
  ],
  "games": [
    { "id": "J1", "title": "Elden Ring" },
    { "id": "J2", "title": "Cyberpunk 2077" }
  ],
  "interactions": [
    { "userId": "U1", "gameId": "J1", "rating": 5 },
    { "userId": "U2", "gameId": "J1", "rating": 4 }
  ]
}

---

## 5. Backlog do Projeto

### 5.1 In-Scope — O que será implementado

| # | Funcionalidade                 | Prioridade |Critério de aceite                                                                                                              |
|---|--------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------|
| 1 | Modelagem do Grafo de Amizades | Alta       | "Dado o dataset inicial, quando o sistema for carregado, então o grafo U−U deve ser construído usando listas de adjacência."   |
| 2 | Recomendação de Amigos (BFS)   | Alta       | "Dado um usuário logado, quando solicitado, então o sistema deve retornar uma lista de sugestões baseada em amigos em comum."  |
| 3 | Recomendação de Jogos (Social) | Alta       | "Dado um usuário, quando acessar a loja, então exibir jogos que seus amigos possuem ou avaliaram positivamente."               |
| 4 | Filtragem por Avaliação        | Alta       | "Dado o grafo bipartido, quando gerar sugestões, então priorizar jogos com melhores notas de perfis similares."                |
| 5 | Interface React (Loja Virtual) | Alta       | "Dado o processamento dos algoritmos, quando os dados estiverem prontos, então renderizar a interface de usuário da GameShop." |

### 5.2 Out-of-Scope — O que NÃO será feito

| Funcionalidade excluída                  | Motivo                                                                            |
|------------------------------------------|-----------------------------------------------------------------------------------|
| Persistência em Banco de Dados SQL/NoSQL | O foco do projeto acadêmico é o processamento de algoritmos de grafos em memória. |
| Sistema de Chat em Tempo Real            | Funcionalidade fora do escopo da disciplina de Teoria dos Grafos.                 |
| Processamento de Pagamentos Reais        | O projeto visa apenas a simulação da loja e lógica de recomendação.               |

---

## Checklist de Entrega

- [x] Big-O de tempo e espaço declarados para cada algoritmo
- [x] Ao menos 1 alternativa descartada com justificativa
- [x] Diagrama de arquitetura com 4 camadas identificadas
- [x] Referência bibliográfica para cada algoritmo (ABNT ou IEEE)
- [x] Backlog com ≥ 5 itens In-Scope e ≥ 3 Out-of-Scope
- [x] Ao menos 3 critérios de aceite no formato "dado / quando / então"
- [x] Exemplo de estrutura de arquivo de entrada presente   

---

*Teoria dos Grafos — Profa. Dra. Andréa Ono Sakai*