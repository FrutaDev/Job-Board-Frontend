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
import CompanyDetail from './pages/jobs/CompanyDetail'
import Companies from './pages/jobs/Companies'
import AdminLayout from './layout/AdminLayout'
import AdminCompaniesLayout from './layout/AdminCompaniesLayout'
import NotFound from './pages/NotFound'
import { handlePostulate } from './helpers/jobs/handlePostulate'
import PostulationRealizedComponent from './components/jobs/PostulationRealizedComponent'
import PostulationReceivedComponent from './components/jobs/PostulationReceivedComponent'
import PostulationRealized from './pages/jobs/PostulationRealized'
import PostulationReceived from './pages/jobs/PostulationReceived'

function App() {

  const { token } = useAuth()

  const handleApply = (jobId: string) => {
    (async () => {
      await handlePostulate(jobId)
    })()
  }

  const handleAcceptRejectJob = (jobId: string, status: string) => {
    console.log(`Setting job ${jobId} to ${status}`)
  }

  const handleAcceptRejectCompany = (companyId: string, status: string) => {
    console.log(`Setting company ${companyId} to ${status}`)
  }

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
          <Route path="job/:id" element={<JobDetail handleAcceptReject={handleAcceptRejectJob} />} />
        </Route>

        <Route path="/admin/companies" element={<AdminCompaniesLayout />} >
          <Route path="company/:id" element={<CompanyDetail handleAcceptReject={handleAcceptRejectCompany} />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route path="job/:id" element={<JobDetail handleApply={handleApply} />} />
        </Route>

        <Route path='/postulates' element={<RequestsLayout />}>
          <Route path="jobs" element={<PostulationRealized />} />
          <Route path="companies" element={<PostulationReceived />} />
        </Route>

        <Route path="/requests" element={<RequestsLayout />}>
          <Route path="jobs" element={<RequestsJobs />} />
          <Route path="companies" element={<RequestsCompanies />} />
        </Route>

        <Route path="/companies" element={<Companies />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/create-enterprise" element={<CreateEnterprise />} />
        <Route path="*" element={<NotFound />} />
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
