import { useEffect, useState } from 'react'
import { API } from './axios/url'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layout/RootLayout'
import Enterprises from './pages/Enterprises'
import JobsPositions from './pages/JobsPositions'
import HomeLayout from './layout/HomeLayout'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'

function App() {

  const { token } = useAuth()

  if (!token) {
    return (
      <>
        <Login />
      </>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/enterprises" element={<Enterprises />} />
        <Route path="/job-positions" element={<JobsPositions />} />
      </Route>
    )
  );

  useEffect(() => {
    const testApi = async () => {
      const response = await API.get('/')
      console.log(response.data)
    }
    testApi()
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
