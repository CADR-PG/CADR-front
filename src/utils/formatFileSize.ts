const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes <= 0) return '0 B';

  const exponent = Math.min(
    Math.floor(Math.log(sizeInBytes) / Math.log(1024)),
    UNITS.length - 1,
  );
  const value = sizeInBytes / 1024 ** exponent;

  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${UNITS[exponent]}`;
}