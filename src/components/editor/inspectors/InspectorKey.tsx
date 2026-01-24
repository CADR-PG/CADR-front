import { Tooltip } from '@mui/material';

interface InspectorKeyProps {
  keyName: string;
}
export default function InspectorKey({ keyName }: InspectorKeyProps) {
  return (
    <div className="inspector-field">
      <Tooltip title={keyName} placement="top">
        <div className="inspector-field-key">{keyName}</div>
      </Tooltip>
    </div>
  );
}
