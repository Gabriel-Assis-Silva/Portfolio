/**
 * Tela de Pré-Consulta do Tutor
 * Formulário com nome do tutor, nome e espécie do pet, e descrição dos sintomas.
 * Ao submeter, gera um Room Name único e navega para a tela de sala gerada.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Opções de espécie do pet
const ESPECIES = ["Cão", "Gato", "Ave", "Coelho", "Réptil", "Outro"];

export default function TutorScreen() {
  const router = useRouter();

  // Estado do formulário
  const [nomeTutor, setNomeTutor] = useState("");
  const [nomePet, setNomePet] = useState("");
  const [especieSelecionada, setEspecieSelecionada] = useState("");
  const [sintomas, setSintomas] = useState("");

  /**
   * Gera um Room Name único no formato: medvet-[nome-pet-sanitizado]-[timestamp]
   */
  function gerarRoomName(pet: string): string {
    const petSanitizado = pet
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-z0-9]/g, "-")      // substitui caracteres especiais por hífen
      .replace(/-+/g, "-")             // colapsa hífens consecutivos
      .replace(/^-|-$/g, "");          // remove hífens nas bordas

    const timestamp = Date.now();
    return `medvet-${petSanitizado}-${timestamp}`;
  }

  /**
   * Valida o formulário e inicia a consulta
   */
  function handleIniciarConsulta() {
    if (!nomeTutor.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, informe seu nome.");
      return;
    }
    if (!nomePet.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, informe o nome do seu pet.");
      return;
    }
    if (!especieSelecionada) {
      Alert.alert("Campo obrigatório", "Por favor, selecione a espécie do pet.");
      return;
    }
    if (!sintomas.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, descreva os sintomas do seu pet.");
      return;
    }

    const roomName = gerarRoomName(nomePet);

    // Navega para a tela de sala gerada passando os dados como parâmetros
    router.push({
      pathname: "/room-generated" as never,
      params: {
        roomName,
        nomeTutor: nomeTutor.trim(),
        nomePet: nomePet.trim(),
        especie: especieSelecionada,
        sintomas: sintomas.trim(),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={() => router.back()}
            accessibilityLabel="Voltar"
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Pré-Consulta</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Título da seção */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🐾</Text>
            <Text style={styles.sectionTitle}>Dados da Consulta</Text>
            <Text style={styles.sectionSubtitle}>
              Preencha os dados abaixo para iniciar sua consulta veterinária
            </Text>
          </View>

          {/* Campo: Nome do Tutor */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Seu nome *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Maria Silva"
              placeholderTextColor="#BDBDBD"
              value={nomeTutor}
              onChangeText={setNomeTutor}
              returnKeyType="next"
              autoCapitalize="words"
              accessibilityLabel="Nome do tutor"
            />
          </View>

          {/* Campo: Nome do Pet */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Nome do pet *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Rex, Mimi, Piu..."
              placeholderTextColor="#BDBDBD"
              value={nomePet}
              onChangeText={setNomePet}
              returnKeyType="next"
              autoCapitalize="words"
              accessibilityLabel="Nome do pet"
            />
          </View>

          {/* Seletor: Espécie do Pet */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Espécie do pet *</Text>
            <View style={styles.especiesGrid}>
              {ESPECIES.map((especie) => (
                <Pressable
                  key={especie}
                  style={({ pressed }) => [
                    styles.especieChip,
                    especieSelecionada === especie && styles.especieChipSelected,
                    pressed && styles.especieChipPressed,
                  ]}
                  onPress={() => setEspecieSelecionada(especie)}
                  accessibilityLabel={`Espécie: ${especie}`}
                  accessibilityState={{ selected: especieSelecionada === especie }}
                >
                  <Text
                    style={[
                      styles.especieChipText,
                      especieSelecionada === especie && styles.especieChipTextSelected,
                    ]}
                  >
                    {especie}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Campo: Sintomas */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Descreva o principal sintoma *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Ex: Meu pet está sem apetite há 2 dias, com vômitos e letargia..."
              placeholderTextColor="#BDBDBD"
              value={sintomas}
              onChangeText={setSintomas}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="done"
              accessibilityLabel="Descrição dos sintomas"
            />
          </View>

          {/* Aviso */}
          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>ℹ️</Text>
            <Text style={styles.warningText}>
              Um código de sala será gerado para você compartilhar com o veterinário antes da chamada.
            </Text>
          </View>

          {/* Botão Iniciar Consulta */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
            onPress={handleIniciarConsulta}
            accessibilityLabel="Iniciar consulta por vídeo"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>📹 Iniciar Consulta por Vídeo</Text>
          </Pressable>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
    paddingTop: 24,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 28,
  },
  sectionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#FAFAFA",
    minHeight: 52,
  },
  textArea: {
    minHeight: 110,
    paddingTop: 14,
  },
  especiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  especieChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
  },
  especieChipSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  especieChipPressed: {
    opacity: 0.7,
  },
  especieChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#757575",
  },
  especieChipTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 10,
  },
  warningIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: "#388E3C",
    lineHeight: 18,
  },
  submitButton: {
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
  submitButtonPressed: {
    backgroundColor: "#388E3C",
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  bottomPadding: {
    height: 32,
  },
});
