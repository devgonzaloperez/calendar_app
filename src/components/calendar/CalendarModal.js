import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import './../../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: 1
  },
};

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = moment().minutes(0).seconds(0).add(2, 'hours');

const initialState = {
  title: 'Evento',
  notes: '',
  start: now.toDate(),
  end: nowPlusOne.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const [formValues, setFormValues] = useState(initialState);

    const {title, notes, start, end} = formValues;

    const dispatch = useDispatch();

    useEffect(() => {
      if ( activeEvent ) {
          setFormValues( activeEvent );
      } else {
          setFormValues( initialState );
      }
    }, [activeEvent, setFormValues])

    const handleStartDateChange = (e) =>{
        setFormValues({
          ...formValues,
          start: e
        })
    }

    const handleEndDateChange = (e) =>{
        setFormValues({
          ...formValues,
          end: e
        })
    }

    const handleInputChange = (e) =>{
      setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      const momentStart = moment(start);
      const momentEnd = moment(end);

      if(momentStart.isSameOrAfter(momentEnd)){
          return Swal.fire("Error", "La fecha FIN debe ser posterior a la fecha INICIO.")
      }

      if(title.trim().length < 1){
          return Swal.fire("Error", "El título del evento no puede estar vacío.")
      }

      if (activeEvent){ //Si el evento existe, 
        dispatch(eventStartUpdate(formValues)) //lo podemos actualizar.
        console.log("Se ha actualizado un evento.")
      }
      else{ //Si el evento no existe,
        dispatch(eventStartAddNew({ //lo creamos.
          ...formValues
        }))
      }
      
      closeModal()

    }

    const closeModal = () =>{
      dispatch(eventClearActiveEvent())
      dispatch(uiCloseModal())
      setFormValues(initialState)
    }

    return (
        <Modal 
            className="modal" 
            overlayClassName="modal-fondo" 
            style={customStyles} 
            isOpen={modalOpen} 
            onRequestClose={closeModal}
            closeTimeoutMS={200}
        >
        
            <h1> {activeEvent ? activeEvent.title : "Nuevo evento"} </h1>
            
            <hr/>
            
            <form className="container" onSubmit={handleSubmit}>

              <div className="form-group">
                  <label>Fecha y Hora Inicio</label>
                  <DateTimePicker className="form-control" onChange={handleStartDateChange} value={start}/>
              </div>

              <div className="form-group">
                  <label>Fecha y Hora Fin</label>
                  <DateTimePicker className="form-control" onChange={handleEndDateChange} value={end} minDate={start}/>
              </div>

              <hr/>

              <div className="form-group">
                  <label>Titulo y Notas</label>
                  <input type="text" className="form-control" placeholder="Título del evento" name="title" onChange={handleInputChange} value={title} autoComplete="off"/>
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
              </div>

              <div className="form-group">
                  <textarea type="text" className="form-control" placeholder="Notas" rows="5" name="notes" onChange={handleInputChange} value={notes}></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
              </div>

              <button type="submit" className="btn btn-outline-primary btn-block">
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
              </button>

            </form>
      
        </Modal>
    )
}
