import React, { useState } from 'react'
import {Alert, Button, Form, Input} from 'antd'
import { NavLink } from 'react-router-dom'
import supabase from '../../supabase'
const Login = () => {
    
    const [state, setState] = useState({
        isLoading :false,
        isError : false
    })
    function handleSubmit(e){
        const {email, password} = e
        //setLoading jadi trure
        setState(prev=> prev = {
            ...prev,
            isLoading: true
        })

        supabase.auth.signInWithPassword({
            email, password
        })
        .then(res=>{
            setState(prev=> prev = {
                ...prev,
                isLoading: false
            })
            
            if(res.error){
                setState(prev=> prev = {
                    ...prev,
                    isError: true

                })
                return
                  
            }

        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
    <main className={`w-[100dvw] h-[100dvh] flex flex-col justify-center items-center bg-gradient-to-tr from-blue-900 to-blue-500`}>
    <div className={`w-[850px] bg-white shadow-md rounded-md flex h-[300px]`}>  
      {state.isError? (  <Alert 
        type='error'
        message = 'silahkan check data anda'
        closable
        showIcon
        className='absolute top-2 right-auto left-auto'
        description = "Silahkan Cek Kembali Data Anda"
        onClose={()=>{
            setState(prev=> prev={
                ...prev,
                isError:false
            })
        }}
        />) : null}
        <div className={`flex-1`}>
        <img 
        src="https://images.pexels.com/photos/25863005/pexels-photo-25863005/free-photo-of-makanan-dingin-kota-restoran.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
        alt="background"
        className={`object-cover w-full h-full`} />
        
        </div>
        
        
    <div className={`flex-1 p-6`}>
        <h1>
            Login Page
        </h1>
        <Form
         name='login-form'
         labelCol={{
            span :8
         }}
         wrapperCol={{
            span : 16
         }}
         onFinish={handleSubmit}
         className={`flex flex-col gap-4`}
        >
            <Form.Item
            label='email'
            id='email'
            name='email'
            rules={
                [
                    {
                        required : true,
                        message : "email wajib diisi"
                    },
                    {
                        type : "email",
                        message : "email tidak valid"
                    }
                ]
                }
            >
            <Input size='large'/>
            </Form.Item>
            
            <Form.Item
            label='password'
            id='password'
            name='password'
            rules={[{
                required : true,
                message : "password wajib diisi"
            }]}
            >
            <Input.Password size='large'/>
            </Form.Item>
            <Button
            loading={state.isLoading}
            disabled ={state.isLoading}
            type='primary' htmlType='submit' className={`ml-auto`}>
                Login
            </Button>

            <NavLink to={"/register"}>
                don't have account ? Login here
            </NavLink>
        </Form>
    </div>
    </div>

        
    </main>
  )
}

export default Login