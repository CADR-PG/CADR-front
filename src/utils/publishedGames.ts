const STORAGE_KEY = 'cadr.publishedGames';

export type PublishedGame = {
  gameId: string;
  title: string;
  lastVersionId: string | null;
  lastVersion?: string;
};

function readAll(): Record<string, PublishedGame> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function getPublishedGame(projectId: string): PublishedGame | null {
  return readAll()[projectId] ?? null;
}

export function setPublishedGame(projectId: string, data: PublishedGame) {
  const all = readAll();
  all[projectId] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
