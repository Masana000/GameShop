# GameShop

Sistema de recomendação de jogos baseado em Teoria dos Grafos.

## Como executar

**Requisitos:** Node.js 18+

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

**Testes:**

```bash
npm test
```

---

## Algoritmos implementados

### BFS — Busca em Largura (sugestão de amigos)

Percorre o grafo de amizades a partir do usuário atual até profundidade 2, encontrando usuários que são amigos dos amigos mas ainda não são amigos diretos. Os resultados são ordenados por número de amigos em comum.

- Complexidade de tempo: O(V + E)
- Complexidade de espaço: O(V)

### Jaccard — Filtragem Colaborativa (recomendação de jogos)

Calcula a similaridade entre dois usuários com base na interseção e união de suas bibliotecas de jogos:

```
sim(u, v) = |Biblioteca(u) ∩ Biblioteca(v)| / |Biblioteca(u) ∪ Biblioteca(v)|
```

Usuários com maior similaridade têm seus jogos sugeridos para o usuário atual.

- Complexidade de tempo: O(N · g), onde N = número de usuários e g = tamanho médio da biblioteca
- Complexidade de espaço: O(N)

---

## Estrutura do projeto

```
src/
├── core/           Graph.ts — classe de grafo com lista de adjacência
├── algorithms/     bfs.ts, jaccard.ts — algoritmos puros
├── io/             reader.ts — leitura e construção dos grafos
├── pages/          Login, Store, GameDetail, Profile, Admin
├── components/     GameCard, Layout
└── state.ts        estado global (Zustand)
tests/              9 testes unitários (3 por algoritmo)
data/               seed.json — dataset inicial
public/covers/      capas dos jogos
docs/               documentos do projeto (E1, E2, E3)
```

---

## Grupo

| Integrantes | RA |
|---|---|
| Caio Siqueira | 38092361 |
| Fillipy Mendes | 37115928 |
| Leonardo Masanao | 40731677 |

Teoria dos Grafos — Profa. Dra. Andréa Ono Sakai
