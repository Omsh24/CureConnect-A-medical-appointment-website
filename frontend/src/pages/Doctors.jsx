import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Doctors = () => {

  const { speciality } = useParams()

  // console.log(speciality)

  const [filerDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const {doctors} = useContext(AppContext)

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary' : ''} `} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `} >
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`hover:bg-red-500 hover:text-white transition-all duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  cursor-pointer ${ speciality === "General physician" ? "bg-indigo-100 text-black" : "" }`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`hover:bg-red-500  hover:text-white transition-all duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  cursor-pointer ${ speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" }`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`hover:bg-red-500 transition-all hover:text-white duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  cursor-pointer ${ speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" }`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`hover:bg-red-500 transition-all hover:text-white duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${ speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" }`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`hover:bg-red-500 transition-all hover:text-white duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  cursor-pointer ${ speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" }`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`hover:bg-red-500 transition-all hover:text-white duration-300 w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded  cursor-pointer ${ speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" }`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filerDoc.map((item, index)=>(
              <div key={index} onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-red-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                  <img className='bg-red-100 hover:bg-red-300 transition-all duration-300' src={item.image} alt="" />
                  <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
              </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors