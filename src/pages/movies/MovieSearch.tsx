import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import MovieSearchBar from "./MovieSerachBar.tsx";

type MDescription = {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
};

type MList = {
    Search: MDescription[];
};

export const MAPI_KEY = import.meta.env.VITE_OMDb_API_KEY;

function MovieSearch() {
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<MDescription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;
        setLoading(true);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=${MAPI_KEY}&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then((json: MList) => setList(json.Search))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log("알 수 없는 에러 + " + err.message);
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div>
            <h2>검색 키워드 : {keyword}</h2>

            <MovieSearchBar keyword={keyword ?? ""} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div>
                {Array.isArray(list)
                    ? list.map(movie => (
                          <Link to={`/movie/detail/${movie.imdbID}`}>
                              {movie.Poster ? (
                                  <img src={movie.Poster} alt={movie.Title} />
                              ) : (
                                  <div>No cover</div>
                              )}
                              <div>{movie.Title}</div>
                              <div>{movie.Year}</div>
                          </Link>
                      ))
                    : "검색 결과가 없습니다."}
            </div>
        </div>
    );
}

export default MovieSearch;
