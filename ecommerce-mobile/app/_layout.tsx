import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootDeveloper() {
  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
}
