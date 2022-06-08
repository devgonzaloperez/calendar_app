import React from 'react';
import { useDispatch} from 'react-redux';
import { eventClearActiveEvent } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () =>{
        dispatch(eventClearActiveEvent())
        dispatch(uiOpenModal())
    }

    return (
        <div onClick={handleClickNew}>
            <button className="btn btn-primary fab">
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
};
