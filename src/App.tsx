import { useEffect } from 'react'
import { API } from './axios/url'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Enterprises from './pages/Enterprises'
import HomeLayout from './layout/HomeLayout'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import JobDetail from './pages/JobDetail'
import CreateJob from './pages/CreateJob'
import './App.css'

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
          <Route path="/job/:id" element={<JobDetail />} />
        </Route>
        <Route path="/enterprises" element={<Enterprises />} />
        <Route path="/create-job" element={<CreateJob />} />
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
