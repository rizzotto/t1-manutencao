import React from 'react';
import Routes from './Routes/routes';

import { UserContextProvider } from './Context/UserContext'

// esse arquivo apenas define uma nova função no prototype de React.Component, e isso só precisa ser executado (nenhum tipo é exportado pelo arquivo)
import './Utils/getParam';

const App = () => {

    return(
        <UserContextProvider>
            <Routes/>
        </UserContextProvider>
    )
}

export default App;