import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootDeveloper() {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Shop" }} />
        <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
      </Stack>
    </GluestackUIProvider>
  );
}
