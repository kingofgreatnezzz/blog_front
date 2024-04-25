import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from "./types"

import axios from "axios"

export const sign_up = (full_name, email, password, re_password) => async dispatch => {
    dispatch({
        type: START1
    })
    
    const config = {
        headers : {
            'Content-Type': 'application/json',
        }
        }

    const body = JSON.stringify({full_name, email, password, re_password})
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/`, body, config)
        if(res.data){
            dispatch({
            type: SIGNUP_SUCCESS,
            payload: true,
        }) 
        }else{
            dispatch({
                type: SIGNUP_FAIL,
                payload: true,
            })   
        }
      

    }catch(error){
        dispatch({
            type: SIGNUP_FAIL,
            payload: error,
        })
    }
 }