import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionApi } from "../lib/api";
import type { PortfolioData, SectionKey } from "../../../shared/types/portfolio";
import { siteDataFallback } from "../lib/fallback";

export function useSection<K extends SectionKey>(id: K) {
  return useQuery({
    queryKey: ["section", id],
    queryFn: async () => {
      const res = await sectionApi.get(id);
      if (!res.ok) return siteDataFallback[id] as PortfolioData[K];
      return res.data.data as PortfolioData[K];
    },
    staleTime: 30_000,
  });
}

export function useSaveSection<K extends SectionKey>(id: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PortfolioData[K]) => sectionApi.put(id, data),
    onSuccess: (res) => {
      if (res.ok) {
        queryClient.setQueryData(["section", id], res.data.data);
      }
    },
  });
}
