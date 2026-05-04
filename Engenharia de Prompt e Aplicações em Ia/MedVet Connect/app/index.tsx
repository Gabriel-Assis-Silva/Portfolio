/**
 * Tela de Splash / Boas-vindas do MedVet Connect
 * Apresenta o logo, nome do app e dois botões de seleção de perfil:
 * "Sou Tutor" e "Sou Veterinário"
 */
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Área do logo e título */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appName}>MedVet Connect</Text>
        <Text style={styles.tagline}>Telemedicina Veterinária</Text>
        <Text style={styles.subtitle}>
          Conecte-se ao seu veterinário de qualquer lugar, a qualquer hora.
        </Text>
      </View>

      {/* Área dos botões de seleção de perfil */}
      <View style={styles.buttonsSection}>
        <Text style={styles.sectionLabel}>Como você quer entrar?</Text>

        {/* Botão Tutor */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={() => router.push("/tutor")}
          accessibilityLabel="Entrar como tutor de animal"
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonIcon}>🐾</Text>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.primaryButtonText}>Sou Tutor</Text>
            <Text style={styles.primaryButtonSubtext}>
              Consultar meu pet com um veterinário
            </Text>
          </View>
        </Pressable>

        {/* Botão Veterinário */}
        <Pressable
          style={({ pressed }) => [
            styles.outlineButton,
            pressed && styles.outlineButtonPressed,
          ]}
          onPress={() => router.push("/vet" as never)}
          accessibilityLabel="Entrar como veterinário"
          accessibilityRole="button"
        >
          <Text style={styles.outlineButtonIcon}>🩺</Text>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.outlineButtonText}>Sou Veterinário</Text>
            <Text style={styles.outlineButtonSubtext}>
              Atender pacientes por videochamada
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Consultas rápidas e seguras para o seu pet 🐶🐱
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    width: 90,
    height: 90,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#212121",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
  buttonsSection: {
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#757575",
    textAlign: "center",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    minHeight: 72,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonPressed: {
    backgroundColor: "#388E3C",
    transform: [{ scale: 0.98 }],
  },
  primaryButtonIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  buttonTextContainer: {
    flex: 1,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  primaryButtonSubtext: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 16,
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    minHeight: 72,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  outlineButtonPressed: {
    backgroundColor: "#F1F8E9",
    transform: [{ scale: 0.98 }],
  },
  outlineButtonIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  outlineButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4CAF50",
    marginBottom: 2,
  },
  outlineButtonSubtext: {
    fontSize: 12,
    color: "#757575",
    lineHeight: 16,
  },
  footer: {
    paddingBottom: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#BDBDBD",
    textAlign: "center",
  },
});
