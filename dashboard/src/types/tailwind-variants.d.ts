declare module "tailwind-variants/dist/config" {
  export type TVConfig = {
    twMerge?: boolean;
    twMergeConfig?: Record<string, unknown>;
  };
}
