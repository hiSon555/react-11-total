import MovieSearch from "./MovieSearch.tsx";
import { PageContainer, Title } from "../../styles/Container.ts";


function Movie() {
    return (
        <PageContainer>
            <Title>
                <h1>Movie Search</h1>
                <p>영화를 검색하고 상세 정보를 확인해보세요.</p>
            </Title>
            <MovieSearch />
        </PageContainer>
    );
}

export default Movie;
