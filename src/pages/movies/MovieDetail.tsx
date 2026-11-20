import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MAPI_KEY } from "./MovieSearch.tsx";

type MovieInfo = {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
};

function MovieDetail() {
    const navigate = useNavigate();

    const { imdbID } = useParams();

    const [movie, setMovie] = useState<MovieInfo | null>(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${MAPI_KEY}&i=${imdbID}&plot=full`).then(res =>
            res
                .json()
                .then((json: MovieInfo) => setMovie(json))
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        console.log(err.message);
                    }
                }),
        );
    }, [imdbID]);

    if (!imdbID) return <div>잘못된 영화 정보입니다.</div>;

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; Back
            </button>
            <div>
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div>
                <h1>{movie.Title}</h1>
                <div>
                    <span>Year:</span> {movie.Year}
                </div>
                <div>
                    <span></span> {movie.Genre}
                </div>
                <div>
                    <span></span> {movie.Director}
                </div>
            </div>
            <p dangerouslySetInnerHTML={{ __html: movie.Plot }}></p>
        </div>
    );
}

export default MovieDetail;