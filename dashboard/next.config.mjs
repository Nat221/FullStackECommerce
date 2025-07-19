import { withGluestackUI } from "@gluestack/ui-next-adapter";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "nativewind",
    "react-native-css-interop",
    "@gluestack-ui/image",
    "@gluestack-ui/form-control",
    "@gluestack-ui/avatar",
    "@gluestack-ui/actionsheet",
  ],
};

export default withGluestackUI(nextConfig);
