import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MAPI_KEY } from "./MovieSearch.tsx";
import { PageContainer } from "../../styles/Container.ts";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopBackButton = styled.button`
    align-self: flex-start;
    padding: 8px 16px;
    border: 1px solid #e7e9ec;
    border-radius: 8px;
    background-color: #fff;
    color: #1976d2;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 20px;

    &:hover {
        background-color: #f4f6f8;
        border-color: #1976d2;
    }
`;

const Card = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
`;

const PosterBox = styled.div`
    width: 300px
`;

const Poster = styled.img`
    display: block;
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
    background-color: #f4f6f8;
`;

const Info = styled.div`
    flex: 1;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Label = styled.p`
    margin-bottom: 4px;
    font-size: 12px;
    color: #a0a0a0;
`;

const Value = styled.span`
    font-size: 16px;
    font-weight: 700;
`;

const Plot = styled.p`
    line-height: 1.7;
    color: #333;
`;

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
        <PageContainer>
            <Container>
                <Card>
                    <TopBackButton
                        onClick={() => {
                            navigate(-1);
                        }}>
                        &larr; Back
                    </TopBackButton>
                    <PosterBox>
                        <Poster src={movie.Poster} alt={movie.Title} />
                    </PosterBox>
                    <Info>
                        <h1>{movie.Title}</h1>
                        <div>
                            <Label>개봉 연도</Label>
                            <Value>{movie.Year}</Value>
                        </div>
                        <div>
                            <Label>장르</Label>
                            <Value></Value> {movie.Genre}
                        </div>
                        <div>
                            <Label>감독</Label>
                            <Value></Value> {movie.Director}
                        </div>
                        <div>
                            <Label>줄거리</Label>
                            <Plot dangerouslySetInnerHTML={{ __html: movie.Plot }}></Plot>
                        </div>
                    </Info>
                </Card>
            </Container>
        </PageContainer>
    );
}

export default MovieDetail;
