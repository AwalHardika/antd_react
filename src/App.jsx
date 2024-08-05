import React, { useEffect, useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Login from './screen/login/Login'
import Layout from './screen/Layout'
import PageNotFound from './screen/PageNotFound'
import supabase from './supabase'
import Register from './screen/login/Register'
import Attendances from './screen/attendances/Attendances'

const App = () => {

  const [session, setSession] = useState(false)
  useEffect(()=>{

    supabase.auth.getSession()
    .then(({data : {session}})=>{
      console.log(session)  
      setSession(session)
    })

    const {
      data : {subscription}
    } = supabase.auth.onAuthStateChange((_event, session)=>{
      setSession(session)
    })
    //ketika component unMount atau user newTab maka subsctription akan di unscrip, ini mengacu pada penggunaan memori jika kalian berlangganan ke server yang berbayar
    return ()=>  subscription.unsubscribe()

  }, [])



  if(!session){
    return (
      <Routes>
        <Route path='/' element ={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path='/attendances' element={<Attendances/>}/>
          <Route path='/setting' element={<h1>Setting</h1>}/>
          <Route path='*' element ={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App