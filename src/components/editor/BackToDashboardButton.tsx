import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useBackToDashboard from '@/hooks/useBackToDashboard';

function BackToDashboardButton() {
  const backToDashboard = useBackToDashboard();

  return (
    <Tooltip title="Back to dashboard">
      <IconButton
        size="small"
        aria-label="Back to dashboard"
        onClick={backToDashboard}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

export default BackToDashboardButton;
