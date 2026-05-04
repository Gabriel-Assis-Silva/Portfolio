# 🐾 MedVet Connect

> **Plataforma de Telemedicina Veterinária** — Conecte tutores de animais a veterinários por videochamada, de qualquer lugar, a qualquer hora.

---

## Proposta de Valor

Tutores de animais em áreas remotas, com mobilidade reduzida ou em situações de urgência frequentemente enfrentam dificuldades para levar seus pets ao veterinário para consultas rápidas de avaliação. O **MedVet Connect** resolve esse problema ao oferecer uma plataforma de telemedicina veterinária que permite triagem visual por vídeo em tempo real.

O fluxo é simples: o tutor descreve os sintomas do pet em um formulário de pré-consulta, um código de sala único é gerado automaticamente, e a videochamada é iniciada via **Jitsi Meet** — sem necessidade de cadastro, sem instalação adicional, direto do smartphone.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React Native (Expo) | SDK 54 | Framework mobile multiplataforma |
| Expo Router | 6.x | Navegação baseada em arquivos |
| NativeWind (Tailwind CSS) | 4.x | Estilização com classes utilitárias |
| TypeScript | 5.9 | Tipagem estática e segurança de código |
| Jitsi Meet (WebView) | meet.jit.si | Motor de videochamada gratuito e open-source |
| AsyncStorage | 2.x | Persistência local do histórico de salas |
| expo-clipboard | latest | Cópia do código de sala para área de transferência |
| react-native-webview | latest | Renderização do Jitsi Meet no app |
| Manus AI | — | Geração e estruturação do código-fonte |

---

## Instruções de Instalação

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18 ou superior
- **pnpm** (gerenciador de pacotes): `npm install -g pnpm`
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (para emulador Android) ou **Xcode** (para simulador iOS)
- **Expo Go** instalado no smartphone físico (opcional, para teste rápido)

### Passo a Passo

**1. Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/medvet-connect.git
cd medvet-connect
```

**2. Instale as dependências:**

```bash
pnpm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
# Para iniciar no modo web (preview no navegador)
pnpm dev

# Para iniciar no Android (emulador ou dispositivo físico)
pnpm android

# Para iniciar no iOS (apenas macOS)
pnpm ios
```

**4. Escaneie o QR Code** exibido no terminal com o aplicativo **Expo Go** no seu smartphone para testar no dispositivo físico.

### Build para Produção (APK Android)

Para gerar um APK de produção, utilize o **EAS Build** da Expo:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Fazer login na conta Expo
eas login

# Configurar o projeto
eas build:configure

# Gerar APK para Android
eas build --platform android --profile preview
```

---

## Como Usar

### Fluxo do Tutor

O tutor é o responsável pelo animal que precisa de atendimento veterinário. O fluxo completo é:

1. **Tela de Boas-vindas:** Ao abrir o app, toque no botão **"Sou Tutor"**.
2. **Formulário de Pré-Consulta:** Preencha seu nome, o nome e a espécie do pet, e descreva o principal sintoma observado.
3. **Iniciar Consulta:** Toque em **"Iniciar Consulta por Vídeo"** — o app gerará automaticamente um código de sala único no formato `medvet-[nome-pet]-[timestamp]`.
4. **Compartilhar o Código:** Na tela "Sala Criada", copie o código gerado e envie ao veterinário via WhatsApp, SMS ou qualquer outro canal de comunicação.
5. **Entrar na Videochamada:** Toque em **"Entrar na Videochamada"** para iniciar a chamada pelo Jitsi Meet.

### Fluxo do Veterinário

O veterinário recebe o código de sala do tutor e entra diretamente na consulta:

1. **Tela de Boas-vindas:** Ao abrir o app, toque no botão **"Sou Veterinário"**.
2. **Área do Veterinário:** Insira o código de sala recebido do tutor no campo de texto.
3. **Histórico de Salas:** As últimas 5 salas acessadas ficam salvas automaticamente para acesso rápido.
4. **Entrar na Consulta:** Toque em **"Entrar na Consulta"** para iniciar a videochamada pelo Jitsi Meet.

