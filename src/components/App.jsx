import { Routes, Route } from "react-router-dom";

import Layout from './Layout/Layout'

import { Suspense, lazy } from "react";

import Home from '../pages/Home/Home'
import Movies from "pages/Movies/Movies";
import MovieDetails from "pages/MovieDetails/MovieDetails";
const Cast = lazy(() => import("./Cast/Cast"));
const Reviews = lazy(() => import("./Reviews/Reviews"))

function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='movies' element={<Movies />} />
        <Route path='movies/:movieId' element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<h1>Not found!</h1>}></Route>
        </Route>
      </Routes>
      </Suspense>
  );
};

export default App