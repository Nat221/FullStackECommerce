import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { Alert, FlatList } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";
import { createPaymentIntent } from "@/api/stripe";
import { useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";

export default function Cart() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data) => {
      const { customer, ephemeralKey, paymentIntent } = data;
      console.log("On success after create Payment Intent");
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, inc",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: { name: "Josh Smith" },
      });

      console.log("Payment sheet initiated");

      if (error) {
        Alert.alert("Error initializing Payment", error.message);
      }

      openPaymentSheet();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price, //MANAGE FROM SERVER SIDE
        }))
      ),
    onSuccess: (data) => {
      paymentIntentMutation.mutate({ orderId: data.id });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed");
      resetCart();

      router.replace("/");
    }
  };

  const onCheckout = async () => {
    const { data } = await createOrderMutation.mutate();
    // openPaymentSheet();
    //send order to server
  };

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <Box>
          <HStack className="p-3">
            <VStack space="sm">
              <Text bold>{item.product.name}</Text>
              <Text>€ {item.product.price}</Text>
            </VStack>
            <Text className="ml-auto">{item.quantity}</Text>
          </HStack>
        </Box>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
