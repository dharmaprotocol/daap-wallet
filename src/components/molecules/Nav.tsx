import React, { useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import styled from 'styled-components'

import { Button } from 'src/components/atoms/Button'
import { DharmaLogo } from 'src/components/atoms/DharmaLogo'
import { NavMenuModal } from 'src/components/molecules/NavMenuModal'
import { NavButtons } from 'src/types/components'
import { NavLinks } from 'src/types/navigation'

const navDesktopMinBreakpoint = '650px'
const navMobileMaxBreakpoint = '649px'

const NavWrapper = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const NavRightWrapper = styled.div`
  display: none;

  & > *:not(:last-child) {
    margin-right: 20px;
  }

  @media (min-width: ${navDesktopMinBreakpoint}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const NavButtonsWrapper = styled.div`
  @media (max-width: ${navMobileMaxBreakpoint}) {
    display: none;
  }
`

const NavMobileButtonsWrapper = styled.div`
  @media (min-width: ${navDesktopMinBreakpoint}) {
    display: none;
  }
`

interface NavProps {
  links?: NavLinks
  Buttons?: NavButtons
}

export const Nav: React.FC<NavProps> = ({
  Buttons,
}) => {
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false)

  return (
    <>
      <NavWrapper>
          <a href="/">
            <DharmaLogo width={145} />
          </a>
        <NavRightWrapper>
          <NavButtonsWrapper>
            {Buttons && <Buttons breakpoint="desktop" />}
          </NavButtonsWrapper>
        </NavRightWrapper>
        <NavMobileButtonsWrapper>
          <Button buttonType="unstyled" onClick={() => setNavMenuIsOpen(true)}>
            <HiOutlineMenu size={40} />
          </Button>
        </NavMobileButtonsWrapper>
      </NavWrapper>
      <NavMenuModal
        links={[]}
        Buttons={Buttons}
        isOpen={navMenuIsOpen}
        onRequestClose={() => setNavMenuIsOpen(false)}
      />
    </>
  )
}
