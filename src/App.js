import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import PrivateComponent from './components/PrivateComponent'
import Addrecipe from './components/Addrecipe/Addrecipe'
import RecipeList from './components/RecipeList/RecipeList'
import Navbar from './components/Navbar/Navbar'
import UpdateComponent from './components/UpdateComponent/UpdateComponent'
import GetRecipeDetail from './components/GetRecipeDetail/GetRecipeDetail'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<RecipeList />} />
            <Route path='/add' element={<Addrecipe />} />
            <Route path='/update/:id' element={<UpdateComponent />} />
            <Route path='/getrecipe/:id' element={<GetRecipeDetail />} />
            <Route path='/logout' element={<h1>Logout </h1>} />
          </Route>


          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;