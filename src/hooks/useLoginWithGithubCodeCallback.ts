import { useEffect, useRef, useState } from 'react';
import { userLoginWithGithub } from '../api/client.ts';
import { useNavigate } from 'react-router-dom';
import { useSnackbarStore } from '../stores/snackbarStore';
import { GITHUB_STATE_KEY } from './useLoginWithGithub.ts';

export type GithubCallbackStatus = 'loading' | 'error';

export default function useLoginWithGithubCodeCallback() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbarStore();
  const started = useRef(false);
  const [status, setStatus] = useState<GithubCallbackStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const fail = (message: string) => {
      setErrorMessage(message);
      setStatus('error');
      openSnackbar(message, 'error');
    };

    const urlParams = new URLSearchParams(window.location.search);
    const oauthError = urlParams.get('error');
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const expectedState = sessionStorage.getItem(GITHUB_STATE_KEY);
    sessionStorage.removeItem(GITHUB_STATE_KEY);

    if (oauthError) {
      fail(
        urlParams.get('error_description') ||
          'GitHub authorization was cancelled or denied.',
      );
      return;
    }
    if (!code) {
      fail('Missing authorization code from GitHub.');
      return;
    }
    if (!expectedState || state !== expectedState) {
      fail('Invalid login state. Please try again.');
      return;
    }

    userLoginWithGithub({ code })
      .then(() => {
        navigate('/', { replace: true });
        openSnackbar('Successfully logged in with GitHub!', 'success');
      })
      .catch((error) => {
        console.error(error);
        const apiMessage = error?.response?.data?.message;
        fail(
          typeof apiMessage === 'string'
            ? apiMessage
            : 'Failed to log in with GitHub',
        );
      });
  }, [navigate, openSnackbar]);

  return { status, errorMessage };
}
