import React from 'react'
import {Button, Form, Input} from 'antd'
import { NavLink } from 'react-router-dom'
import supabase from '../../supabase'


const Register = () => {
    
     function handleSubmit(e){
        let {email, password, repassword} = e
        //jika password dan repassword tidak sama
        if(password !== repassword){
            return alert("password harus sama !")
        }

        supabase.auth.signUp({
            email : email,
            password : password
        })
        .then(res=>{
            console.info(res)
        })
        .catch(error=>{
            console.info(error)
        })
    }

    return (
    <main className={`w-[100dvw] h-[100dvh] flex flex-col justify-center items-center bg-gradient-to-tr from-blue-900 to-blue-500`}>
    <div className={`w-[850px] bg-white shadow-md rounded-md flex h-auto`}>  
        <div className={`flex-1`}>
        <img 
        src="https://images.pexels.com/photos/25863005/pexels-photo-25863005/free-photo-of-makanan-dingin-kota-restoran.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
        alt="background"
        className={`object-cover w-full h-[400px]`} />
        
        </div>
        
        
    <div className={`flex-1 p-6`}>
        <h1>
            Register Page
        </h1>
        <Form
         name='register-form'
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

            <Form.Item
            label='repassword'
            id='repassword'
            name='repassword'
            rules={[{
                required : true,
                message : "repassword wajib diisi"
            }]}
            >
            <Input.Password size='large'/>
            </Form.Item>


            <Button type='primary' htmlType='submit' className={`ml-auto`}>
                Register
            </Button>

            <NavLink to={"/"}>
                have account ? Login here
            </NavLink>
        </Form>
    </div>
    </div>

        
    </main>
  )
}

export default Register