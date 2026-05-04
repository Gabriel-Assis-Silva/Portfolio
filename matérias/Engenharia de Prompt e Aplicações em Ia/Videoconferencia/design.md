# MedVet Connect — Plano de Design de Interface

## Identidade Visual

- **Paleta de cores principal:** Verde (#4CAF50), Branco (#FFFFFF), Cinza claro (#F5F5F5)
- **Cor de destaque:** Verde escuro (#388E3C) para estados pressionados
- **Cor de texto:** Cinza escuro (#212121) para títulos, (#757575) para subtítulos
- **Fonte:** Roboto (padrão Android/iOS)
- **Estilo:** Limpo, moderno, acolhedor — transmite confiança e cuidado com animais

## Lista de Telas

| Tela | Arquivo | Descrição |
|------|---------|-----------|
| Splash / Boas-vindas | `app/index.tsx` | Logo, nome do app, botões "Sou Tutor" e "Sou Veterinário" |
| Pré-Consulta (Tutor) | `app/tutor.tsx` | Formulário com nome do tutor, nome/espécie do pet, sintomas |
| Sala Gerada | `app/room-generated.tsx` | Exibe o código da sala gerado para o tutor compartilhar |
| Entrada Veterinário | `app/vet.tsx` | Campo de código da sala + histórico de salas recentes |
| Videochamada | `app/video-call.tsx` | WebView com Jitsi Meet integrado |

## Conteúdo e Funcionalidade por Tela

### Tela Splash / Boas-vindas
- Logo animado com ícone de pata de animal
- Nome "MedVet Connect" em destaque
- Subtítulo: "Telemedicina Veterinária"
- Dois botões grandes e arredondados (mínimo 56dp):
  - "Sou Tutor" (verde primário)
  - "Sou Veterinário" (verde outline)

### Tela Pré-Consulta (Tutor)
- Header com botão voltar
- Campo: Nome do Tutor
- Campo: Nome do Pet
- Seletor: Espécie do pet (Cão, Gato, Ave, Coelho, Réptil, Outro)
- Campo de texto longo: "Descreva o principal sintoma"
- Botão "Iniciar Consulta por Vídeo" (verde primário, 56dp)

### Tela Sala Gerada
- Exibe o Room Name gerado no formato `medvet-[nome-pet]-[timestamp]`
- Instrução: "Compartilhe este código com seu veterinário"
- Botão "Copiar Código"
- Botão "Entrar na Videochamada" (verde primário)

### Tela Veterinário
- Header com botão voltar
- Campo para inserir código da sala
- Lista das últimas salas acessadas (AsyncStorage)
- Botão "Entrar na Consulta" (verde primário, 56dp)

### Tela Videochamada
- WebView abrindo meet.jit.si com o room name
- Botão de encerrar chamada

## Fluxos Principais

### Fluxo do Tutor
1. Tela Splash → toca "Sou Tutor"
2. Tela Pré-Consulta → preenche dados do pet e sintomas
3. Toca "Iniciar Consulta por Vídeo"
4. Tela Sala Gerada → copia o código e compartilha com o vet
5. Toca "Entrar na Videochamada" → Tela de Videochamada (Jitsi via WebView)

### Fluxo do Veterinário
1. Tela Splash → toca "Sou Veterinário"
2. Tela Veterinário → insere o código da sala recebido do tutor
3. Toca "Entrar na Consulta" → Tela de Videochamada (Jitsi via WebView)

## Componentes Reutilizáveis

- `PrimaryButton` — Botão verde arredondado com 56dp de altura
- `OutlineButton` — Botão com borda verde e fundo transparente
- `InputField` — Campo de texto estilizado com borda verde
- `PawIcon` — Ícone de pata de animal (SVG)
- `SectionTitle` — Título de seção com estilo consistente
