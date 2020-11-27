import React, {Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'

function App() {

//Local storage (cuando arranca el programa)
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
  citasIniciales = []; 
} //Si no hay citas, es una colección vacia

const [ citas, setCitas ] = useState(citasIniciales);

// Se ejecuta al cargar y cuando hay cambios en el componente
useEffect( () => {
  if(citasIniciales){
    localStorage.setItem('citas',JSON.stringify(citas))
  } else { //Si no hay citas iniciales
    localStorage.setItem('citas',JSON.stringify([]))
  }
}, [citas,citasIniciales]) //Ejecuta cada vez que citas cambie
//Quitar citasIniciales si funca mal, era un warning

const agregarCita = cita => {
    setCitas([
      ...citas,
      cita
    ])
}

const eliminarCita = id => {
  const nuevasCitas = citas.filter(c => c.id !== id);
  setCitas(nuevasCitas);
}

const titulo = citas.length === 0 ? 'NO HAY CITAS' : 'CITAS AGENDADAS'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">  
        <div className="row">

          <div className="one-half column">
            <Formulario 
                agregarCita={agregarCita}
            />
          </div>

          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}

          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default App;
