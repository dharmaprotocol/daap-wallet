import { ForwardedRef, forwardRef } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "src/components/atoms/Input";
import styled from "styled-components/macro";

type PhoneNumberInputProps = PhoneInputProps & {
  inputCss?: string;
};

type InputWithCssProps = React.ComponentPropsWithRef<typeof Input> & {
  inputCss?: string;
  innerRef: ForwardedRef<HTMLInputElement>;
};

const InputWithCss: React.FC<InputWithCssProps> = ({
  innerRef,
  inputCss,
  ...props
}) => {
  return <Input {...props} css={inputCss} ref={innerRef} />;
};

const StyledPhoneInput = styled(PhoneInput)`
  --PhoneInputCountrySelect-marginRight: 20px;
`;

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  ...props
}) => (
  <StyledPhoneInput
    placeholder="Enter phone number"
    defaultCountry="US"
    inputComponent={forwardRef((props, ref) => (
      <InputWithCss accent {...props} innerRef={ref} />
    ))}
    {...props}
  />
);
