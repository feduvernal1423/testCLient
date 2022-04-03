import React from 'react'
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'



export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
   
      

}
