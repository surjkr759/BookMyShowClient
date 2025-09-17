import { Routes, Route, useParams } from 'react-router-dom'
import SignInScreen from './screens/signin'
import SignUpScreen from './screens/signup'
import AdminPage from './screens/admin'
import HomePage from './screens/common/HomePage'
import MovieById from './screens/common/MovieById'
import Login_error from './screens/common/Login_error'
import CopyCard from './screens/common/CopyCard'
import PaymentSuccess from './screens/common/PaymentSuccess'
import MyBookings from './screens/common/MyBookings'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignUpScreen />} />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/movie/:id' element={<MovieById />} />
      {/* <Route path='/movie/:id/schedule' element={<MovieById />} /> */}
      <Route path='/login_error' element={<Login_error />} />
      <Route path='/copy_card' element={<CopyCard />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/bookings" element={<MyBookings />} />
    </Routes>
  )
}

export default App
