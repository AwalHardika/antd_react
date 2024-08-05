import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {AiOutlineDashboard, AiOutlineUser, AiOutlineSetting, AiOutlineMenu, AiOutlineLogout} from "react-icons/ai"
import { Menu } from 'antd'
import supabase from '../supabase'


const Layout = () => {
    const navigate = useNavigate()
    const [collapse, setCollapse]= useState(false)
    const [userEmail, setUserEmail] = useState(null)
    const list_menu = [
        {
            key : "toggleMenu",
            icon : <AiOutlineMenu/>,
            onClick : ()=>{
                setCollapse(prev => !prev)
            }
        },
        {
            key : "/",
            icon: <AiOutlineDashboard/>,
            label: "dashboard",
            onClick : ()=>{
                navigate('/')
            }
        },
        {
            key : "/attendances",
            icon : <AiOutlineUser/>,
            label : 'attendances',
            onClick : ()=>{
                navigate('/attendances')
            }
        },
        {
            key : '/setting',
            icon : <AiOutlineSetting/>,
            label : "setting",
            onClick : ()=>{
                navigate('/setting')
            }
        },
    ]
    const h_list_menu = [
        {
            key : "user",
            label : userEmail,
            icon : <AiOutlineUser/>,
            children : [
                {
                    key : "setting",
                    label : "setting",
                    icon : <AiOutlineSetting/>
                },
                {
                    key : "/logout",
                    label : "logout",
                    icon : <AiOutlineLogout/>,
                    onClick : ()=>{
                        supabase.auth.signOut()
                        .then(res=>{
                            console.info(res)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                }
            ]

        }
    ]

    //mendapatkan location pathname
    let location = useLocation()
    useEffect(()=>{
        supabase.auth.getSession()
        .then(res=>{
            setUserEmail(res.data.session.user.email)
        })
    }, [])
    return (
    <main className={`flex w-[100dvw] h-[100dvh]`}>
    <div className={`h-full flex flex-col sticky top-0 left-0`}>
        <Menu 
            defaultSelectedKeys={[location.pathname]}
            items={list_menu}
             mode='inline'
            inlineCollapsed={collapse}
            className={`h-full ${!collapse && "w-[200px]"} `}
        />
    </div>


    <div className={`flex-[1] min-h-[100dvh] overflow-y-auto`}>
    <Menu 
    mode='horizontal'
    items={h_list_menu}
    className='justify-end px-24'
    />
        <div className='h-[200dvh] w-full max-w-[1200px] mx-auto'>
            <Outlet/>
        </div>
    </div>
        
    </main>
  )
}

export default Layout 