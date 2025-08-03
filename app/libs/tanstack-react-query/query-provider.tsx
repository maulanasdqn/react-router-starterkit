import { QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren, ReactElement } from "react";
import { queryClient } from "./query-client";

export const QueryProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
