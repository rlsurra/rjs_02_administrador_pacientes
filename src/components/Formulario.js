import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

const Formulario = ({agregarCita}) => {

    //Arranca vacio porque se va agregando a medida que el usuario ingresa
    const [ cita, setCita ] = useState({
         mascota: '',
         propietario: '',
         fecha: '',
         hora: '',
         sintomas: ''
     })

    const [ error, setError ] = useState(false)

    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
     }

    const {mascota,propietario,fecha,hora,sintomas } = cita;

    const submitCita = (e) => {
        e.preventDefault(); //Evita que lo envia por GET

        //Validacion
        if(     mascota.trim() === ''
             || propietario.trim() === ''
             || fecha.trim() === ''
             || hora.trim() === ''
             || sintomas.trim() === ''
            ){
                setError(true);
                return;
        }

        setError(false); //Para cuando dsp lo completo OK

        //Asignacion de ID (key)
        cita.id = uuid(); //key

        //Crear la cita -> state del componente principal (App)
        agregarCita(cita);

        //Reiniciar el format
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
 

    return ( 
        <Fragment>

            <h2> CREAR CITA </h2>

            <form
                onSubmit={submitCita}
            >

                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    placeholder="Nombre de la mascota"
                    className="u-full-width"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    placeholder="Nombre del Dueño"
                    className="u-full-width"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />           

                <label>Sintomas</label>
                <textarea
                    type="text"
                    name="sintomas"
                    placeholder="Descripcion de la situacion"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Enviar</button>

                { error ? <p m={2} className = "alerta-error"> Todos los campos son obligatorios </p> : null}

            </form>

        </Fragment>
     );

}

//Una forma de hacer check types
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;