import { Card, CardContent, CardHeader, Collapse, IconButton, Tooltip } from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { ReactNode, useState } from "react";

interface InspectorCardProps {
  children: ReactNode
  title: string
}

function InspectorCard({ children, title }: InspectorCardProps) {
  const [collapse, setCollapse] = useState(true);

  return (
    
    <Card>
      <CardHeader
        title={title}
        slotProps={{
          title: {
            variant: 'body1'
          }
        }}
        onClick={() => setCollapse(!collapse)}
        action={
          <Tooltip title={collapse ? "Collapse" : "Expand"}>
            <IconButton>
              {collapse ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Tooltip>
        }
      />
      <Collapse in={collapse} unmountOnExit>
        <CardContent>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default InspectorCard;
