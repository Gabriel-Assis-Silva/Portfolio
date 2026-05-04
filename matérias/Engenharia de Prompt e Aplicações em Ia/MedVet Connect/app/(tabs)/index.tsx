/**
 * Tab Home — redireciona para a tela principal do MedVet Connect
 * A tela de boas-vindas (Splash) é a entrada principal do app.
 */
import { Redirect } from "expo-router";

export default function HomeTab() {
  // Redireciona diretamente para a tela de boas-vindas
  return <Redirect href="/" />;
}
