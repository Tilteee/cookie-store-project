"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Card,
  Image,
  Group,
  Button,
  Modal,
  TextInput,
  NumberInput,
  Stack,
} from "@mantine/core";

interface Cookie {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const Cookies = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [opened, setOpened] = useState(false); // Estado para controlar a visibilidade do modal
  const [newCookie, setNewCookie] = useState<Cookie>({
    id: 0,
    name: "",
    price: 0,
    imageUrl: "",
  });
  const [isEditMode, setIsEditMode] = useState(false); // Estado para saber se o modal está em modo de edição

  // Buscar cookies cadastrados
  const fetchCookies = async () => {
    const res = await fetch("/api/cookies");
    const data = await res.json();
    setCookies(data);
  };

  // Adicionar um novo cookie
  const addCookie = async () => {
    const res = await fetch("/api/cookies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCookie.name,
        price: newCookie.price,
        imageUrl: newCookie.imageUrl,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setCookies((prevCookies) => [...prevCookies, data]);
      setOpened(false); // Fechar o modal
      setNewCookie({ id: 0, name: "", price: 0, imageUrl: "" }); // Limpar o estado do cookie
    } else {
      alert("Erro ao adicionar o cookie.");
    }
  };

  const updateCookie = async () => {
    const res = await fetch(`/api/cookies`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newCookie.id,
        name: newCookie.name,
        price: newCookie.price,
        imageUrl: newCookie.imageUrl,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setCookies((prevCookies) =>
        prevCookies.map((cookie) => (cookie.id === data.id ? data : cookie))
      );
      setOpened(false);
      setNewCookie({ id: 0, name: "", price: 0, imageUrl: "" });
      setIsEditMode(false);
    } else {
      alert("Erro ao editar o cookie.");
    }
  };

  const openEditModal = (cookie: Cookie) => {
    setNewCookie(cookie);
    setIsEditMode(true);
    setOpened(true);
  };

  useEffect(() => {
    fetchCookies();
  }, []);

  return (
    <Box
      style={{
        textAlign: "center",
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Text size="lg" color="#6b7280" mb="lg">
        Bem-vindo ao seu Perfil!
      </Text>

      {/* Lista de Cookies */}
      <Group position="center" spacing="xl" wrap="wrap">
        {cookies.length === 0 ? (
          <Text>Não há cookies cadastrados ainda.</Text>
        ) : (
          cookies.map((cookie) => (
            <Card
              key={cookie.id}
              shadow="sm"
              padding="lg"
              style={{ width: 300 }}
            >
              <Card.Section>
                <Image src={cookie.imageUrl} height={160} alt={cookie.name} />
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{cookie.name}</Text>
                <Text weight={700} color="blue">
                  R$ {cookie.price.toFixed(2)}
                </Text>
              </Group>
              <Button variant="light" color="blue" fullWidth>
                Comprar
              </Button>
              {/* Botão para editar o cookie */}
              <Button
                variant="outline"
                color="green"
                fullWidth
                mt="sm"
                onClick={() => openEditModal(cookie)}
              >
                Editar
              </Button>
            </Card>
          ))
        )}
      </Group>

      {/* Botão para abrir o modal para adicionar novo cookie */}
      <Button onClick={() => setOpened(true)} mt="xl">
        Adicionar Novo Cookie
      </Button>

      {/* Modal para adicionar ou editar um cookie */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={isEditMode ? "Editar Cookie" : "Adicionar Novo Cookie"}
        size="lg"
      >
        <Stack spacing="md">
          <TextInput
            label="Nome"
            placeholder="Nome do cookie"
            value={newCookie.name}
            onChange={(e) =>
              setNewCookie({ ...newCookie, name: e.target.value })
            }
          />
          <NumberInput
            label="Preço"
            value={newCookie.price}
            onChange={(value) => setNewCookie({ ...newCookie, price: value })}
            min={0}
            step={0.1}
            precision={2}
          />
          <TextInput
            label="URL da Imagem"
            placeholder="URL da imagem do cookie"
            value={newCookie.imageUrl}
            onChange={(e) =>
              setNewCookie({ ...newCookie, imageUrl: e.target.value })
            }
          />
          <Button onClick={isEditMode ? updateCookie : addCookie} fullWidth>
            {isEditMode ? "Atualizar Cookie" : "Adicionar Cookie"}
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
};

export default Cookies;
