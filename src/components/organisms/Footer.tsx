import { LargeExpandedCopyWrapper } from "src/components/atoms/CopyWrapper";
import { OptimizedImage } from "src/components/atoms/Image";
import { LinearGradient } from "src/components/atoms/LinearGradient";
import { CopyLink } from "src/components/atoms/Link";
import { Spacing } from "src/components/atoms/Spacing";
import { CopyText } from "src/components/typography";
import { CONSTANTS } from "src/constants";
import dharmaLogo from "src/public/assets/images/dharma.png";
import styled from "styled-components/macro";

const { BLOG_URL, TWITTER_URL, HELP_URL, SUPPORT_EMAIL_URL } = CONSTANTS;
const FooterColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 799px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 800px) {
    flex-direction: row;

    & > *:not(:last-child) {
      margin-right: 80px;
    }
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

type FooterLinkProps = React.ComponentProps<typeof CopyLink>;

const FooterLink: React.FC<FooterLinkProps> = props => (
  <CopyLink type="secondary" {...props}>
    {props.children}
  </CopyLink>
);

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterLogo = styled(OptimizedImage)`
  max-height: 200px;
  width: 200px;
  // account for inset built in to image
  margin-top: -10px;
  margin-left: -15px;

  @media (max-width: 799px) {
    margin-bottom: 20px;
  }
`;

export const Footer: React.FC = () => (
  <LinearGradient type="secondary">
    <Spacing $size="xxlarge" $sizeOnMobile="large" $center>
      <LargeExpandedCopyWrapper>
        <FooterWrapper>
          <FooterColumnsWrapper>
            <FooterColumn>
              <FooterLogo src={dharmaLogo} priority />
            </FooterColumn>
          </FooterColumnsWrapper>
          <FooterColumnsWrapper>
            <FooterColumn>
              <CopyText accented>Support</CopyText>
              <FooterLink href={HELP_URL} target="_blank">
                Help Center
              </FooterLink>
              <FooterLink href={SUPPORT_EMAIL_URL} target="_blank">
                Email Support
              </FooterLink>
            </FooterColumn>
            <FooterColumn>
              <CopyText accented>Social</CopyText>
              <FooterLink href={TWITTER_URL} target="_blank">
                Twitter
              </FooterLink>
              <FooterLink href={BLOG_URL} target="_blank">
                Blog
              </FooterLink>
            </FooterColumn>
            <FooterColumn>
              <CopyText accented>Legal</CopyText>
              <FooterLink href="/terms" target="_blank">
                Terms
              </FooterLink>
            </FooterColumn>
          </FooterColumnsWrapper>
        </FooterWrapper>
      </LargeExpandedCopyWrapper>
    </Spacing>
  </LinearGradient>
);
