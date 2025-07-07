import { withGluestackUI } from "@gluestack/ui-next-adapter";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "nativewind",
    "react-native-css-interop",
    "@gluestack-ui/image",
  ],
};

export default withGluestackUI(nextConfig);
