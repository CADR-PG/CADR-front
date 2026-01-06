import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import Material, { MaterialData } from '../../../engine/components/Material';
import { Button, InputAdornment, Popover, TextField } from '@mui/material';
import { HexColorPicker } from 'react-colorful';

interface ColorData extends MaterialData {
  color: number;
}

interface ColorMaterial extends Material {
  data: ColorData;
}

interface ColorPickerProps {
  entity: Entity;
  componentColor: number;
}

export default function ColorPicker({
  entity,
  componentColor,
}: ColorPickerProps) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  ) as ColorMaterial;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [color, setColor] = useState<string>('');
  const open = Boolean(anchorEl);
  console.log(componentColor);
  const stringColor = `${componentColor.toString(16).padStart(6, '0')}`;

  // NOTE(m1k53r): this is used only for the input below the picker,
  // so that both input forms are synchronized with each other.
  useEffect(() => {
    setColor(stringColor);
  }, [componentColor, stringColor]);

  const handleHexColor = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const color = Number.parseInt(e.currentTarget.value, 16);

    materialWrite.data.color = color;
  };

  const handleColor = (color: string) => {
    // NOTE(m1k53r): `color` starts with '#' character,
    // so we have to start from the second character to parse it correctly.
    const c = Number.parseInt(color.slice(1), 16);
    materialWrite.data.color = c;
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
