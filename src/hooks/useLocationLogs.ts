import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { fetchLocationLogs } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import type LocationRaw from '../types/LocationRaw';
import type NormalizedLocation from '../types/NormalizedLocation';

export default function useLocationLogs() {
  const { openSnackbar } = useSnackbarStore();

  const { data, isLoading, isError, error, refetch } = useQuery<
    NormalizedLocation[]
  >({
    queryKey: ['locationLogs'],
    queryFn: async () => {
      const resp = await fetchLocationLogs();
      const raw = resp?.data ?? resp;

      const normalize = (
        item: LocationRaw,
        idx: number,
      ): NormalizedLocation => ({
        id: item.id ?? `${(item.ipAddress ?? 'loc') as string}_${idx}`,
        timestamp:
          (item.timestamp as string) ??
          (item.occuredAt as string) ??
          (item.occurredAt as string) ??
          '',
        ipAddress: (item.ipAddress ?? item.ip ?? '') as string,
        city: (item.city ?? '') as string,
        country: (item.country ?? '') as string,
        latitude: Number(item.latitude ?? item.lat ?? 0),
        longitude: Number(item.longitude ?? item.lon ?? item.lng ?? 0),
      });

      let normalized: NormalizedLocation[] = [];
      if (Array.isArray(raw)) {
        normalized = (raw as LocationRaw[]).map(normalize);
      } else {
        const maybeLogs = (raw as { logs?: unknown })?.logs;
        if (Array.isArray(maybeLogs)) {
          normalized = (maybeLogs as LocationRaw[]).map(normalize);
        }
      }
      return normalized;
    },
    onError: (err: unknown) => {
      let msg = 'Failed to load location logs';
      if (err instanceof Error) {
        msg = err.message;
      } else if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        msg = (err as { message: string }).message;
      }
      openSnackbar(String(msg), 'error');
    },
    staleTime: 1000 * 60,
  } as UseQueryOptions<NormalizedLocation[], Error>);

  return {
    locations: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
