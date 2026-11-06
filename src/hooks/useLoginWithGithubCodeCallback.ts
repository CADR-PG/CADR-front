import { useEffect } from 'react';
import { userLoginWithGithub } from '../api/client.ts';
import { useNavigate } from 'react-router-dom';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function useLoginWithGithubCodeCallback() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbarStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || '';

    if (code) {
      userLoginWithGithub({ code })
        .then(() => {
          navigate(`/`);
          openSnackbar('Successfully logged in with GitHub!', 'success');
        })
        .catch((error) => {
          console.error(error);
          openSnackbar('Failed to log in with GitHub', 'error');
        });
    }
  }, [navigate, openSnackbar]);
}
