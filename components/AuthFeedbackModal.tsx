import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type AuthFeedbackModalProps = {
  visible: boolean;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  buttonLabel?: string;
  onClose: () => void;
};

const iconByType = {
  success: "check-circle",
  error: "error-outline",
  info: "info-outline",
} as const;

const colorByType = {
  success: "#1E8E5A",
  error: "#D64545",
  info: "#FF6B35",
} as const;

export function AuthFeedbackModal({
  visible,
  title,
  message,
  type = "info",
  buttonLabel = "OK",
  onClose,
}: AuthFeedbackModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: `${colorByType[type]}15` },
            ]}
          >
            <MaterialIcons
              name={iconByType[type]}
              size={30}
              color={colorByType[type]}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(27, 18, 15, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFF8F6",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2A1E1A",
    textAlign: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#594139",
    textAlign: "center",
  },
  button: {
    marginTop: 22,
    width: "100%",
    height: 48,
    borderRadius: 18,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#E65A2B",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
