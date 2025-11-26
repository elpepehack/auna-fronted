import React from 'react'
import './InformacionA.css'
import abrazoImg from '../../images/AbrazoESSALUD.png'

export const InformacionA = () => {
  return (
    <div className="container text-center mt-5 pt-4">
        <h1 className="title display-5 display-md-3 display-lg-1">RESERVA TUS CITAS</h1>
        <p className="mt-4 responsive-text px-3 px-md-5">
          Agenda tus citas de manera rápida, fácil y segura desde la comodidad de tu hogar. <br />
          Con nuestro sistema en línea, puedes: Solicitar citas médicas en minutos,<br />
          Revisar tu historial de atenciones, Consultar la disponibilidad de especialistas y más.
        </p>
        <img src={abrazoImg} className="img-fluid family-img mt-5" alt="Familia" />
    </div>
  )
}
