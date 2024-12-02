import { Text, Box } from "@mantine/core";

const SettingsContent = () => {
  return (
    <Box
      style={{
        textAlign: "center",
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text size="lg" color="#6b7280">
        Configurações da conta
      </Text>
    </Box>
  );
};

export default SettingsContent;
