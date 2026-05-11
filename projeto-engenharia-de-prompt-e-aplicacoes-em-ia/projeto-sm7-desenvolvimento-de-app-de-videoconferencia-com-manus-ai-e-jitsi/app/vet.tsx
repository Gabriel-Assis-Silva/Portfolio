/**
 * Tela do Veterinário
 * Permite inserir o código da sala para entrar na consulta.
 * Exibe histórico das últimas salas acessadas (persistido em AsyncStorage).
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Chave de armazenamento do histórico de salas
const HISTORICO_KEY = "@medvet:historico_salas";
const MAX_HISTORICO = 5;

export default function VetScreen() {
  const router = useRouter();
  const [codigoSala, setCodigoSala] = useState("");
  const [historico, setHistorico] = useState<string[]>([]);

  /**
   * Carrega o histórico de salas do AsyncStorage ao focar na tela
   */
  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  async function carregarHistorico() {
    try {
      const dados = await AsyncStorage.getItem(HISTORICO_KEY);
      if (dados) {
        setHistorico(JSON.parse(dados));
      }
    } catch {
      // Ignora erros de leitura
    }
  }

  /**
   * Salva uma nova sala no histórico, mantendo apenas as últimas MAX_HISTORICO
   */
  async function salvarNoHistorico(sala: string) {
    try {
      const novoHistorico = [
        sala,
        ...historico.filter((s) => s !== sala),
      ].slice(0, MAX_HISTORICO);

      setHistorico(novoHistorico);
      await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(novoHistorico));
    } catch {
      // Ignora erros de escrita
    }
  }

  /**
   * Valida e entra na sala de videochamada
   */
  async function handleEntrarConsulta(sala?: string) {
    const salaAlvo = (sala ?? codigoSala).trim();

    if (!salaAlvo) {
      Alert.alert("Campo obrigatório", "Por favor, insira o código da sala.");
      return;
    }

    await salvarNoHistorico(salaAlvo);

    router.push({
      pathname: "/video-call" as never,
      params: { roomName: salaAlvo },
    });
  }

  /**
   * Limpa o histórico de salas
   */
  async function handleLimparHistorico() {
    Alert.alert(
      "Limpar histórico",
      "Deseja remover todas as salas do histórico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(HISTORICO_KEY);
            setHistorico([]);
          },
        },
      ]
    );
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
          <Text style={styles.headerTitle}>Área do Veterinário</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {/* Seção de entrada */}
          <View style={styles.entrySection}>
            <Text style={styles.sectionIcon}>🩺</Text>
            <Text style={styles.sectionTitle}>Entrar na Consulta</Text>
            <Text style={styles.sectionSubtitle}>
              Insira o código da sala enviado pelo tutor
            </Text>

            {/* Campo de código */}
            <TextInput
              style={styles.codeInput}
              placeholder="Ex: medvet-rex-1714900000000"
              placeholderTextColor="#BDBDBD"
              value={codigoSala}
              onChangeText={setCodigoSala}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={() => handleEntrarConsulta()}
              accessibilityLabel="Código da sala de consulta"
            />

            {/* Botão Entrar */}
            <Pressable
              style={({ pressed }) => [
                styles.enterButton,
                pressed && styles.enterButtonPressed,
              ]}
              onPress={() => handleEntrarConsulta()}
              accessibilityLabel="Entrar na consulta"
              accessibilityRole="button"
            >
              <Text style={styles.enterButtonText}>🎥 Entrar na Consulta</Text>
            </Pressable>
          </View>

          {/* Divisor */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Salas Recentes</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Histórico de salas */}
          {historico.length === 0 ? (
            <View style={styles.emptyHistorico}>
              <Text style={styles.emptyHistoricoIcon}>🕐</Text>
              <Text style={styles.emptyHistoricoText}>
                Nenhuma sala acessada ainda.{"\n"}O histórico aparecerá aqui.
              </Text>
            </View>
          ) : (
            <View style={styles.historicoContainer}>
              <View style={styles.historicoHeader}>
                <Text style={styles.historicoTitle}>Últimas salas acessadas</Text>
                <Pressable
                  onPress={handleLimparHistorico}
                  accessibilityLabel="Limpar histórico de salas"
                >
                  <Text style={styles.limparText}>Limpar</Text>
                </Pressable>
              </View>

              <FlatList
                data={historico}
                keyExtractor={(item, index) => `${item}-${index}`}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      styles.historicoItem,
                      pressed && styles.historicoItemPressed,
                    ]}
                    onPress={() => handleEntrarConsulta(item)}
                    accessibilityLabel={`Entrar na sala ${item}`}
                  >
                    <View style={styles.historicoItemContent}>
                      <Text style={styles.historicoItemIcon}>📋</Text>
                      <Text style={styles.historicoItemText} numberOfLines={1}>
                        {item}
                      </Text>
                    </View>
                    <Text style={styles.historicoItemArrow}>›</Text>
                  </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              />
            </View>
          )}
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  entrySection: {
    alignItems: "center",
    marginBottom: 28,
  },
  sectionIcon: {
    fontSize: 48,
    marginBottom: 12,
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
    marginBottom: 20,
    lineHeight: 20,
  },
  codeInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#212121",
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
    minHeight: 52,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  enterButton: {
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
  enterButtonPressed: {
    backgroundColor: "#388E3C",
    transform: [{ scale: 0.98 }],
  },
  enterButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#BDBDBD",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  emptyHistorico: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyHistoricoIcon: {
    fontSize: 40,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyHistoricoText: {
    fontSize: 14,
    color: "#BDBDBD",
    textAlign: "center",
    lineHeight: 22,
  },
  historicoContainer: {
    flex: 1,
  },
  historicoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historicoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
  },
  limparText: {
    fontSize: 13,
    color: "#F44336",
    fontWeight: "600",
  },
  historicoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  historicoItemPressed: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  historicoItemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  historicoItemIcon: {
    fontSize: 18,
  },
  historicoItemText: {
    flex: 1,
    fontSize: 13,
    color: "#424242",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  historicoItemArrow: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "700",
  },
  itemSeparator: {
    height: 8,
  },
});
