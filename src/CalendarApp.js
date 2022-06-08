import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './components/routers/AppRouter';
import './../src/styles.css';
import { store } from './store/store';

export const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </>
    )
};
