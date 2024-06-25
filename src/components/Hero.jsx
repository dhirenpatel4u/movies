import { useFetch } from "../hooks/useFetch";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { Button, Typography, Box } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";

const contentStyle = {
  textAlign: "center",
};
const Hero = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const { data, loading } = useFetch(
    `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&region=IN&sort_by=popularity.desc&primary_release_date.gte=2023-05-01&with_original_language=hi&page=1`
    // `${baseUrl}/discover/movie?${apiKey}&language=en-US&page=1`
  );

  if (loading) return <Loading />;
  return (
    <>
        <div> Movies Mania</div>
      <div style={{ padding: "0.5rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Typography color="primary">Discover Movies</Typography>
          <Link to="/allmovies" style={{ textDecoration: "none" }}>
            <Button
              color="primary"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              See more
            </Button>
          </Link>
        </Box>
        <Carousel arrows dots={false} infinite={false} effect="fade">
          {data &&
            data.map((film) => (
              <div style={contentStyle} key={film.id} className="carousel-item">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "0.1rem",
                    paddingTop: "1rem",
                  }}
                >
                  <Typography color="primary">{film.title}</Typography>

                  <Link to={`/movie/${film.id}`}>
                    <Button variant="contained">
                      <Typography>Watch Now</Typography>
                      <PlayCircleOutline />
                    </Button>
                  </Link>
                </Box>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
