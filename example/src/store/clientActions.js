export const ADD_CLIENT = 'ADD_CLIENT';
export const DEL_CLIENT = 'DEL_CLIENT';
export const addClient =(newClient)=>{
    return {
        type : ADD_CLIENT,
        payload:newClient
    }
}
export const delClient =(id)=>{
    return {
        type : DEL_CLIENT,
        payload:id
    }
}