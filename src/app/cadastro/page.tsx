"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Group,
} from "@mantine/core";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Erro ao registrar usuário");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  return (
    <Box maw={400} mx="auto">
      <Title order={2} align="center" mb="md">
        Criar Conta
      </Title>
      <TextInput
        label="Nome"
        placeholder="Seu nome"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
        mb="sm"
      />
      <TextInput
        label="Email"
        placeholder="seu@email.com"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required
        mb="sm"
      />
      <PasswordInput
        label="Senha"
        placeholder="Sua senha segura"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
        mb="sm"
      />
      <Group position="center" mt="md">
        <Button onClick={handleSignUp}>Cadastrar</Button>
      </Group>
    </Box>
  );
}
