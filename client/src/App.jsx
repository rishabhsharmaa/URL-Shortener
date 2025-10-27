import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar';   

function App() {
  return (
    <BrowserRouter>
    <div className='bg-slate-100 min-h-screen text-slate-800'>

    
      <Navbar/>
      <main className="container mx-auto p-4 md:p-8">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/dashboard' element={<PrivateRoute><DashboardPage /></PrivateRoute>}/>
        </Routes>
      </main>
      </div>
    </BrowserRouter>
  );
}

export default App;