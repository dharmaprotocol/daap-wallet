import styled from "styled-components/macro";

export const CopyWrapper = styled.div`
  max-width: 800px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ExpandedCopyWrapper = styled(CopyWrapper)`
  width: 100%;
`;

export const LargeExpandedCopyWrapper = styled(ExpandedCopyWrapper)`
  max-width: 1100px;
`;

export const CardCopyWrapper = styled(CopyWrapper)`
  max-width: 400px;
`;

export const LargeCardCopyWrapper = styled(CopyWrapper)`
  max-width: 650px;
`;
