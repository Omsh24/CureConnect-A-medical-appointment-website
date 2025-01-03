import { createContext, useState } from "react";
//import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify'
// <<<<<<< HEAD
// import {create}
// =======
import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token,setToken] = useState('')


    const getDoctorsData=async ()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/doctor/list')

            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        currencySymbol,
        token,setToken,
        backendUrl
    }

    useEffect(()=>{
        getDoctorsData()
    })

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
