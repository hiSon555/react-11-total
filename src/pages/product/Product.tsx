import { PageContainer, Title, Wrap } from "../../styles/Container.ts";
import { HoverCard, NormalCard } from "../../styles/Card.ts";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Message } from "../../styles/Submit.ts";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ProductThumbnail = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f4f6f8;
`;

const ProductName = styled.h3`
    font-size: 14px;
    line-height: 1.3;
`;

const ProductPrice = styled.p`
    font-weight: 700;
    color: #1976d2;
`;


type Review = {
    rating: number;
    comment?: string;
    date: string;
    reviewerName: string;
    reviewerEmail?: string;
};

export type ProductDetails = {
    id: number;
    title: string;
    price: number;
    discountPercentage?: number;
    thumbnail: string;
    category?: string;
    shippingInformation?: string;
    description: string;
    images: string[];
    reviews: Review[];
};

export type ProductLists = {
    products: ProductDetails[];
};

function Product() {
    const [list, setList] = useState<ProductDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res =>
                res.json(),
            )
            .then((json: ProductLists) => {
                setList(json.products);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.log("알 수 없는 에러 : " + err);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const message = loading
        ? "LOADING..."
        : list.length === 0
          ? "상품을 찾을 수 없거나, 오류가 발생되었습니다."
          : "";

    return (
        <PageContainer>
            <Container>
                <Title>
                    <h1>상품 목록</h1>
                    <p>재고가 있는 상품을 확인하고 상세 정보를 살펴보세요.</p>
                </Title>

                <NormalCard>
                    {message ? (
                        <Message>{message}</Message>
                    ) : (
                        <Wrap>
                            {list.map(item => (
                                <HoverCard to={`/product/detail/${item.id}`} key={item.id}>
                                    <ProductThumbnail src={item.thumbnail} alt={item.title} />
                                    <ProductName>{item.title}</ProductName>
                                    <ProductPrice>${item.price}</ProductPrice>
                                </HoverCard>
                            ))}
                        </Wrap>
                    )}
                </NormalCard>
            </Container>
        </PageContainer>
    );
}

export default Product;
