
# Redesign Completo + Mobile + Funcionalidades

## Resumo

Vamos melhorar o design de todas as paginas, tornar a experiencia mobile perfeita na tela de Conversas (abrir/fechar painel de contato, sair da conversa com Esc), e deixar todas as paginas placeholder funcionais com dados mock.

---

## 1. Conversas - Mobile e UX Completa

**Problemas atuais:**
- No mobile, o painel de contato nao aparece (so desktop)
- Nao da para fechar a conversa com tecla Esc
- Os botoes de acao no header ficam apertados no mobile

**Solucoes:**
- Adicionar estado `showContactPanel` no mobile como um overlay/sheet que desliza da direita
- Botao para abrir o painel de info do contato no header do chat (icone User/Info)
- Tecla Escape para voltar para a lista de conversas (`setSelected(null)`)
- No mobile: botao de info abre um sheet/drawer com os dados do contato
- No desktop: painel lateral com botao de toggle para abrir/fechar
- Botoes de acao (ACEITAR, TRANSFERIR, FECHAR) responsivos - so icones no mobile, com texto no desktop
- Input de mensagem com botao de anexo e emoji (visual, sem funcionalidade)

**Arquivo:** `src/pages/Conversations.tsx`

## 2. Paginas Placeholder -> Funcionais com Mock Data

### LiveView (Ao Vivo)
- Grid de cards mostrando atendentes online com status (disponivel, em atendimento, ausente)
- Lista de atendimentos em andamento com nome do cliente, atendente, canal e duracao
- Contador em tempo real (mock)

### QueryAttendance (Consulta de Atendimentos)
- Tabela com filtros (data, atendente, status, departamento)
- Dados mock de historico de atendimentos
- Barra de busca por nome/telefone
- Badges de status (Finalizado, Em andamento, Abandonado)

### Channels (Canais)
- Cards para cada canal configurado (WhatsApp, Telegram, Instagram, etc.)
- Status de conexao (Conectado/Desconectado) com indicador visual
- Botoes de Conectar/Desconectar
- Informacoes do canal (numero, nome, data de conexao)

**Arquivos:** `src/pages/LiveView.tsx`, `src/pages/QueryAttendance.tsx`, `src/pages/Channels.tsx`

## 3. Contatos - Mock Data e Design Melhorado

- Adicionar dados mock para exibir contatos sem backend
- Redesign com tabela ao inves de cards (mais profissional)
- Barra de busca funcional
- Tags/etiquetas coloridas nos contatos
- Avatar com iniciais

**Arquivo:** `src/pages/Contacts.tsx`

## 4. Campanhas e Chatbot - Mock Data

- Adicionar dados mock para ambas as paginas
- Melhorar visual das tabelas com cores e badges

**Arquivos:** `src/pages/Campaigns.tsx`, `src/pages/Chatbot.tsx`

## 5. Pipeline - Design Melhorado

- Adicionar mais cards mock
- Cores diferentes por coluna
- Contador de cards por coluna
- Melhor visual dos cards com avatar e tags

**Arquivo:** `src/pages/Pipeline.tsx`

## 6. WhatsApp - Design Melhorado

- Card central com status visual mais bonito
- Instrucoes passo a passo para conexao
- Area de QR code mais destaque

**Arquivo:** `src/pages/WhatsApp.tsx`

## 7. Login - Redirecionar para Dashboard

- Mudar redirect apos login de `/conversations` para `/dashboard`

**Arquivo:** `src/pages/Login.tsx`

---

## Detalhes Tecnicos

### Conversations.tsx - Mudancas principais
- Adicionar `useEffect` com listener de tecla Escape para `setSelected(null)`
- Estado `mobileContactOpen` para controlar sheet no mobile
- Usar componente `Sheet` (do Radix, ja instalado) para painel de contato no mobile
- Botao de info (icone `User`) no header do chat que abre o painel
- Extrair `ContactPanel` como componente interno reutilizado no desktop (inline) e mobile (Sheet)
- Botoes de acao responsivos: `<span className="hidden sm:inline">ACEITAR</span>` para texto, icones sempre visiveis

### LiveView.tsx - Estrutura
- Mock de 6 atendentes com status variados
- Tabela de atendimentos ativos com 8 registros mock
- Cards de metricas no topo (Atendentes online, Atendimentos em curso, Fila de espera)
- Auto-refresh visual (badge "Ao vivo" pulsando)

### QueryAttendance.tsx - Estrutura
- Filtros: DatePicker (input date simples), Select de atendente, Select de status
- Tabela com colunas: Protocolo, Cliente, Atendente, Departamento, Status, Data/Hora, Duracao
- 10 registros mock
- Paginacao visual

### Channels.tsx - Estrutura
- 4 cards de canais (WhatsApp, Instagram, Telegram, Email)
- Cada card com icone, nome, status, numero/conta vinculada
- Botao de acao (Conectar/Desconectar/Configurar)

### Contacts.tsx - Mock data
- 8 contatos mock com nome, telefone, email, tags, data de criacao
- Tabela com busca funcional (filtra por nome/telefone)
- Dialog de novo contato mantido

### Campaigns.tsx - Mock data
- 5 campanhas mock com nomes, status variados, datas
- Manter estrutura atual, so adicionar dados

### Chatbot.tsx - Mock data
- 4 fluxos mock com nomes, triggers, status ativo/inativo

### Pipeline.tsx - Melhorias
- Mais cards em cada coluna
- Header colorido por coluna
- Badge com contagem

### Arquivos modificados (total):
- `src/pages/Conversations.tsx` - mobile contact panel + Esc + design
- `src/pages/LiveView.tsx` - reescrever completo
- `src/pages/QueryAttendance.tsx` - reescrever completo  
- `src/pages/Channels.tsx` - reescrever completo
- `src/pages/Contacts.tsx` - adicionar mock + redesign
- `src/pages/Campaigns.tsx` - adicionar mock data
- `src/pages/Chatbot.tsx` - adicionar mock data
- `src/pages/Pipeline.tsx` - melhorar design
- `src/pages/WhatsApp.tsx` - melhorar design
- `src/pages/Login.tsx` - corrigir redirect para /dashboard
