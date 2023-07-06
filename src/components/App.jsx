import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Home from '../pages/Home/Home'
import Movies from "../pages/Movies/Movies";
import MovieDetails from "pages/MovieDetails/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:movieId' element={<MovieDetails />}/>
      </Route>
      <Route path="*" element={<h1>Not found!</h1>}></Route>
    </Routes>
  );
};

export default App