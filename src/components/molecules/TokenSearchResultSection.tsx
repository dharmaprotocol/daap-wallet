import { Card } from "src/components/atoms/Card";
import { Spacing } from "src/components/atoms/Spacing";
import { Title } from "src/components/typography";

interface TokenSearchResultSectionProps {
  title: string;
}

export const TokenSearchResultSection: React.FC<
  TokenSearchResultSectionProps
> = ({ children, title }) => (
  <Spacing $size="medium" $spaceChildrenSize="medium">
    <Title level={5} secondary>
      {title}
    </Title>
    <Card type="inner-floating">{children}</Card>
  </Spacing>
);
