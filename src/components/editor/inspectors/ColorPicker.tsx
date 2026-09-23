import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { Button, InputAdornment, Popover, TextField } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import useEntityManager from '../../../hooks/useEntityManager';
import { ECS } from '../../../engine/ECS';
import { Component, ComponentType } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';

interface HasData<S> {
  data: S;
}

interface ColorPickerProps<S, T extends Component & HasData<S>> {
  entity: Entity;
  component: ComponentType<T>;
  field: keyof S;
}

export default function ColorPicker<S, T extends Component & HasData<S>>({
  entity,
  component,
  field,
}: ColorPickerProps<S, T>) {
  const em = useEntityManager();
  const c = em.getComponent(component, entity);
  const cw = ECS.instance.entityManager.getComponent(component, entity);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [color, setColor] = useState<string>('');

  const componentColor = c ? (c.data as Record<keyof S, number>) : null;
  const data = cw!.data as Record<keyof S, number>;
  const open = Boolean(anchorEl);
  const stringColor = componentColor
    ? `${componentColor[field].toString(16).padStart(6, '0')}`
    : '';

  // NOTE(m1k53r): this is used only for the input below the picker,
  // so that both input forms are synchronized with each other.
  useEffect(() => {
    setColor(stringColor);
  }, [componentColor, stringColor]);

  const handleHexColor = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const color = Number.parseInt(e.currentTarget.value, 16);

    data[field] = color;
  };

  const handleColor = (color: string) => {
    // NOTE(m1k53r): `color` starts with '#' character,
    // so we have to start from the second character to parse it correctly.
    const c = Number.parseInt(color.slice(1), 16);
    data[field] = c;
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO(m1k53r): this works poorly.
  const validateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.currentTarget.value === '') {
      setColor('000000');
      return;
    }
    const regex = /^[0-9A-F]*$/gi;
    if (regex.test(e.currentTarget.value)) {
      setColor(e.currentTarget.value.slice(0, 6));
    }
  };

  return (
    <>
      <Button
        // NOTE(m1k53r): this is for dynamically setting the button color.
        // let me know if we can do this wihout inline css.
        style={{ background: '#' + stringColor }}
        onClick={handleOpen}
        size="large"
      ></Button>
      <Popover
        className="picker"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div className="picker-container">
          <HexColorPicker color={stringColor} onChange={handleColor} />
          <TextField
            value={color}
            onChange={(e) => validateInput(e)}
            onBlur={(e) => handleHexColor(e)}
            label="Hex color"
            variant="filled"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              },
            }}
            className="picker-input"
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                handleColor(`#${color}`);
                ev.preventDefault();
              }
            }}
          ></TextField>
        </div>
      </Popover>
    </>
  );
}
