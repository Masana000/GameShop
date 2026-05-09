╔══════════════════════════════════════════════════════════════════╗
║           RELATÓRIO DE AVALIAÇÃO — E2 TEORIA DOS GRAFOS          ║
╚══════════════════════════════════════════════════════════════════╝

GRUPO: GameShop
INTEGRANTES: Calo (38092361), Fillipy (37115928), Leonardo (40731677)
REPOSITÓRIO: https://github.com/Masana000/GameShop
ALGORITMO(S): BFS, Filtragem Colaborativa
DATA DA AVALIAÇÃO: 29/04/2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PONTUAÇÃO POR CRITÉRIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C1 │ Escolha e Justificativa dos Algoritmos  │ Peso 25% │ Nota: 8
C2 │ Análise de Complexidade Big-O           │ Peso 25% │ Nota: 6
C3 │ Arquitetura em Camadas                  │ Peso 20% │ Nota: 6
C4 │ Dataset e Estrutura de Diretórios       │ Peso 15% │ Nota: 8
C5 │ Backlog com Critérios de Aceite         │ Peso 15% │ Nota: 8

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CÁLCULO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(8×0,25) + (6×0,25) + (6×0,20) + (8×0,15) + (8×0,15)
= 2,00 + 1,50 + 1,20 + 1,20 + 1,20
= 7,10

Penalidades aplicadas:
• Nenhuma

NOTA FINAL E2: 7,1 / 10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARECER POR CRITÉRIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C1 — ESCOLHA E JUSTIFICATIVA DOS ALGORITMOS
✔ Pontos fortes:
• Uso de BFS para recomendação de “amigos de amigos” é clássico e correto.
• Justificativa simples, mas alinhada ao problema.
• Inclusão de filtragem colaborativa amplia o valor do sistema.

⚠ Pontos de melhoria:
• A filtragem colaborativa foi descrita de forma superficial (não especifica claramente o método: similaridade de cosseno? jaccard?).
• Falta maior profundidade técnica na justificativa (nível ainda descritivo).

📐 Verificação técnica:
• Algoritmos são adequados ao domínio de rede social + recomendação. ✔

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C2 — ANÁLISE DE COMPLEXIDADE BIG-O
✔ Pontos fortes:
• BFS corretamente definido como O(V + E).

⚠ Pontos de melhoria:
• Complexidade da filtragem colaborativa está incorreta/ambígua:
  → O(V · k) não é uma formulação padrão clara.
  → Não define exatamente o que é k nem como a similaridade é calculada.
• Falta detalhamento do custo real (comparação entre usuários, interseção de conjuntos, etc.).

📐 Verificação técnica:
• Correto para BFS, mas insuficiente para o segundo algoritmo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C3 — ARQUITETURA EM CAMADAS
✔ Pontos fortes:
• Separação conceitual das camadas está correta.
• Estrutura moderna com React demonstra iniciativa.

⚠ Pontos de melhoria:
• Mistura de conceitos: React (UI) e lógica de grafos aparecem muito acoplados.
• Camada de aplicação (Service) está vaga (Hooks não são exatamente “Service Layer” clássico).
• Não há diagrama visual — apenas descrição textual.
• Arquitetura mais voltada a front-end do que ao problema de grafos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C4 — DATASET E ESTRUTURA DE DIRETÓRIOS
✔ Pontos fortes:
• Modelo interessante: grafo social + grafo bipartido (usuário-jogo).
• JSON bem estruturado.
• Representação clara das relações.

⚠ Pontos de melhoria:
• Falta estratégia de geração aleatória (requisito do E2).
• Não explicita densidade, número de vértices ou parâmetros de teste.
• Estrutura de diretórios pouco alinhada com arquitetura em camadas (mistura UI e core).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C5 — BACKLOG COM CRITÉRIOS DE ACEITE
✔ Pontos fortes:
• Critérios seguem o padrão “dado/quando/então”.
• Funcionalidades coerentes com o sistema proposto.

⚠ Pontos de melhoria:
• Critérios pouco mensuráveis (não há métricas como tempo, quantidade, formato).
• Muito foco em interface (React) e pouco foco em validação dos algoritmos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALERTAS PARA O E3 (MVP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ FOCO ERRADO: muito esforço em front-end pode prejudicar a avaliação (o foco é grafos).
⚠ ALGORITMO INCOMPLETO: definir formalmente como funciona a filtragem colaborativa.
⚠ TESTABILIDADE: separar melhor lógica de grafo da interface para facilitar testes.
⚠ COMPLEXIDADE: revisar Big-O da recomendação antes de implementar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMENDAÇÃO FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[X] APROVADO COM RESSALVAS — pode iniciar o E3, mas ajustar a modelagem antes de codar

Justificativa:
O projeto tem uma ideia muito boa e moderna (rede social + recomendação), mas ainda está mais forte no conceito do produto do que no rigor técnico de grafos. Para evoluir bem no E3, é essencial formalizar melhor os algoritmos e reduzir o foco na interface.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSISTÊNCIA COM O E1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✅] Domínio mantido (rede social + recomendação)
[⚠] Tipo de grafo parcialmente definido (social + bipartido, mas não formalizado)
[⚠] Algoritmo secundário pouco especificado

Inconsistências detectadas:
• Falta de definição formal da filtragem colaborativa
• Arquitetura mais orientada a UI do que ao modelo de grafos