import {BrowserRouter , Routes , Route} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';

function App(){
  return (
    <BrowserRouter>
    <div className="divcontainer">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route  path='/login' element ={<LoginPage/>}/>
        <Route path ='/register' element ={<RegisterPage/>}/>
        <Route path = '/dashboard' element ={<DashboardPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;