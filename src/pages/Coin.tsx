import GlobalStyle from "../styles/GlobalStyle.ts";
import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    padding: 24px;
    background-color: #f4f6f8;
    box-sizing: border-box;
    gap: 20px;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px;
    background-color: #ffffff;
    border-radius: 18px;
    margin: 0;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px;
    background-color: #ffffff;
    border-radius: 18px;
    margin: 0;
    flex: 1;
`;

const CoinListContainer = styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;

const CoinList = styled.ul`
    display: flex;
    flex-direction: column;
    border: 1px solid #fefefe;
    padding: 10px;
`;

const CoinInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

type BCoin = {
    market: string;
    english_name: string;
};

function Coin() {
    const [coins, setCoins] = useState<BCoin[]>([]);

    const firstThen = (response: Response): Promise<BCoin[]> => {
        return response.json();
    };

    const secondThen = (json: BCoin[]) => {
        setCoins(json);
    };

    useEffect(() => {
        fetch("https://api.upbit.com/v1/market/all") // 조회해야할 API 주소 어딘지 몰라서 이전 프로젝트에서 목록만 가져옴
            .then(firstThen)
            .then(secondThen)
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("알 수 없는 에러가 발생되었습니다" + error);
                }
            });
    }, []);

    return (
        <>
            <GlobalStyle />
            <Container>
                <LeftContainer>
                    <h2>
                        <FaBitcoin /> Top 50 Coins
                    </h2>
                    <CoinListContainer>
                        {coins
                            .filter((_, index) => index < 50)
                            .map((coin, index) => {
                                return (
                                    <CoinList key={index}>
                                        <CoinInfo>
                                            <p>{coin.english_name}</p>
                                            <div> hi </div>
                                        </CoinInfo>
                                        <CoinInfo>
                                            <p>블라블라</p>
                                            <div>increase : decrease &darr; : &uarr; </div>
                                        </CoinInfo>
                                    </CoinList>
                                );
                            })}
                    </CoinListContainer>
                </LeftContainer>
                <RightContainer>
                    상세정보 컴포넌트 자리
                    {/*
                    https://api.coinlore.net/api/tickers/
                    여기서 따오는 게 맞나
                    */}
                </RightContainer>
            </Container>
        </>
    );
}

export default Coin;
