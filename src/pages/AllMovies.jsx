import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/Card";
import { Grid, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const AllMovies = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const { data, loading } = useFetch(
   `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&primary_release_date.gte=2023-05-01&with_original_language=hi&page=${currentPage}`
    //`${baseUrl}/trending/movie/week?api_key=${apiKey}&language=en-US&page=${currentPage}`
  );

  useEffect(() => {
    setMovies(data);
  }, [data, currentPage]);

  if (loading) return <Loading />;

  return (
    <>
      <div style={{ padding: "2rem", marginBottom: "2.5rem" }}>
        <Typography variant="h5" color="primary" sx={{paddingBottom:"0.5rem"}}>
          All Movies
        </Typography>
        <Grid container spacing={2}>
          {movies &&
            movies.map((film) => {
              const posterImg = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
              return (
                <Grid item xl={2} xs={6} sm={4} md={3} key={film.id}>
                  <MovieCard
                    id={film.id}
                    key={film.id}
                    poster={posterImg}
                    title={film.title}
                    type="movie"
                  />
                </Grid>
              );
            })}
        </Grid>
        <Pagination page={currentPage} setPage={setCurrentPage} />
      </div>
    </>
  );
};

export default AllMovies;

// https://github.com/dezmymachine/stream-app/tree/main
// type={film.media_type}
// https://api.themoviedb.org/3/discover/movie?api_key=[MY_KEY]&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi
