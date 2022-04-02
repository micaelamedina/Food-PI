import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';
import RecipeCreate from './components/RecipeCreate';
import ErrorPage from './components/ErrorPage';
import AboutMe from './components/AboutMe';


function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path={'/'} element={<LandingPage/>}/>
          <Route exact path={'/about'} element={<AboutMe/>}/>
          <Route exact path={'/home'} element={<Home />}/>
          <Route exact path={'/recipe/:idRecipe'} element={<RecipeDetail />}/>
          <Route exact path={'/recipes/create'} element={<RecipeCreate />}/>
          <Route path={'/*'} element={<ErrorPage/>}/>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
