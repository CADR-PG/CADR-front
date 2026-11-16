import { useCallback } from 'react';

export const GITHUB_STATE_KEY = 'github_oauth_state';

export default function useLoginWithGithub() {
  return useCallback(() => {
    const clientId =
      import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liE1EtYwInfGTTx4';
    const state = crypto.randomUUID();
    sessionStorage.setItem(GITHUB_STATE_KEY, state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${window.location.origin}/login/github/callback`,
      scope: 'read:user,user:email',
      state,
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  }, []);
}
