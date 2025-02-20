import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, act, createRenderer, fireEvent } from 'test/utils';
import Radio, { radioClasses as classes } from '@mui/joy/Radio';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Radio />', () => {
  const { render } = createRenderer();

  describeConformance(<Radio />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'MuiRadio',
    testDeepOverrides: [{ slotName: 'input', slotClassName: classes.input }],
    testVariantProps: { variant: 'light' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread'],
  }));

  it('should have the classes required for Radio', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('renders a `role="radio"` with the id', () => {
    const { getByRole } = render(<Radio id="foo" />);

    expect(getByRole('radio')).to.have.property('id', 'foo');
  });

  it('renders a `role="radio"` with the name', () => {
    const { getByRole } = render(<Radio name="bar" />);

    expect(getByRole('radio')).to.have.property('name', 'bar');
  });

  it('renders a `role="radio"` with the Unchecked state by default', () => {
    const { getByRole } = render(<Radio />);

    expect(getByRole('radio')).to.have.property('checked', false);
  });

  it('renders a radio with the Checked state when checked', () => {
    const { getByRole } = render(<Radio defaultChecked />);

    expect(getByRole('radio')).to.have.property('checked', true);
  });

  it('the radio can be disabled', () => {
    const { getByRole } = render(<Radio disabled />);

    expect(getByRole('radio')).to.have.property('disabled', true);
  });

  it('the Checked state changes after change events', () => {
    const { getByRole } = render(<Radio defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('radio').click();
      fireEvent.change(getByRole('radio'), { target: { checked: '' } });
    });

    expect(getByRole('radio')).to.have.property('checked', false);
  });

  it('should have configurable color', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.colorNeutral); // default

    rerender(<Radio color="primary" />);
    expect(container.firstChild).to.have.class(classes.colorPrimary);
  });

  it('should have configurable variant', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.variantOutlined); // default

    rerender(<Radio variant="light" />);
    expect(container.firstChild).to.have.class(classes.variantLight);
  });

  it('should have configurable size', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.sizeMd); // default

    rerender(<Radio size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });
});
