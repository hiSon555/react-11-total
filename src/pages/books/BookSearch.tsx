import { Wrap } from "../../styles/Container.ts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router";
import { HoverCard, NormalCard } from "../../styles/Card.ts";
import BookSearchBar from "./BookSearchBar.tsx";

const Container = styled.div`
    flex: 1;
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

    h2 {
        font-size: 18px;
        color: #1976d2;
    }

    span {
        color: #000;
    }
`;

const BottomMessage = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 240px;
    font-size: 14px;
    color: #a0a0a0;
`;

const BookCover = styled.img`
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f4f6f8;
`;

const BookNoCover = styled.div`
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

export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        imageLinks?: {
            thumbnail: string;
        };
        authors?: string[];
        description?: string | undefined;
    };
};

const BookTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
`;

const BookAuthor = styled.div`
    font-size: 12px;
    color: #a0a0a0;
`;


export const BAPI_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type ApiResponse = {
    kind: string;
    totalItems: number;
    items: Book[];
};

function BookSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=20&key=${BAPI_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.items))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else console.log(err);
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    const message = loading
        ? "로딩 중입니다..."
        : !keyword
          ? "검색어를 입력해 주세요."
          : list.length === 0
            ? "검색 결과가 없습니다."
            : "";

    return (
            <Container>
                <TopCard>
                    <h2>
                        Search Keyword : <span>{keyword}</span>
                    </h2>
                    <BookSearchBar keyword={keyword ?? ""} />
                </TopCard>

                <NormalCard>
                    {message ? (
                        <BottomMessage>{message}</BottomMessage>
                    ) : (
                        <Wrap>
                            {list.map(item => (
                                <HoverCard key={item.id} to={`/book/detail/${item.id}`}>
                                    {item.volumeInfo.imageLinks ? (
                                        <BookCover
                                            src={item.volumeInfo.imageLinks.thumbnail}
                                            alt={item.volumeInfo.title}
                                        />
                                    ) : (
                                        <BookNoCover>No cover</BookNoCover>
                                    )}

                                    <BookTitle>{item.volumeInfo.title}</BookTitle>
                                    <BookAuthor>{item.volumeInfo.authors?.join(", ")}</BookAuthor>
                                </HoverCard>
                            ))}
                        </Wrap>
                    )}
                </NormalCard>
            </Container>
    );
}

export default BookSearch;
