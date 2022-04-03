import { ADD_CLIENT, DEL_CLIENT } from "./clientActions";

const initialState ={
   listClients:[]
}
const ClientReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_CLIENT:
            return {
                ...state,
                    listClients:state.listClients.concat(action.payload)
            }
        case DEL_CLIENT:
            return {
                ...state,
                    listClients:state.listClients.filter(c=>c.rut!==action.payload)
            }
        default:
            return state;
    }
}

export default ClientReducer