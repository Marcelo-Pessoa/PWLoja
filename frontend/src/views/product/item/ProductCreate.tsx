"use client";

import TextInput from "@/components/form/TextInput/TextInput";
import NumberInput from "@/components/form/NumberInput/NumberInput";
import Textarea from "@/components/form/Textarea/Textarea";
import { CreateProductDto } from "../Product.types";
import { Button } from "flowbite-react";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import productSchema from "../Product.schema";

function ProductCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const product: CreateProductDto = {
      name,
      price,
      stock,
      description,
    };

    const { error } = productSchema.validate(product, { abortEarly: false });
    if (error) {
      const errorDetails: Record<string, string> = {};
      for (const errorDetail of error.details) {
        errorDetails[errorDetail.path[0]] = errorDetail.message;
      }
      setErros(errorDetails);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API}/product`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then(() => {
          router.push("/");
        });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Criação de Produto</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex max-w-md flex-col gap-4"
      >
        <TextInput
          value={name}
          onChange={setName}
          error={erros["name"]}
          name="name"
          label="Nome"
          focus
        />
        <TextInput
          value={price}
          onChange={setPrice}
          name="price"
          label="Preço"
        />
        <NumberInput
          value={stock}
          onChange={setStock}
          name="stock"
          label="Estoque"
        />
        <Textarea
          value={description}
          onChange={setDescription}
          name="description"
          label="Descrição"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
}

export default ProductCreate;
