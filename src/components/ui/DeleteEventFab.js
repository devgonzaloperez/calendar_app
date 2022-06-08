import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'
import Swal from 'sweetalert2'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {if (result.isConfirmed) {
            dispatch(eventStartDelete())
        }})
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trahs"></i>
            <span>Borrar Evento</span>
        </button>
    )
}
