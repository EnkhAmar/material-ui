import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useControlled as useControlled, unstable_useId as useId } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps } from '../styles';
import { getRadioGroupUtilityClass } from './radioGroupClasses';
import radioClasses from '../Radio/radioClasses';
import { RadioGroupProps, RadioGroupTypeMap } from './RadioGroupProps';
import RadioGroupContext from './RadioGroupContext';

const useUtilityClasses = (ownerState: RadioGroupProps) => {
  const { row } = ownerState;
  const slots = {
    root: ['root', row && 'row'],
  };

  return composeClasses(slots, getRadioGroupUtilityClass, {});
};

const RadioGroupRoot = styled('div', {
  name: 'MuiRadioGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: RadioGroupProps }>(({ ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--RadioGroup-gap': '0.5rem',
  }),
  ...(ownerState.size === 'md' && {
    '--RadioGroup-gap': '0.75rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--RadioGroup-gap': '1rem',
  }),
  display: 'flex',
  flexDirection: ownerState.row ? 'row' : 'column',
  [`.${radioClasses.root} + .${radioClasses.root}`]: {
    ...(ownerState.row
      ? {
          marginLeft: 'var(--RadioGroup-gap)',
        }
      : {
          marginTop: 'var(--RadioGroup-gap)',
        }),
  },
}));

const RadioGroup = React.forwardRef(function RadioGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiRadioGroup',
  });

  const {
    className,
    component,
    children,
    name: nameProp,
    defaultValue,
    disableIcon = false,
    overlay,
    value: valueProp,
    onChange,
    color,
    variant,
    size = 'md',
    row = false,
    ...otherProps
  } = props;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'RadioGroup',
  });

  const ownerState = {
    row,
    size,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  const name = useId(nameProp);

  return (
    <RadioGroupContext.Provider
      value={{ color, disableIcon, overlay, size, variant, name, value, onChange: handleChange }}
    >
      <RadioGroupRoot
        ref={ref}
        role="radiogroup"
        {...otherProps}
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
      >
        {children}
      </RadioGroupRoot>
    </RadioGroupContext.Provider>
  );
}) as OverridableComponent<RadioGroupTypeMap>;

RadioGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * The radio's `disabledIcon` prop. If specified, the value is passed down to every radios under this element.
   */
  disableIcon: PropTypes.bool,
  /**
   * The `name` attribute of the input.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The radio's `overlay` prop. If specified, the value is passed down to every radios under this element.
   */
  overlay: PropTypes.bool,
  /**
   * If `true`, flex direction is set to 'row'.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default RadioGroup;