---

## Estrutura do Projeto

```
medvet-connect/
├── app/
│   ├── _layout.tsx          ← Layout raiz com providers e Stack Navigator
│   ├── index.tsx            ← Tela Splash / Boas-vindas
│   ├── tutor.tsx            ← Formulário de Pré-Consulta (Tutor)
│   ├── room-generated.tsx   ← Exibição do código de sala gerado
│   ├── vet.tsx              ← Área do Veterinário (entrada por código)
│   ├── video-call.tsx       ← Videochamada via Jitsi Meet (WebView)
│   └── (tabs)/
│       ├── _layout.tsx      ← Layout das tabs (oculto)
│       └── index.tsx        ← Redirecionamento para tela principal
├── assets/
│   └── images/
│       ├── icon.png         ← Ícone do app (pata + câmera médica)
│       └── splash-icon.png  ← Tela de splash
├── theme.config.js          ← Paleta de cores (Verde #4CAF50)
├── app.config.ts            ← Configuração do Expo
├── design.md                ← Plano de design de interface
├── todo.md                  ← Rastreamento de funcionalidades
└── README.md                ← Este arquivo
```

---

## Funcionalidades Implementadas

| Funcionalidade | Status | Descrição |
|---|---|---|
| Tela Splash / Boas-vindas | ✅ Implementado | Logo, nome, botões de seleção de perfil |
| Formulário Pré-Consulta | ✅ Implementado | Nome, pet, espécie, sintomas |
| Geração de Room Name | ✅ Implementado | Formato `medvet-[pet]-[timestamp]` |
| Tela Sala Gerada | ✅ Implementado | Exibição e cópia do código |
| Área do Veterinário | ✅ Implementado | Campo de código + histórico |
| Histórico de Salas | ✅ Implementado | Persistência via AsyncStorage |
| Videochamada Jitsi | ✅ Implementado | WebView com meet.jit.si |
| Paleta Verde (#4CAF50) | ✅ Implementado | Tema visual completo |
| Botões grandes (≥56dp) | ✅ Implementado | Acessibilidade mobile |

---

## Preview

O aplicativo pode ser acessado via preview web ou escaneando o QR Code com o **Expo Go**:

| Plataforma | Link |
|---|---|
| Preview Web | [Acessar Preview](https://8081-i0p8r1t8ki243uj0avhy6-7f7ef862.us2.manus.computer) |
| QR Code (Expo Go) | Escaneie com o app Expo Go no smartphone |

> **Nota:** O preview web exibe o fallback da videochamada com link direto para o Jitsi Meet. No dispositivo móvel (via Expo Go), a WebView abre a videochamada diretamente no app.

---

## Capturas de Tela

| Tela de Boas-vindas | Pré-Consulta (Tutor) | Sala Gerada | Área do Veterinário |
|---|---|---|---|
| Logo + botões de perfil | Formulário completo | Código + instruções | Campo de código + histórico |

---

## Configuração do Jitsi Meet

A videochamada é configurada com as seguintes opções para uma experiência focada e profissional:

```javascript
// Opções configuradas via URL do Jitsi Meet
{
  startWithAudioMuted: false,    // Microfone ativo ao entrar
  startWithVideoMuted: false,    // Câmera ativa ao entrar
  welcomePageEnabled: false,     // Sem página de boas-vindas
  // Botões de toolbar personalizados (sem convite, gravação ou calendário)
  TOOLBAR_BUTTONS: [
    "microphone", "camera", "hangup", "chat",
    "settings", "raisehand", "videoquality", "tileview"
  ]
}
```

---

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto está licenciado sob a **MIT License** — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Créditos

Desenvolvido com ❤️ para o bem-estar animal.

- **Plataforma de IA:** [Manus AI](https://manus.im) — geração e estruturação do código-fonte
- **Videochamada:** [Jitsi Meet](https://meet.jit.si) — motor de videoconferência open-source
- **Framework Mobile:** [Expo](https://expo.dev) — plataforma React Native
