import { useEffect } from 'react';
import { userLoginWithGithub } from '../api/client.ts';
import { useNavigate } from 'react-router-dom';

export default function useLoginWithGithubCodeCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || '';

    if (code) {
      userLoginWithGithub({ code })
        .then(() => navigate(`/`))
        .catch(console.error);
    }
  }, [navigate]);
}
