import styled from "styled-components";
import { Link, useParams } from "react-router";
import { NormalCard } from "../../styles/Card.ts";
import { PageContainer } from "../../styles/Container.ts";
import { useEffect, useState } from "react";
import type { ProductDetails } from "./Product.tsx";
import { Message } from "../movies/MovieSearch.tsx";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopCard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
`;

const TopBackButton = styled(Link)`
    align-self: flex-start;
    padding: 8px 16px;
    border: 1px solid #e7e9ec;
    border-radius: 8px;
    background-color: #fff;
    color: #1976d2;
    transition: all 0.2s;

    &:hover {
        background-color: #f4f6f8;
        border-color: #1976d2;
    }
`;

const TopWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
`;

const TopImageBox = styled.div`
    flex: 0 0 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    background-color: #f4f6f8;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const TopInfo = styled.div`
    flex: 1;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const TopTitle = styled.h1`
    font-size: 28px;
    color: #1976d2;
`;

const TopBadge = styled.span`
    padding: 2px 12px;
    border-radius: 999px;
    background-color: #e8f1fb;
    color: #1976d2;
    font-size: 12px;
    font-weight: 600;
`;

const TopShipping = styled.p`
    font-size: 12px;
    color: #a0a0a0;
`;

const TopPriceBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 8px;
`;

const TopOriginalPrice = styled.span`
    font-size: 14px;
    color: #a0a0a0;
    text-decoration: line-through;
`;

const TopDiscount = styled.span`
    font-size: 14px;
    color: #e53935;
`;

const TopPrice = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: #1976d2;
`;

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 12px;

    h2 {
        font-size: 16px;
        color: #1976d2;
    }
`;

const BottomDescription = styled.p`
    line-height: 1.7;
    color: #333;
    overflow-wrap: break-word;
`;

const BottomReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const BottomReview = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #f4f6f8;
`;

const BottomReviewHead = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a0a0a0;

    strong {
        color: #333;
    }
`;

function ProductDetail() {
    const { id } = useParams(); // string | undefined

    // 아직 값이 도착하지 않은 상태의 "초기값"을 배개변수로 제공해줘야 함
    // Product 타입으로만 강제하면
    // 값이 "있다" 로 밖에 표현을 할 수 없음
    const [detail, setDetail] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 지금 사용자가 /product/    만 일부러 치고 들어온 경우도 있는데
        // 실행이 아니라 App - ProductDetail 이 관계까지 생각해서 쓰는 게 아니라
        // ProductDetail만 보고 있는 것
        if (!id) return;

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((json: ProductDetails) => setDetail(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.log("알 수 없는 에러 " + err);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    const message = !id
        ? "잘못된 상품 정보입니다."
        : loading
          ? "Loading..."
          : !detail
            ? "상품에 대한 상세 정보를 불러오지 못했습니다."
            : "";

    if (message || !detail) {
        return (
            <PageContainer>
                <Container>
                    <NormalCard>
                        <Message>{message}</Message>
                    </NormalCard>
                </Container>
            </PageContainer>
        );
    }

    const discountedPrice = Number(detail.price) * (1 - Number(detail.discountPercentage) / 100);

    return (
        <PageContainer>
            <Container>
                <TopCard>
                    <TopBackButton to={"/product"}>&larr; 목록으로 돌아가기</TopBackButton>
                    <TopWrap>
                        <TopImageBox>
                            <img src={detail.images[0] ?? detail.thumbnail} alt={detail.title} />
                        </TopImageBox>
                        <TopInfo>
                            <TopTitle>{detail.title}</TopTitle>
                            <TopBadge>{detail.category}</TopBadge>
                            <TopShipping>{detail.shippingInformation}</TopShipping>
                            <TopPriceBox>
                                <TopOriginalPrice>${detail.price}</TopOriginalPrice>
                                <TopDiscount>{detail.discountPercentage}% discount</TopDiscount>
                                <TopPrice>${discountedPrice}</TopPrice>
                            </TopPriceBox>
                        </TopInfo>
                    </TopWrap>
                </TopCard>

                <NormalCard>
                    <BottomSection>
                        <h2>상품 설명</h2>
                        <BottomDescription>{detail.description}</BottomDescription>
                    </BottomSection>

                    <BottomSection>
                        <h2>리뷰 ({detail.reviews.length})</h2>
                        <BottomReviewList>
                            {detail.reviews.map((item, index) => (
                                <BottomReview key={index}>
                                    <BottomReviewHead>
                                        <strong>{item.reviewerName}</strong>
                                        <span>{item.date}</span>
                                    </BottomReviewHead>
                                    <div>{"★".repeat(item.rating)}</div>
                                    <div>{item.comment}</div>
                                </BottomReview>
                            ))}
                        </BottomReviewList>
                    </BottomSection>
                </NormalCard>
            </Container>
        </PageContainer>
    );
}

export default ProductDetail;
