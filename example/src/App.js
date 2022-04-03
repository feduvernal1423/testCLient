import React from 'react'

import { ExampleComponent } from 'recupero-nuevo-modulo'
import 'recupero-nuevo-modulo/dist/index.css'
import FormAddClient from './components/FormAddClient'
import ListClients from './components/ListClients'

const App = () => {
  return (
    <>

      <FormAddClient/>
      <ListClients/>
  
    </>
  )
}

export default App
