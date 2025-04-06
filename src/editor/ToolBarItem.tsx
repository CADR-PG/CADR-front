import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from 'react';
import { Button, Menu, Fade, MenuItem } from '@mui/material';

interface ToolBarItemProps {
  label: string;
  children?: ReactNode;
}

function ToolBarItem({ label, children }: ToolBarItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const modifiedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const element = child as React.ReactElement<
        React.ComponentProps<typeof MenuItem>
      >;
      const originalOnClick = element.props.onClick;
      return cloneElement(element, {
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          originalOnClick?.(e);
          closeMenu();
        },
      });
    }
  });

  return (
    <div className="tool-bar__item">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
        size="small"
        color="primary"
        sx={{ textTransform: 'none' }}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        slots={{
          transition: Fade,
        }}
      >
        {modifiedChildren}
      </Menu>
    </div>
  );
}

export default ToolBarItem;
