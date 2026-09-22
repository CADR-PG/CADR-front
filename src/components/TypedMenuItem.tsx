import { MenuItem, MenuItemProps } from '@mui/material';

type TypedMenuItemProps<V> = Omit<MenuItemProps, 'value'> & { value: V };

export default function TypedMenuItem<V>({
  value: _value,
  ...props
}: TypedMenuItemProps<V>) {
  return <MenuItem {...props} />;
}
