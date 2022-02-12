import { RefObject } from "react";
import NumberFormat, { NumberFormatPropsBase } from "react-number-format";
import { STYLES } from "src/constants";
import styled, { StyledComponentPropsWithRef } from "styled-components/macro";

const { NUMERICAL_INPUT } = STYLES;

export const StyledNumericalInput = styled.input<{ readOnly?: boolean }>`
  ${NUMERICAL_INPUT.FONT_FAMILY_STYLES}
  padding: 0px;
  outline: none;
  border: none;
  text-align: right;
  font-size: ${NUMERICAL_INPUT.FONT_SIZE};
  color: ${NUMERICAL_INPUT.COLOR};
  width: 100%;
  appearance: none;
  box-shadow: none;
  ${props => props.readOnly && "cursor: default;"}

  ::placeholder {
    color: ${NUMERICAL_INPUT.PLACEHOLDER_COLOR};
  }
`;

type CustomInputProps = StyledComponentPropsWithRef<
  typeof StyledNumericalInput
> & {
  customInputRef?: RefObject<HTMLInputElement>;
};

// Necessary for passing ref to StyledNumericalInput
const CustomInput: React.FC<CustomInputProps> = ({
  customInputRef,
  ...props
}) => {
  return <StyledNumericalInput {...props} ref={customInputRef} />;
};

type NumericalInputProps = Omit<NumberFormatPropsBase<any>, "onChange"> & {
  customInputRef?: RefObject<HTMLInputElement>;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder: string;
};

export const NumericalInput: React.FC<NumericalInputProps> = ({
  onChange,
  placeholder,
  ...props
}) => (
  <NumberFormat
    inputMode="decimal"
    autoComplete="off"
    autoCorrect="off"
    pattern="^[0-9]*[.,]?[0-9]*$"
    placeholder={placeholder || "0.00"}
    minLength={1}
    maxLength={50}
    thousandSeparator=","
    spellCheck="false"
    customInput={CustomInput}
    onValueChange={value => onChange?.(value.value)}
    {...props}
  />
);
