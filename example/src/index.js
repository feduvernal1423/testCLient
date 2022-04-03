import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import clientStore from './store/clientStore'

ReactDOM.render(  
<Provider store={clientStore}>

    <App />
</Provider>
, document.getElementById('root'))
