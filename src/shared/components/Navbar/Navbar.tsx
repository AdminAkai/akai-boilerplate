import { FC } from 'react'

import IconRenderer from 'src/shared/components/IconRenderer'

import NavbarAdminis from './NavbarAdminis'
import NavbarOption from './NavbarOption'

import { allNavbarOptions } from './lib'
import { NavbarContainer, NavbarOptions } from './styledComponents'

const Navbar: FC = () => {
  return (
    <NavbarContainer animate>
      <NavbarAdminis />
      <NavbarOptions>
        <IconRenderer />
        {allNavbarOptions.map((option, i) => (
          <NavbarOption
            {...option}
            key={`${i}-${option.label}`}
            ariaLabel={option.label}
          />
        ))}
      </NavbarOptions>
    </NavbarContainer>
  )
}

export default Navbar
