import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AppNavbar } from './components/common/Navbar/Navbar'
import { Footer } from './components/common/Footer/Footer'
import { HomePage } from './pages/HomePage'
import PigmentsPage from './pages/PigmentsPage'
import { PigmentDetailPage } from './pages/PigmentDetailPage'
import { ROUTES } from './Routes'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="app-layout">
    <AppNavbar />
    <main className="main-content">
      {children}
    </main>
    <Footer />
  </div>
)

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Layout>
        <HomePage />
      </Layout>
    )
  },
  {
    path: ROUTES.PIGMENTS,
    element: (
      <Layout>
        <PigmentsPage />
      </Layout>
    )
  },
  {
    path: `${ROUTES.PIGMENTS}/:id`,
    element: (
      <Layout>
        <PigmentDetailPage />
      </Layout>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
