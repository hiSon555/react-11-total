import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import MovieSearchBar from "./MovieSerachBar.tsx";
import styled from "styled-components";
import { HoverCard } from "../../styles/Card.ts";
import { Message } from "../../styles/Submit.ts";
import { Wrap } from "../../styles/Container.ts";

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
        <div>
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
                    {!keyword && <Message>아직 검색한 영화가 없어요</Message>}
                    {loading && <Message>Loading...</Message>}
                    {error && <Message>{error}</Message>}
                    <Wrap>
                        {Array.isArray(list)
                            ? list.map(movie => (
                                  <HoverCard to={`/movie/detail/${movie.imdbID}`}>
                                      {movie.Poster ? (
                                          <MoviePoster src={movie.Poster} alt={movie.Title} />
                                      ) : (
                                          <MovieNoCover>No cover</MovieNoCover>
                                      )}
                                      <MovieTitle>{movie.Title}</MovieTitle>
                                      <MovieYear>{movie.Year}</MovieYear>
                                  </HoverCard>
                              ))
                            : "검색 결과가 없습니다."}
                    </Wrap>
                </BottomCard>
            </Container>
        </div>
    );
}

export default MovieSearch;
