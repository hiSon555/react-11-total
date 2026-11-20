import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../../styles/Container.ts";
import { NormalCard } from "../../styles/Card.ts";
import { BackButton } from "../../styles/Submit.ts";
import { BAPI_KEY, type Book } from "./BookSearch.tsx";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
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

const PosterBox = styled.div`
    width: 180px;
`;

const Poster = styled.img`
    display: block;
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
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

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        font-size: 28px;
        color: #1976d2;
    }
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

const Description = styled.p`
    line-height: 1.7;
    color: #333;
`;

function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${BAPI_KEY}`)
            .then(res => res.json())
            .then((json: Book) => setBook(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (!book) {
        return (
            <PageContainer>
                <Container>
                    <NormalCard>
                        <BottomMessage>Loading...</BottomMessage>
                    </NormalCard>
                </Container>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Container>
                <NormalCard>
                    <BackButton
                        onClick={() => {
                           navigate(-1);
                        }}>
                        &larr; 뒤로 가기
                    </BackButton>
                    <PosterBox>
                        {book.volumeInfo.imageLinks ? (
                            <Poster
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                            />
                        ) : (
                            <BookNoCover>No Cover</BookNoCover>
                        )}
                    </PosterBox>
                    <Info>
                        <h1>{book.volumeInfo.title}</h1>
                        <div>
                            <Label>저자</Label>
                            <Value>{book.volumeInfo.authors?.join(", ")}</Value>
                        </div>
                        <div>
                            <Label>소개</Label>
                            <Description
                                dangerouslySetInnerHTML={{
                                    __html: book.volumeInfo.description || "",
                                }}
                            />
                        </div>
                    </Info>
                </NormalCard>
            </Container>
        </PageContainer>
    );
}

export default BookDetail;
