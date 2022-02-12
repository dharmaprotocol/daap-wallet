import { Input } from "src/components/atoms/Input";
import { LoadingIndicator } from "src/components/atoms/LoadingIndicator";
import { STYLES } from "src/constants";
import styled, { StyledComponentPropsWithRef } from "styled-components/macro";

const { INPUT } = STYLES;

const Wrapper = styled.div`
  position: relative;
`;

const LoadingIndicatorWrapper = styled.div`
  position: absolute;
  right: ${INPUT.PADDING};
  top: calc(50% + 1px);
  transform: translate(0%, -50%);
`;

type SearchInputProps = StyledComponentPropsWithRef<typeof Input> & {
  loading?: boolean;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  loading,
  ...props
}) => (
  <Wrapper>
    <Input accent {...props} />
    {loading && (
      <LoadingIndicatorWrapper>
        <LoadingIndicator />
      </LoadingIndicatorWrapper>
    )}
  </Wrapper>
);
