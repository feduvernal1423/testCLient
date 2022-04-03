import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Form, Nav, Navbar, Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import {useSelector,useDispatch} from 'react-redux'
import { delClient } from '../store/clientActions'

const ListClients = () => {
  const lista=useSelector((store)=>store.clientReducer.listClients)
  const [listClientes, setListClientes]=useState(lista)
  const dispatch = useDispatch()
  const products=[{ rut:0, nombre:"cliente1", email:"cliente@gmail.com", patente:"3434", monedaIndemniza:"Pesos CLP", totalPagar:"3434",comuna:"Santiago", ciudad:"Santiago"},
  { rut:1, nombre:"cliente2", email:"cliente2@gmail.com", patente:"343433", monedaIndemniza:"Pesos CLP", totalPagar:"3434",comuna:"Santiago", ciudad:"Santiago"}
  ];
  const formatWithIcon = (cell,row,id) => {
    return(
        <span><Button onClick={()=>dispatch(delClient(row["rut"]))} >Eliminar</Button></span>
    )
  } 
  const columns=[{
      dataField: 'rut',
      text: 'Rut'
    }, {
      dataField: 'nombre',
      text: 'Nombre'
    }, {
      dataField: 'email',
      text: 'Email'
    }, {
      dataField: 'patente',
      text: 'Patente'
    }, {
      dataField: 'mondea',
      text: 'Moneda Indemniza'
    },
    {
      dataField: 'total',
      text: 'Total a Pagar'
    },  
    {
      dataField: 'comuna',
      text: 'Comuna'
    },  
    {
      dataField: 'ciudad',
      text: 'Ciudad'
    },{
      dataField: 'Eliminar',
      text: 'Eliminar',
      formatter: formatWithIcon,
      
    }
  ];
  
   const grabarCliente=async(lista)=>{
    try {
      const res = await axios.post("https://15fasj3enj.execute-api.us-east-1.amazonaws.com/desa/api/ingresa-persona",lista)      
      console.log(res.data, "post result")
    } catch (error) {
     console.log(error)
    
    }
    
   }
  return (   
    <Card style={{ margin: '20px' }}>
      <Card.Header style={{ backgroundColor: '#0275d8', color: 'white' }}>
        Clientes Ingresados
      </Card.Header>
      <Card.Body >
      <BootstrapTable
        keyField="rut"
        data={ lista }
        columns={ columns }
        bordered={ false }
        />
        <div className="d-flex justify-content-center">

        <Button 
           variant='success'
           onClick={()=>grabarCliente(lista)}
               
      >
                Grabar
         </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ListClients
