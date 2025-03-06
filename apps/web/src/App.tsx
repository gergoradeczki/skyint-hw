import { LoginPage } from './pages/login-page'
import { Layout } from './layouts/layout'
import { Route, Routes } from 'react-router'
import { StorePage } from './pages/store-page'
import { CartPage } from './pages/cart-page'
import { LoggedOutLayout } from './layouts/logged-out-layout'
import { LoggedInLayout } from './layouts/logged-in-layout'

function App() {

  return (
    <Layout>
      <Routes>
        <Route element={<LoggedOutLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<LoggedInLayout />}>
          <Route index element={<StorePage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
