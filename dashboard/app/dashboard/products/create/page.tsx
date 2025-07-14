"use client";

import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";

import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createProduct } from "./actions";

export default function CreateProductPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Box className="flex-1 min-h-screen justify-center items-center ">
      <FormControl
        isInvalid={!!errorMessage}
        className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 bg-white m-2"
      >
        <VStack space="xl">
          <Heading className="text-typography-900 leading-3 pt-3">
            Create Product
          </Heading>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Name</Text>
            <Input className="min-w-[250px]">
              <InputField value={name} onChangeText={setName} type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Description</Text>
            <Input className="min-w-[250px]">
              <InputField
                value={description}
                onChangeText={setDescription}
                type="text"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Price</Text>
            <Input className="min-w-[250px]">
              <InputField value={price} onChangeText={setPrice} type="text" />
            </Input>
          </VStack>

          {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

          <Button
            onPress={() => createProduct(name, description, Number(price))}
          >
            <ButtonText>Save Product</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
}
