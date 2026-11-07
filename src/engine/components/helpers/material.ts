const EMPTY =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

export function normalizeUrl(
  map: { data: { downloadUrl: string } } | undefined,
) {
  // TODO: Return EMPTY only for materials
  if (!map) return EMPTY;

  if (import.meta.env.DEV)
    return map.data.downloadUrl.replace(
      'http://cadr.azurite:10000/',
      '/azurite',
    );

  return map.data.downloadUrl;
}

export function normalizeUrlRaw(data: { downloadUrl: string } | undefined) {
  if (!data) return EMPTY;

  if (import.meta.env.DEV)
    return data.downloadUrl.replace('http://cadr.azurite:10000/', '/azurite');

  return data.downloadUrl;
}
