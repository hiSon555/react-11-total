import GlobalStyle from "../../styles/GlobalStyle.ts";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaBitcoin } from "react-icons/fa";
import styled from "styled-components";
import CoinDetail from "./CoinDetail.tsx";

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

const CoinTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
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
    cursor: pointer;

    &:hover {
        background-color: #f0f4f8;
    }
`;

const CoinInfo = styled.li`
    display: flex;
    justify-content: space-between;
`;

const CoinSymbol = styled.p`
    color: #a0a0a0;
`;

const Decrease = styled.p`
    color: red;
    display: flex;
    align-items: center;
`;

const Increase = styled.p`
    color: green;
    display: flex;
    align-items: center;
`;

export type BCoin = {
    symbol: string;
    name: string;
    rank: number;
    price_usd: string;
    market_cap_usd: string;
    volume24: number;
    percent_change_24h: string;
};

type BCoinList = {
    data: BCoin[];
};

function Coin() {
    const [coins, setCoins] = useState<BCoin[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<BCoin | null>(null);
    const [loading, setLoading] = useState(true);

    const firstThen = (res: Response): Promise<BCoinList> => {
        return res.json();
    };

    const secondThen = (json: BCoinList) => {
        setCoins(json.data.filter(coin => coin.rank <= 50));
    };

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(firstThen)
            .then(secondThen)
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("알 수 없는 에러가 발생되었습니다" + error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <GlobalStyle />
            <Container>
                <LeftContainer>
                    <CoinTitle>
                        <FaBitcoin />
                        <p>Top 50 Coins</p>
                    </CoinTitle>
                    <CoinListContainer>
                        {loading ? (
                            <p>코인 목록을 불러오는 중입니다...</p>
                            ) : (
                        coins.map(coin => (
                            <CoinList
                                key={coin.rank}
                                onClick={() => {
                                    setSelectedCoin(coin);
                                }}
                                style={{
                                    backgroundColor:
                                        selectedCoin?.rank === coin.rank ? "#dce9ff" : "#f4f6f8",
                                }}>
                                <CoinInfo>
                                    <p>{coin.name}</p>
                                    <div>${coin.price_usd}</div>
                                </CoinInfo>
                                <CoinInfo>
                                    <CoinSymbol>{coin.symbol}</CoinSymbol>
                                    <div>
                                        {Number(coin.percent_change_24h) < 0 ? (
                                            <Decrease>
                                                <FaArrowDown />
                                                {coin.percent_change_24h}%
                                            </Decrease>
                                        ) : Number(coin.percent_change_24h) > 0 ? (
                                            <Increase>
                                                <FaArrowUp />
                                                {coin.percent_change_24h}%
                                            </Increase>
                                        ) : (
                                            "-"
                                        )}
                                    </div>
                                </CoinInfo>
                            </CoinList>
                        )) )}
                    </CoinListContainer>
                </LeftContainer>
                <CoinDetail coin={selectedCoin} />
            </Container>
        </>
    );
}

export default Coin;
