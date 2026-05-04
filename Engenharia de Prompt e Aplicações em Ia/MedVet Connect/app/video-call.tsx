/**
 * Tela de Videochamada
 * Integra o Jitsi Meet via WebView para realizar a videochamada veterinária.
 * O Room Name é recebido como parâmetro de navegação.
 */
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function VideoCallScreen() {
  const router = useRouter();
  const { roomName } = useLocalSearchParams<{ roomName: string }>();
  const webViewRef = useRef<WebView>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  // Constrói a URL do Jitsi Meet com configurações personalizadas
  const jitsiUrl = buildJitsiUrl(roomName ?? "medvet-sala-padrao");

  /**
   * Constrói a URL do Jitsi Meet com as opções configuradas conforme especificação
   */
  function buildJitsiUrl(room: string): string {
    // Configurações via URL hash (Jitsi Meet aceita config via hash)
    const config = encodeURIComponent(
      JSON.stringify({
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableAddingBackgroundImages: true,
        welcomePageEnabled: false,
      })
    );

    const interfaceConfig = encodeURIComponent(
      JSON.stringify({
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          "chat",
          "settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          "tileview",
          "help",
          "mute-everyone",
          "security",
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: "",
        SHOW_POWERED_BY: false,
        DISPLAY_WELCOME_FOOTER: false,
        MOBILE_APP_PROMO: false,
      })
    );

    return `https://meet.jit.si/${encodeURIComponent(room)}#config=${config}&interfaceConfig=${interfaceConfig}`;
  }

  /**
   * Confirma o encerramento da chamada
   */
  function handleEncerrar() {
    Alert.alert(
      "Encerrar Chamada",
      "Deseja encerrar a videochamada?",
      [
        { text: "Continuar", style: "cancel" },
        {
          text: "Encerrar",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  }

  // Fallback para Web — exibe link direto
  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webFallback}>
          <Text style={styles.webFallbackIcon}>📹</Text>
          <Text style={styles.webFallbackTitle}>Videochamada</Text>
          <Text style={styles.webFallbackText}>
            Sala: {roomName}
          </Text>
          <Text style={styles.webFallbackSubtext}>
            No dispositivo móvel, a videochamada abre automaticamente.{"\n"}
            No navegador, acesse o link abaixo:
          </Text>
          <Text style={styles.webFallbackLink} selectable>
            https://meet.jit.si/{roomName}
          </Text>
          <Pressable
            style={styles.backButtonWeb}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonWebText}>← Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header flutuante */}
      <SafeAreaView style={styles.headerOverlay} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.roomInfo}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </View>
          <Text style={styles.roomName} numberOfLines={1}>
            {roomName}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.hangupButton,
              pressed && styles.hangupButtonPressed,
            ]}
            onPress={handleEncerrar}
            accessibilityLabel="Encerrar chamada"
          >
            <Text style={styles.hangupButtonText}>✕ Sair</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* WebView com Jitsi Meet */}
      {!erro ? (
        <WebView
          ref={webViewRef}
          source={{ uri: jitsiUrl }}
          style={styles.webView}
          onLoadStart={() => setCarregando(true)}
          onLoadEnd={() => setCarregando(false)}
          onError={() => {
            setCarregando(false);
            setErro(true);
          }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          startInLoadingState={false}
          mixedContentMode="compatibility"
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Erro de Conexão</Text>
          <Text style={styles.errorText}>
            Não foi possível carregar a videochamada.{"\n"}
            Verifique sua conexão com a internet.
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              setErro(false);
              setCarregando(true);
            }}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </Pressable>
        </View>
      )}

      {/* Indicador de carregamento */}
      {carregando && !erro && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Conectando à sala...</Text>
            <Text style={styles.loadingSubtext}>{roomName}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    gap: 10,
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F44336",
  },
  liveText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#F44336",
    letterSpacing: 1,
  },
  roomName: {
    flex: 1,
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  hangupButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  hangupButtonPressed: {
    backgroundColor: "#C62828",
    transform: [{ scale: 0.97 }],
  },
  hangupButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    minWidth: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginTop: 16,
    marginBottom: 6,
  },
  loadingSubtext: {
    fontSize: 12,
    color: "#757575",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },
  errorIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  // Fallback para Web
  webFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },
  webFallbackIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  webFallbackTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 8,
  },
  webFallbackText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "monospace",
  },
  webFallbackSubtext: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  webFallbackLink: {
    fontSize: 13,
    color: "#1565C0",
    textDecorationLine: "underline",
    fontFamily: "monospace",
    marginBottom: 32,
    textAlign: "center",
  },
  backButtonWeb: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  backButtonWebText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
