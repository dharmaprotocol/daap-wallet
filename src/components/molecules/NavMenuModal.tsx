import { motion } from "framer-motion";
import { SideModal } from "src/components/atoms/Modal";
import { NavMenuButton } from "src/components/atoms/NavMenuButton";
import { NavButtons } from "src/types/components";
import { NavLinks } from "src/types/navigation";
import styled from "styled-components/macro";

const ModalBackground = styled(motion.div)`
  background: ${props => props.theme.mobileNavMenu.backgroundColor};
  height: 100%;
  padding: ${props => props.theme.spacing.large};
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: ${props => props.theme.spacing.medium};
  }
`;

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  links: NavLinks;
  Buttons?: NavButtons;
}

export const NavMenuModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  links,
  Buttons
}) => {
  return (
    <SideModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalBackground>
        {links.map(({ text, url }) => (
          <NavMenuButton
            key={text}
            forwardedAs={motion.a}
            href={url}
            target="_blank"
          >
            {text}
          </NavMenuButton>
        ))}
        {Buttons && <Buttons breakpoint="mobile" />}
      </ModalBackground>
    </SideModal>
  );
};
