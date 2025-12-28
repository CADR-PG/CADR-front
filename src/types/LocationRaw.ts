interface LocationRaw {
  id?: string;
  ipAddress?: string;
  ip?: string;
  timestamp?: string;
  occuredAt?: string;
  occurredAt?: string;
  city?: string;
  country?: string;
  latitude?: number | string;
  longitude?: number | string;
  lat?: number | string;
  lon?: number | string;
  lng?: number | string;
  [key: string]: unknown;
}

export default LocationRaw;
