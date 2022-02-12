import styled from "styled-components/macro";

interface FlexProps {
  flex?: number;
  flexDirection?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ flex }) => !isNaN(flex as any) && `flex: ${flex};`}
  ${props => `
        flex-direction: ${props.flexDirection};
    `}
  ${props => `
        align-items: ${props.alignItems};
    `}
   ${props => `
        justify-content: ${props.justifyContent};
    `}
`;

Flex.defaultProps = {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start"
};
