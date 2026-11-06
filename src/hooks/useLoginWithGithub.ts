import { useCallback } from 'react';

export default function useLoginWithGithub() {
  return useCallback(() => {
    const clientId = 'Ov23liE1EtYwInfGTTx4';
    const redirectUri = `${window.location.origin}/login/github/callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user,user:email`;
  }, []);
}
