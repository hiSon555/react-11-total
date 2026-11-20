import BookSearch from "./BookSearch.tsx";
import { PageContainer, Title } from "../../styles/Container.ts";

function Book() {
    return (
        <PageContainer>
            <Title>
                <h1>Book Search</h1>
                <p>책을 검색하고 상세 정보를 확인해보세요</p>
            </Title>
            <BookSearch />
        </PageContainer>
    );
}

export default Book;
