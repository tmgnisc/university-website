import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Collection, Singleton } from "./adapter";
import { cms } from "./client";

// Generic Query hooks over a Collection. Returns hooks (not values), so calling
// e.g. `openings.useList()` inside a component is a valid hook call.
function collectionHooks<T extends { id: string }, TInput>(
  key: string,
  col: Collection<T, TInput>,
) {
  const queryKey = ["cms", key] as const;
  return {
    useList: () => useQuery({ queryKey, queryFn: () => col.list() }),
    useCreate: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: (input: TInput) => col.create(input),
        onSuccess: () => qc.invalidateQueries({ queryKey }),
      });
    },
    useUpdate: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: ({ id, input }: { id: string; input: TInput }) => col.update(id, input),
        onSuccess: () => qc.invalidateQueries({ queryKey }),
      });
    },
    useRemove: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: (id: string) => col.remove(id),
        onSuccess: () => qc.invalidateQueries({ queryKey }),
      });
    },
  };
}

function singletonHooks<T>(key: string, single: Singleton<T>) {
  const queryKey = ["cms", key] as const;
  return {
    useGet: () => useQuery({ queryKey, queryFn: () => single.get() }),
    useUpdate: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: (value: T) => single.update(value),
        onSuccess: () => qc.invalidateQueries({ queryKey }),
      });
    },
  };
}

export const openings = collectionHooks("openings", cms.openings);
export const chatbotEntries = collectionHooks("chatbotEntries", cms.chatbotEntries);
export const programs = collectionHooks("programs", cms.programs);
export const news = collectionHooks("news", cms.news);
export const scholarships = collectionHooks("scholarships", cms.scholarships);
export const botSettings = singletonHooks("botSettings", cms.botSettings);
export const siteContact = singletonHooks("siteContact", cms.siteContact);
export const siteMeta = singletonHooks("siteMeta", cms.siteMeta);
export const homeStats = singletonHooks("homeStats", cms.homeStats);
