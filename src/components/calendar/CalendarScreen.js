import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import {Calendar, momentLocalizer} from 'react-big-calendar'; //Antes la importación era BigCalendar ahora es Calendar.
import 'react-big-calendar/lib/css/react-big-calendar.css'; //Styles de BigCalendar;
import moment from 'moment';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
//import { messages } from '../../helpers/messages-es'; //Idioma español para BigCalendar. Si lo quiero aplicar, debería enviar messages vía props en calendar (messages={messages}). Luego , habría que modificarle el idioma a moment a español.
//import 'moment/locale/es'; //Idioma español para moment. Si lo quiero en español tendría que escribir moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "month");
    const dispatch = useDispatch();
    const events = useSelector(state => state.calendar.events);
    const activeEvent = useSelector(state => state.calendar.activeEvent);
    const {uid} = useSelector(state=> state.auth);

    useEffect(()=>{
        dispatch(eventStartLoading())
    }, [dispatch])
    
    const onSelect = (e) =>{ //Click simple.
        dispatch(eventSetActive(e))
    }

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectSlot = (e) =>{ //Nos devuelve la fecha en la que hicimos click. Debe estar incorporado el evento en Calendar y tener la propiedad selectable en true. Por ende, la podemos usar para que, siempre que se haga click fuera del activeEvent, el mismo deje de ser activeEvent.
        if(e.start !== activeEvent.start){ //Si la fecha en la que hicimos click es diferente a la fecha en la que empieza el evento..
            dispatch(eventClearActiveEvent()) //Limpiar el activeevent.
        }
    }
    
    const onViewChange = (e) =>{ //Sirve para establecer cual fue la última vista. Luego, la aplicamos en la prop view de Calendar para que, al hacer refresh, aparezca la última que habíamos utilizado.
        //console.log(e) //Devuelve month/day/week/agenda dependiendo la sección a la que entremos.
        setLastView(e);
        localStorage.setItem('lastView' , e);
    }

    const eventStyleGetter = (event, start, end, isSelected) =>{ //Sirve para aplicar estilos.
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7': '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {style}
    }

    return (
        <>
            <Navbar/>
            <Calendar 
                localizer={localizer} 
                events={events} 
                startAccessor="start" 
                endAccessor="end" 
                eventPropGetter={eventStyleGetter} 
                components={{event: CalendarEvent}} 
                onSelectEvent={onSelect} 
                onDoubleClickEvent={onDoubleClick} 
                onSelectSlot={onSelectSlot} 
                selectable={true} 
                onView={onViewChange} 
                view={lastView}
            />
            {activeEvent && <DeleteEventFab/>}
            <AddNewFab/>
            <CalendarModal/>
        </>
    )
}