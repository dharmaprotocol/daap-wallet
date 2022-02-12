import { Input } from "src/components/atoms/Input";
import { STYLES } from "src/constants";
import styled, { StyledComponentPropsWithRef } from "styled-components/macro";

const { INPUT } = STYLES;

const Wrapper = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: ${INPUT.PADDING};
  top: calc(50%);
  transform: translate(0%, -50%);
`;

type SearchInputProps = StyledComponentPropsWithRef<typeof Input> & {
  button: React.ReactNode;
};

export const InputWithButton: React.FC<SearchInputProps> = ({
  button,
  ...props
}) => (
  <Wrapper>
    <Input {...props} />
    <ButtonWrapper>{button}</ButtonWrapper>
  </Wrapper>
);
