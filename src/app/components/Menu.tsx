import { Button, Divider } from "@mantine/core";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter();

  return (
    <>
      <Button
        leftIcon={<IconHome />}
        fullWidth
        variant="light"
        onClick={() => router.push("/home")}
      >
        Home
      </Button>
      <Button
        leftIcon={<IconUser />}
        fullWidth
        variant="light"
        onClick={() => router.push("/home")}
      >
        Perfil
      </Button>
      {/* <Button
        leftIcon={<IconSettings />}
        fullWidth
        variant="light"
        onClick={() => router.push("/home")}
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
      >
        Sair
      </Button>
    </>
  );
};

export default Menu;
