"use client";

import TextInput from "@/components/form/TextInput/TextInput";
import { Button } from "flowbite-react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1 className="text-2xl font-bold">Login de Usuário</h1>
      <form method="POST" className="flex max-w-md flex-col gap-4">
        <TextInput
          value={email}
          onChange={setEmail}
          name="email"
          label="Email"
          focus
        />
        <TextInput
          value={password}
          onChange={setPassword}
          name="password"
          label="Senha"
          type="password"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
}

export default Login;
