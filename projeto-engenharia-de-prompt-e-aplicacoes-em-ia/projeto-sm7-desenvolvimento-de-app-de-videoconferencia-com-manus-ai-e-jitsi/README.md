# Projeto SM7 - MedVet Connect
> Plataforma de telemedicina veterinária com videochamada em tempo real.

## 📝 Descrição do Projeto
Implementei o **MedVet Connect** para conectar tutores e veterinários por videochamada, reduzindo tempo de triagem em cenários remotos ou de baixa mobilidade.

No desenho da solução, priorizei fluxo mobile-first, geração automática de sala e integração com **Jitsi Meet** para garantir entrada rápida na consulta.

## 🧰 Tecnologias Utilizadas
![React_Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Jitsi](https://img.shields.io/badge/Jitsi_Meet-97979A?style=for-the-badge&logo=jitsi&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-2E7D32?style=for-the-badge)

- **Stack principal:** Expo Router + React Native + TypeScript
- **Comunicação síncrona:** Jitsi Meet via WebView
- **Persistência local:** histórico de salas com AsyncStorage

## 📊 Resultados e Aprendizados
- **Fluxos implementados:** tutor, veterinário, geração de sala e chamada por vídeo.
- **Decisão técnica:** encapsulei a videochamada com WebView para reduzir complexidade de setup de RTC nativo.
- **Aprendizado analítico:** a combinação de onboarding direto e sala compartilhável melhora aderência do usuário em cenários de urgência.

## 🖼️ Evidência Visual
```mermaid
flowchart LR
  A[Tutor preenche pré-consulta] --> B[Geração automática da sala]
  B --> C[Compartilhamento do código]
  C --> D[Veterinário entra na chamada]
```
*Figura 1: Fluxo operacional do MedVet Connect.*

## ▶️ Como Executar
### Pré-requisitos
- Node.js 18+
- pnpm instalado
- Expo CLI

### Passos
1. Clone o repositório e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/Gabriel-Assis-Silva/portfolio-gabriel-de-assis-silva.git
   cd portfolio-gabriel-de-assis-silva/projeto-engenharia-de-prompt-e-aplicacoes-em-ia/projeto-sm7-desenvolvimento-de-app-de-videoconferencia-com-manus-ai-e-jitsi
   ```
2. Instale dependências:
   ```bash
   pnpm install
   ```
3. Rode em desenvolvimento:
   ```bash
   pnpm dev
   ```

### Troubleshooting
- Se `pnpm` não estiver disponível, instale via `npm i -g pnpm`.
- Se a WebView falhar em dispositivo físico, valide conectividade de rede e permissões do app.

---
<a href="https://github.com/Gabriel-Assis-Silva/portfolio-gabriel-de-assis-silva">Voltar ao início</a>
