import React from 'react'
import './Autenticacion.css'
import { NavbarA } from '../../components/navbarA/NavbarA'
import { InformacionA } from '../../components/informacionA/InformacionA'

export const Autenticacion = () => {
  return (
    <div className="body-essalud">
      <NavbarA/>
      <InformacionA/>
    </div>
  )
}
