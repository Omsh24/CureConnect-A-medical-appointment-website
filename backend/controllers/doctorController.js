import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

//yaha change availability waala hona chahiye tha ya nahi

const doctorList =async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])

        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}
 
//api for doctor login

const loginDoctor= async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:"Invalid credintials"})
        }

        const isMatch= await bcrypt.compare(password,doctor.password)

        if(isMatch){
            const token= jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

// api to get doctor appointments for doctor panel

const appointmentsDoctor= async (req,res)=>{
    try {
        const {docId}= req.body
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

//api to mark appointment completed

const appointmentComplete= async(req,res)=>{
    try {
        const {docId,appointmentId} = req.body
        const appointmentData= await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment completed'})
        }
        else{
            return res.json({success:false,mesagge:'Mark Failed'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

//api to cancel appointment for doctor panel

const appointmentCancel= async(req,res)=>{
    try {
        const {docId,appointmentId} = req.body
        const appointmentData= await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment cancelled'})
        }
        else{
            return res.json({success:false,mesagge:'cancellation Failed'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

//api to get dashboard data for doctor panel

const doctorDashboard = async (req,res)=>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        let earnings=0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount
            }
        })

        let patients=[]

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

// api to get doctor for doctor panel

const doctorProfile = async (req, res)=>{
    try {
        const {docId} = req.body
        const profileData= await doctorModel.findById(docId).select('-password')
        res.json({success:true,profileData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

// api to update profile data from doctor panel

const updateDoctorProfile= async(req,res)=>{
    try {
        const {docId,fees,address,available}= req.body
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({success:true,message:'profile updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.mesagge})
    }
}

export {doctorList , loginDoctor,
     appointmentsDoctor, appointmentComplete,
     appointmentCancel , doctorDashboard, doctorProfile,
    updateDoctorProfile }