import { Alert, Snackbar } from '@mui/material';
import { useSnackbarStore } from '../stores/snackbarStore';

function SnackbarProvider() {
  const { message, open, severity, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={closeSnackbar} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarProvider;
