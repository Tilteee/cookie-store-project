"use client";
import { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Stack,
} from "@mantine/core";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    return /^\S+@\S+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Email inválido");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("response", response.ok);
      const data = await response.json();
      console.log("data", data);
      if (await response.ok) {
        const { token, user } = data.token;
        console.log(token);
        await localStorage.setItem("auth_token", token);
        await localStorage.setItem("user", user);

        window.location.href = "/home";
      } else {
        setError(data.message || "Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Bem-vindo de volta!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Não tem uma conta?{" "}
        <Anchor size="sm" href="/cadastro">
          Criar conta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {error && (
              <Text c="red" ta="center">
                {error}
              </Text>
            )}

            <TextInput
              label="Email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={
                email && !validateEmail(email) ? "Email inválido" : undefined
              }
            />

            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password.length > 0 && password.length < 6
                  ? "Senha deve ter no mínimo 6 caracteres"
                  : undefined
              }
            />

            <Anchor c="dimmed" size="sm" ta="right" href="/recuperar-senha">
              Esqueceu a senha?
            </Anchor>

            <Button type="submit" fullWidth loading={isLoading}>
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
