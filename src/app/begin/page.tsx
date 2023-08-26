"use client";

import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataPermissions, setDataPermissions] = useState(false);

  const introPrompt = () => {
    return (
      <>
        <div className="border border-solid border-slate-700 rounded-lg">
          <div className="px-2 py-2">
            <p className="py-2">
              Queremos asegurarnos de que tengas la mejor experiencia posible al encontrar compañeros de viaje que se adapten a tus preferencias y personalidad.
            </p>
            <p className="py-2">
              Para lograrlo, te animamos a responder las siguientes preguntas. 
            </p>    
          </div>
        </div>
        <button onClick={() => {setCurrentStep(currentStep + 1)}} className="btn btn-secondary my-6">Continuar</button>
      </>
    )
  }
  
  const confirmationPrompt = () => {
    return (
      <>
        <div className="border border-solid border-slate-700 rounded-lg">
          <div className="px-2 py-2">
            <p className="py-2">
              Queremos ser transparentes contigo: para ofrecerte los mejores resultados posibles, nuestra aplicación utiliza un modelo inteligente que toma en cuenta la información que proporcionas.
            </p>
            <p className="py-2">
              Si estás de acuerdo en permitir que utilicemos los datos que proporciones para ofrecerte la mejor experiencia, te damos las gracias por tu confianza.
            </p>
            <p className="py-2">
              ¡Estamos emocionados de acompañarte en tus próximas aventuras!
            </p>
          </div>
        </div>
        <div onClick={() => {setDataPermissions(!dataPermissions)}} className="flex pt-8">
          <input type="checkbox" checked={dataPermissions} className="checkbox" />
            <p className="px-4">
              Acepto compartir mi información
            </p>
        </div>
        <button disabled={!dataPermissions} onClick={() => {setCurrentStep(currentStep + 1)}} className="btn btn-secondary my-6">Continuar</button>
      </>
    )
  }

  const renderPollStep = () => {
    switch(currentStep) {
      default:
        return (
          <>
          </>
        )
      case 1:
        return (
          introPrompt()
        )
      case 2:
        return (
          confirmationPrompt()
        )
    }
  }

  return (
    <>
      <div className="flex-grow flex flex-col items-center pt-10">
        <div className="w-1280 flex flex-col items-center">
          <div className="w-1/2 flex flex-col items-center text-center py-6">
            <h1 className="text-4xl font-bold pb-8">
              Conociéndote
            </h1>
            { renderPollStep() }
          </div>
        </div>
      </div>
    </>
  )
}