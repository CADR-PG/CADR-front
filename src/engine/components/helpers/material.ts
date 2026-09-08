const EMPTY =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

export function normalizeUrl(
  map: { data: { downloadUrl: string } } | undefined,
) {
  if (!map) return EMPTY;

  if (import.meta.env.DEV)
    return map.data.downloadUrl.replace(
      'http://cadr.azurite:10000/',
      '/azurite',
    );

  return map.data.downloadUrl;
}
