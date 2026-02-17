import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Enterprises from './pages/jobs/Enterprises'
import HomeLayout from './layout/HomeLayout'
import { useAuth } from './context/AuthContext'
import Login from './pages/auth/Login'
import JobDetail from './pages/jobs/JobDetail'
import CreateJob from './pages/jobs/CreateJob'
import './App.css'
import CreateEnterprise from './pages/jobs/CreateEnterprise'

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
        <Route path="/create-enterprise" element={<CreateEnterprise />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
