import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import MovieSearchBar from "./MovieSerachBar.tsx";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopCard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
`;

const TopHead = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h2 {
        font-size: 18px;
        color: #1976d2;
    }

    p {
        font-size: 12px;
        color: #a0a0a0;
    }
`;

const BottomCard = styled.section`
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
`;

const Message = styled.p`
    padding: 24px 0;
    text-align: center;
    font-size: 14px;
    color: #a0a0a0;
`;

const BottomWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const MovieCard = styled(Link)`
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #e7e9ec;
    border-radius: 18px;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        border-color: #1976d2;
    }
`;

const MoviePoster = styled.img`
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f4f6f8;
`;

const MovieNoCover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    background-color: #f4f6f8;
    color: #a0a0a0;
    font-size: 12px;
`;

const MovieTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
`;

const MovieYear = styled.div`
    font-size: 12px;
    color: #a0a0a0;
`;

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
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
        <Container>
            <TopCard>
                <TopHead>
                    <h2>
                        Search Keyword : <span style={{ color: "black" }}>{keyword}</span>
                    </h2>
                </TopHead>
                <MovieSearchBar keyword={keyword ?? ""} />
            </TopCard>

            <BottomCard>
                {!keyword &&<Message>아직 검색한 영화가 없어요</Message>}
                {loading && <Message>Loading...</Message>}
                {error && <Message>{error}</Message>}
                <BottomWrap>
                    {Array.isArray(list)
                        ? list.map(movie => (
                              <MovieCard to={`/movie/detail/${movie.imdbID}`}>
                                  {movie.Poster ? (
                                      <MoviePoster src={movie.Poster} alt={movie.Title} />
                                  ) : (
                                      <MovieNoCover>No cover</MovieNoCover>
                                  )}
                                  <MovieTitle>{movie.Title}</MovieTitle>
                                  <MovieYear>{movie.Year}</MovieYear>
                              </MovieCard>
                          ))
                        : "검색 결과가 없습니다."}
                </BottomWrap>
            </BottomCard>
        </Container>
    );
}

export default MovieSearch;
