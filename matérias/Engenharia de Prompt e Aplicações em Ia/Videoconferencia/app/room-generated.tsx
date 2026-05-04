/**
 * Tela de Sala Gerada
 * Exibe o Room Name gerado para o tutor copiar e compartilhar com o veterinário.
 * Oferece botão para copiar o código e botão para entrar na videochamada.
 */
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomGeneratedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    roomName: string;
    nomeTutor: string;
    nomePet: string;
    especie: string;
    sintomas: string;
  }>();

  const [copiado, setCopiado] = useState(false);

  const { roomName, nomeTutor, nomePet, especie } = params;

  /**
   * Copia o código da sala para a área de transferência
   */
  async function handleCopiarCodigo() {
    try {
      await Clipboard.setStringAsync(roomName ?? "");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch {
      Alert.alert("Erro", "Não foi possível copiar o código. Copie manualmente.");
    }
  }

  /**
   * Navega para a tela de videochamada com o Jitsi Meet
   */
  function handleEntrarVideochamada() {
    router.push({
      pathname: "/video-call" as never,
      params: { roomName },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Sala Criada!</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Ícone de sucesso */}
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>✅</Text>
        </View>

        <Text style={styles.successTitle}>Consulta Agendada!</Text>
        <Text style={styles.successSubtitle}>
          Sua sala de videochamada foi criada com sucesso.
        </Text>

        {/* Resumo da consulta */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da Consulta</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tutor:</Text>
            <Text style={styles.summaryValue}>{nomeTutor}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pet:</Text>
            <Text style={styles.summaryValue}>
              {nomePet} ({especie})
            </Text>
          </View>
        </View>

        {/* Código da sala */}
        <View style={styles.roomCodeSection}>
          <Text style={styles.roomCodeLabel}>Código da Sala</Text>
          <Text style={styles.roomCodeHint}>
            Compartilhe este código com o veterinário
          </Text>

          <View style={styles.roomCodeBox}>
            <Text style={styles.roomCodeText} selectable>
              {roomName}
            </Text>
          </View>

          {/* Botão Copiar */}
          <Pressable
            style={({ pressed }) => [
              styles.copyButton,
              copiado && styles.copyButtonSuccess,
              pressed && styles.copyButtonPressed,
            ]}
            onPress={handleCopiarCodigo}
            accessibilityLabel={copiado ? "Código copiado" : "Copiar código da sala"}
          >
            <Text style={styles.copyButtonText}>
              {copiado ? "✓ Código Copiado!" : "📋 Copiar Código"}
            </Text>
          </Pressable>
        </View>

        {/* Instrução */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionIcon}>📱</Text>
          <View style={styles.instructionTextContainer}>
            <Text style={styles.instructionTitle}>Como funciona?</Text>
            <Text style={styles.instructionText}>
              1. Copie o código acima{"\n"}
              2. Envie para o veterinário (WhatsApp, SMS, etc.){"\n"}
              3. Clique em "Entrar na Videochamada"{"\n"}
              4. O veterinário entrará com o mesmo código
            </Text>
          </View>
        </View>

        {/* Botão Entrar na Videochamada */}
        <Pressable
          style={({ pressed }) => [
            styles.videoButton,
            pressed && styles.videoButtonPressed,
          ]}
          onPress={handleEntrarVideochamada}
          accessibilityLabel="Entrar na videochamada"
          accessibilityRole="button"
        >
          <Text style={styles.videoButtonText}>📹 Entrar na Videochamada</Text>
        </Pressable>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 16,
  },
  successEmoji: {
    fontSize: 64,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 15,
    color: "#757575",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#424242",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#757575",
    fontWeight: "600",
    width: 60,
  },
  summaryValue: {
    fontSize: 14,
    color: "#212121",
    fontWeight: "500",
    flex: 1,
  },
  roomCodeSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  roomCodeLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 4,
  },
  roomCodeHint: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 16,
  },
  roomCodeBox: {
    width: "100%",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  roomCodeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E7D32",
    fontFamily: "monospace",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  copyButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: "#4CAF50",
    minWidth: 200,
    alignItems: "center",
  },
  copyButtonSuccess: {
    backgroundColor: "#E8F5E9",
    borderColor: "#388E3C",
  },
  copyButtonPressed: {
    opacity: 0.7,
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4CAF50",
  },
  instructionBox: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
    gap: 12,
  },
  instructionIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F57F17",
    marginBottom: 6,
  },
  instructionText: {
    fontSize: 13,
    color: "#795548",
    lineHeight: 22,
  },
  videoButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    minHeight: 60,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  videoButtonPressed: {
    backgroundColor: "#388E3C",
    transform: [{ scale: 0.98 }],
  },
  videoButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  bottomPadding: {
    height: 32,
  },
});
