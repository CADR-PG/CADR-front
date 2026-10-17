export type Paginated<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export type GameStates = 'Draft' | 'Published' | 'Archived' | 'Suspended';

export type GameReadModel = {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  ageRestriction: number;
  state: GameStates;
  activeVersionId: string | null;
};

export type GameShopCard = {
  gameId: string;
  title: string;
  amount: number;
  currency: string;
  playsCount: number;
};

export type StoreGame = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  ageRestriction?: number;
  playsCount?: number;
};

export type GamePrice = {
  amount: number;
  currency: string;
  isFree: boolean;
};

export type LibraryGame = {
  id: string;
  title: string;
  description: string;
  price: GamePrice;
  ageRestriction: number;
  state: GameStates;
  activeVersionId: string | null;
};

export type GameVersionReadModel = {
  id: string;
  gameId: string;
  version: string;
  description: string | null;
  createdAt: string;
};

export type GameAsset = {
  path: string;
  url: string;
};

export type PlayGameReadModel = {
  gameId: string;
  versionId: string;
  expiresOn: string;
  assets: GameAsset[];
};

export type AddGameToStoreData = {
  title: string;
  description: string;
  version: string;
  amount: number;
  ageRestriction: number;
  state: GameStates;
};

export type CreateSnapshotData = {
  gameId: string;
  version: string;
};
