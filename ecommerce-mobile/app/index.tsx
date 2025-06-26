import "@/global.css";
import {
  View,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Text } from "@/components/ui/text";

import ProductListItem from "../components/ProductListItem";

import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });
  const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 }) as number;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
