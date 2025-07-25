import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { Alert, FlatList } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
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
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, inc",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: { name: "Josh Smith" },
      });

      if (error) {
        Alert.alert("Error", error.message);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    paymentIntentMutation.mutate();
  }, []);

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
      console.log(data);
      resetCart();
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
    }
  };

  const onCheckout = async () => {
    createOrderMutation.mutate();
    openPaymentSheet();
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
