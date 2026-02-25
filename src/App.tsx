import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomeLayout from './layout/HomeLayout'
import { useAuth } from './context/AuthContext'
import Login from './pages/auth/Login'
import JobDetail from './pages/jobs/JobDetail'
import CreateJob from './pages/jobs/CreateJob'
import './App.css'
import CreateEnterprise from './pages/jobs/CreateEnterprise'
import RequestsJobs from './pages/jobs/RequestsJobs'
import RequestsLayout from './layout/RequestsLayout'
import RequestsCompanies from './pages/jobs/RequestsCompanies'
import Companies from './pages/jobs/Companies'
import AdminLayout from './layout/AdminLayout'

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
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="job/:id" element={<JobDetail />} />
        </Route>
        <Route path="/" element={<HomeLayout />}>
          <Route path="job/:id" element={<JobDetail />} />
        </Route>
        <Route path="/requests" element={<RequestsLayout />}>
          <Route path="jobs" element={<RequestsJobs />} />
          <Route path="companies" element={<RequestsCompanies />} />
        </Route>
        <Route path="/companies" element={<Companies />} />
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
