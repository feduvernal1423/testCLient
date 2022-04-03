import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addClient } from '../store/clientActions'
import yupValidations from '../Validations/yupValidations'

const FormAddClient = () => {
  const [monedas, setMonedas] = useState([])
  const [comunas, setComunas] = useState([])
  const [ciudad, setCiudad] = useState('')
  const [formData, setFormData] = useState({})
  const [tipoMoneda, setTipoMoneda]=useState(null)
  const [totalPagar, setTotalPagar]=useState("")
  const [prevTotal, setPrevTotal]=useState("")
  const [rut, setRut]=useState("")

  const listClientSotore = useSelector(
    (store) => store.clientReducer.listClients
  )
  const dispatch = useDispatch()
  const getMoneda = async () => {
    const moneda = await axios.get(
      'https://15fasj3enj.execute-api.us-east-1.amazonaws.com/desa/api/monedas?q=ewogICJwYWlzIjogIjU2IiwKICAiY2xhc0JpZW4iOiAiMTIwMDEiCn0='
    )
    setMonedas(moneda.data.object)
    console.log(moneda.data.object)
  }
  const getComuna = async () => {
    const comuna = await axios.get(
      'https://15fasj3enj.execute-api.us-east-1.amazonaws.com/desa/api/generales?q=ewoicnV0Q2lhIjo5OTA2MTAwMCwKInBhcmFtZXRybyI6IDQ1Cn0='
    )
    setComunas(comuna.data.object)
    console.log(comuna.data.object)
  }
  useEffect(() => {
    getMoneda()
    getComuna()
  }, [])

  const formik = useFormik({
    initialValues: {
      rut: '',
      nombre: '',
      email: '',
      patente: '',
      mondea: '',
      total: '',
      comuna: '',
      ciudad: ''
    },
    validationSchema:yupValidations,
    onSubmit: (formData) => {
       
        formData["ciudad"]=ciudad          
        dispatch(addClient(formData));        
        formik.resetForm();
        setTotalPagar("")
        setCiudad("")
        setRut("")
    }
  })
  function noDecimal( event ) {
  
    var e = event || window.event;
    var key = e.keyCode || e.which;

    if ( key === 110 || key === 190 || key === 188 || key === 107|| key === 109  ) {     
        
       e.preventDefault();     
    }
}


function formato_monto(valor, aceptaNegativos) {
  if( aceptaNegativos === null ) aceptaNegativos = false;
 
  if (valor === null) {
      return "";
  }
 
  valor = valor.toString().split('.').join('');
  var cont = 0;
  var formato = "";
  var regex = aceptaNegativos ? /^\-?\d*$/ : /^\d*$/;
 
  if (valor.length === 0) {
      return "";
  } else if (valor.length > 1 && regex.test(valor)) {
      let negativo = valor.startsWith("-");
      if( aceptaNegativos && negativo ) valor = valor.substring(1);
     
      for (var i = valor.length - 1; i >= 0; i--) {
          formato = valor.substring(i, i+1) + formato;
          cont++;
          if (cont === 3 && i !== 0) {
              formato = "." + formato;
              cont = 0;
          }
      }
     
      if( aceptaNegativos && negativo ) formato = "-" + formato;
      return formato;
  } else {
      return regex.test(valor) ? valor : formato_monto(valor.substring(0, valor.length - 1));
  }
}
function formato_rut(srut) {   
  if (srut === null || srut === 0) {
      return "";
  }

  var cont = 0;
  var formato;

  srut = srut.split('.').join('');
  srut = srut.split('-').join('');

  var regex = /^(\d*)[k|K|0-9]{1}$/;

  if (srut.length === 0) {
      return "";
  } else if (srut.length > 1 && regex.test(srut)) {
      formato = "-" + srut.substring(srut.length - 1);
      for (var i = srut.length - 2; i >= 0; i--) {
          formato = srut.substring(i, i+1) + formato;
          cont++;
          if (cont === 3 && i !== 0) {
              formato = "." + formato;
              cont = 0;
          }
      }
      return formato;
  } else {
      return regex.test(srut) ? srut : formato_rut(srut.substring(0, srut.length - 1));
  }
}



  return (
    <Card style={{ margin: '20px' }}>
      <Card.Header style={{ backgroundColor: '#0275d8', color: 'white' }}>
        Ingreso Cliente
      </Card.Header>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div
            className='row'
            style={{ marginLeft: '10px', marginTop: '10px' }}
          >
            <div className='col-9'>
              <div className='row mb-4'>
                <Form.Group className='mb-3 col-3' controlId='formBasicEmail'>
                  <Form.Label className='mb-0'>Rut cliente</Form.Label>
                  <Form.Control
                    placeholder='Rut cliente'
                    onChange={e=>setRut(e.target.value)}
                    onBlur={e=>setRut(formato_rut(rut))}
                    name='rut'
                    value={formik.values.rut=rut}
                    error={formik.errors.rut}
                  />
                 {formik.errors.rut ? (<Form.Text variant="danger" style={{color:"red"}} >{formik.errors.rut}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-3'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Nombre</Form.Label>
                  <Form.Control
                    placeholder='Nombre'
                    onChange={formik.handleChange}
                    name='nombre'
                    value={formik.values.nombre}
                    error={formik.errors.nombre}
                  />
                  {formik.errors.nombre ? (<Form.Text style={{color:"red"}} >{formik.errors.nombre}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-3'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Email</Form.Label>
                  <Form.Control
                    placeholder='Email'
                    onChange={formik.handleChange}
                    name='email'
                    value={formik.values.email}
                    error={formik.errors.email}
                  />
                  {formik.errors.email ? (<Form.Text style={{color:"red"}} >{formik.errors.email}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-3'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Patente</Form.Label>
                  <Form.Control
                    placeholder='Patente'
                    onChange={formik.handleChange}
                    name='patente'
                    value={formik.values.patente}
                    error={formik.errors.patente}
                  />
                  {formik.errors.patente ? (<Form.Text style={{color:"red"}} >{formik.errors.patente}</Form.Text>) :null}
                </Form.Group>
                {/* <div className='col-3' style={{backgroundColor:"red", marginRight:'10px'}}>dfdf</div> */}
              </div>
            </div>
          </div>
          <div className='row' style={{ marginLeft: '10px' }}>
            <div className='col-11'>
              <div className='row mb-4'>
                <Form.Group className='mb-3 col-3' controlId='formBasicEmail'>
                  <Form.Label className='mb-0'>Moneda Indemniza</Form.Label>
                  <Form.Select
                    aria-label='Default select example'
                    onChange={e=>{   
                        setTipoMoneda(e.target.value)                       
                        formik.handleChange(e)
                        }}
                    name='mondea'
                    value={formik.values.mondea}
                    error={formik.errors.mondea}
                  >
                    <option>Seleccione...</option>
                    {monedas && monedas.length
                      ? monedas.map((m) => (
                          <option value={m.id} key={m.id}>
                            {m.nombre}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                  {formik.errors.mondea ? (<Form.Text variant="danger" style={{color:"red"}} >{formik.errors.mondea}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-3'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Total a pagar</Form.Label>
                  <Form.Control
                    //type="number"
                    onFocus={()=>{                                             
                     if(tipoMoneda==="30001"){ setTotalPagar(prevTotal.split(",")[0])}
                      else{
                        if(totalPagar.includes(",")){
                          setTotalPagar(prevTotal.split(",")[0]+","+(prevTotal.split(",")[1])?.slice(0,2))
                         
                          }
                         else setTotalPagar(prevTotal)
                      }
                      }
                      }
                    onBlur={()=>{
                      if(tipoMoneda==="30001"){
                       setPrevTotal(totalPagar)
                       setTotalPagar(formato_monto(totalPagar))

                      }else{ 
                        if(totalPagar.includes(",")){
                          setPrevTotal(totalPagar)                          
                          setTotalPagar(formato_monto(totalPagar)+","+(totalPagar.split(",")[1])?.slice(0,2))                          
                          }  else
                           {setTotalPagar(formato_monto(totalPagar)) }       
                      }
                      }}
                    onKeyDown={ tipoMoneda==="30001" ? e=>noDecimal(e):null}                           
                    placeholder='Nombre'                   
                    onChange={e=>{
                        setTotalPagar(e.target.value)                        
                        }}
                    name='total'
                    value={formik.values.total =totalPagar}
                    error={formik.errors.total}
                  />
                  {formik.errors.total ? (<Form.Text  style={{color:"red"}} >{formik.errors.total}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-4'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Comuna</Form.Label>
                  <Form.Select
                    aria-label='Default select example'
                    onChange={e=>{ 
                        const comunaActual=comunas.find(c=>c.id===e.target.value)
                        console.log(comunas.find(c=>c.id===e.target.value) )
                        setCiudad(comunaActual.atr4)
                        console.log(e.target.value)                      
                        formik.handleChange(e)
                        }}
                    name='comuna'
                    value={formik.values.comuna}
                    error={formik.errors.comuna}
                  >
                    <option>Seleccione...</option>
                    {comunas && comunas.length
                      ? comunas.map((c) => (
                          <option value={c.id} key={c.id}>
                            {c.nombre}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                  {formik.errors.comuna ? (<Form.Text  style={{color:"red"}} >{formik.errors.comuna}</Form.Text>) :null}
                </Form.Group>

                <Form.Group
                  className='mb-3 col-2'
                  controlId='formBasicPassword'
                >
                  <Form.Label className='mb-0'>Ciudad</Form.Label>
                  <br></br>
                  
                  <Form.Control placeholder='Ciudad' name='ciudad' onChange={formik.handleChange}
                    name='ciudad'
                    onChange={formik.handleChange}
                    value={ciudad}
                    />
                    {/* {formik.errors.ciudad ? (<Form.Text variant="danger" style={{color:"red"}} >{formik.errors.ciudad}</Form.Text>) :null} */}
                </Form.Group>
                {/* <div className='col-3' style={{backgroundColor:"red", marginRight:'10px'}}>dfdf</div> */}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-8'></div>
            <div className='col-4 d-flex justify-content-around'>
              <Button
                variant='secondary'
               
                onClick={(e) => {
                  formik.resetForm()
                  
                }}
              >
                Limpiar
              </Button>

              <Button
                variant='success'
                type="onSubmit"
               
                
              >
                Agregar Cliente
              </Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default FormAddClient
