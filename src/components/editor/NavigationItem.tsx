import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from 'react';
import { Button, Menu, Fade, MenuItem } from '@mui/material';

interface NavigationItemProps {
  label: string;
  children?: ReactNode;
}

function NavigationItem({ label, children }: NavigationItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // modify incoming children, so that each menu item
  // will also call `closeMenu` on click
  const modifiedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const element = child as React.ReactElement<
        React.ComponentProps<typeof MenuItem>
      >;
      const originalOnClick = element.props.onClick;
      return cloneElement(element, {
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          originalOnClick?.(e as React.MouseEvent<HTMLLIElement>);
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

export default NavigationItem;
