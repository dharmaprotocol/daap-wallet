import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components/macro";

const backdropVariants: Variants = {
  visible: {
    opacity: 1,
    backdropFilter: `blur(20px)`,
    // @ts-ignore
    "-webkit-backdrop-filter": "blur(20px)"
  },
  hidden: {
    opacity: 0,
    backdropFilter: `blur(0px)`,
    // @ts-ignore
    "-webkit-backdrop-filter": "blur(0px)"
  }
};

const centeredModalVariants: Variants = {
  hidden: {
    y: "50vh",
    x: "-50%",
    opacity: 0.3,
    scaleX: 0.9,
    scaleY: 0.9,
    transition: { type: "spring", bounce: 0.3, mass: 0.55, damping: 11 }
  },
  visible: {
    scaleX: 1,
    scaleY: 1,
    y: "-50%",
    x: "-50%",
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, mass: 0.55, damping: 11 }
  }
};

const sideModalVariants: Variants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: {
    x: "0",
    opacity: 1,
    transition: { ease: "easeOut" }
  }
};

const StyledModalWrapper = styled(motion.div)`
  z-index: 11;
  position: absolute;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const preventScrollOnBody = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = "fixed";
};
const allowScrollOnBody = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo({
    behavior: "auto",
    top: parseInt(scrollY || "0") * -1,
    left: 0
  });
};

const usePreventScrollWhenModalOpen = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      return preventScrollOnBody();
    } else {
      return allowScrollOnBody();
    }

    return allowScrollOnBody;
  }, [isModalOpen]);
};

export const ModalBackdropWrapper: React.FC<ModalProps> = ({
  children,
  isOpen,
  onRequestClose
}) => {
  usePreventScrollWhenModalOpen(isOpen);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onRequestClose}
        >
          {children}
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

const ModalWrapper: React.FC<{
  variants: Variants;
  modalWrapperCss: string;
}> = ({ variants, children, modalWrapperCss }) => (
  <StyledModalWrapper
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    onClick={e => e.stopPropagation()}
    css={modalWrapperCss}
  >
    {children}
  </StyledModalWrapper>
);

export const CenteredModal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onRequestClose
}) => (
  <ModalBackdropWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
    <ModalWrapper
      variants={centeredModalVariants}
      modalWrapperCss={`
        width: 100%;
        max-width: 400px;
        padding: 10px;
        height: auto;
        top: 50%;
        left: 50%;
        right: auto;
        bottom: auto;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      `}
    >
      {children}
    </ModalWrapper>
  </ModalBackdropWrapper>
);

export const SideModal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onRequestClose
}) => (
  <ModalBackdropWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
    <ModalWrapper
      variants={sideModalVariants}
      modalWrapperCss={`
        width: 600px;
        margin-right: -300px;
        height: 100vh;
        top: 0%;
        right: 0;
        left: auto;
        bottom: auto;

        & > * {
          width: 300px;
        }
      `}
    >
      {children}
    </ModalWrapper>
  </ModalBackdropWrapper>
);
