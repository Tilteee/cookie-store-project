import { Text, Box } from "@mantine/core";

const HomeContent = () => {
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
        Bem-vindo à Home!
      </Text>
    </Box>
  );
};

export default HomeContent;
