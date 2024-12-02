"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Paper, Text, Box, Divider, Button } from "@mantine/core";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import HomeContent from "../components/HomeContent";
import ProfileContent from "../components/ProfileContent";
import SettingsContent from "../components/SettingsContent";
import Cookies from "../components/Cookies";

const ImprovedUserDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await localStorage.getItem("auth_token");
      const storedUser = await localStorage.getItem("user");

      if (!token) {
        router.push("/login");
      } else {
        console.log(token, storedUser);
        setUser({
          name: storedUser?.name || "Administrador",
          email: storedUser?.email || "admin@exemplo.com",
        });
      }
    };

    fetchUserData();
  }, [router]);

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomeContent />;
      case "cookies":
        return <Cookies />;
      case "profile":
        return <ProfileContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={3}>
        <Paper
          padding="md"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f9fafb",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              padding: "10px 20px",
            }}
          >
            <Text size="xl" weight={500}>
              Menu
            </Text>
          </Box>

          <Button
            leftIcon={<IconHome />}
            fullWidth
            variant="light"
            onClick={() => setCurrentPage("home")}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: 500,
              padding: "12px 20px",
            }}
          >
            Home
          </Button>
          <Button
            leftIcon={<IconUser />}
            fullWidth
            variant="light"
            onClick={() => setCurrentPage("profile")}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: 500,
              padding: "12px 20px",
            }}
          >
            Perfil
          </Button>
          <Button
            leftIcon={<IconUser />}
            fullWidth
            variant="light"
            onClick={() => setCurrentPage("cookies")}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: 500,
              padding: "12px 20px",
            }}
          >
            Cookies
          </Button>
          {/* <Button
            leftIcon={<IconSettings />}
            fullWidth
            variant="light"
            onClick={() => setCurrentPage("settings")}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: 500,
              padding: "12px 20px",
            }}
          >
            Configurações
          </Button> */}
          <Divider my="sm" />
          <Button
            leftIcon={<IconLogout />}
            fullWidth
            variant="light"
            color="red"
            onClick={() => router.push("/")}
            style={{
              backgroundColor: "#fef2f2",
              color: "#e11d48",
              fontWeight: 500,
              padding: "12px 20px",
            }}
          >
            Sair
          </Button>
        </Paper>
      </Grid.Col>

      <Grid.Col span={9}>
        <Paper
          padding="md"
          style={{
            height: "100%",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Text size="xl" weight={500}>
              Bem-vindo, {user?.name}!
            </Text>
            <Text size="sm" color="gray">
              Email: {user?.email}
            </Text>
          </Box>

          {renderContent()}
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default ImprovedUserDashboard;
