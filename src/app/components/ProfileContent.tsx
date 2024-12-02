import { Text, Box } from "@mantine/core";

const ProfileContent = () => {
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
        Bem-vindo ao seu Perfil!
      </Text>
    </Box>
  );
};

export default ProfileContent;
