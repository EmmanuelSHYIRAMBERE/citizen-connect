import type { DefaultParams } from "next/dist/shared/lib/router/utils/route-matcher";

declare module "next" {
  export type PageProps<P = DefaultParams, Q = DefaultParams> = {
    params: P;
    searchParams: Q;
  };
}
