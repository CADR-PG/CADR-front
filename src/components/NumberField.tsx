import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

export default function NumberField({
  id: idProp,
  label,
  error,
  size = 'medium',
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: 'small' | 'medium';
  error?: boolean;
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }
  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            endAdornment={
              <InputAdornment
                position="end"
                className="number-field__adornment"
              >
                <BaseNumberField.Increment
                  render={<IconButton size={size} aria-label="Increase" />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    className="number-field__icon number-field__icon--up"
                  />
                </BaseNumberField.Increment>

                <BaseNumberField.Decrement
                  render={<IconButton size={size} aria-label="Decrease" />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    className="number-field__icon number-field__icon--down"
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            className="number-field__input"
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
