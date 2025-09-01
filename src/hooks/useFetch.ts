"use client";

import { useQuery, UseQueryOptions, QueryKey, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useFetch<TData = unknown>(
  key: QueryKey,
  url: string,
  options?: UseQueryOptions<TData>
) {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get(url);
      return res.data as TData;
    },
    staleTime: 60_000,
    ...options,
  });
}

export function useApiMutation<TData = any, TVariables = any>(
  method: "post" | "put" | "patch" | "delete",
  url: string,
  options?: UseMutationOptions<TData, any, TVariables>
) {
  return useMutation<TData, any, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await api[method](url, variables);
      return res.data as TData;
    },
    ...options,
  });
}
