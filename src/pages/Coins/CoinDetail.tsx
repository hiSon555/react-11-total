import { type BCoin } from "./Coin.tsx";
import styled from "styled-components";

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
    margin: 0;
    flex: 1;

    hr {
        border: solid 1px #f4f6f8;
    }
`;

const CoinMain = styled.h3`
    color: #1976d2;
    font-size: 24px;
`;

const CoinTop = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
`

const CoinSymbol = styled.p`
    color: #a0a0a0;
    margin-top: 8px;
`;

const Info = styled.p`
    color: #a0a0a0;
    font-size: 12px;
`;

const CoinInt = styled.span`
    font-size: 20px;
    font-weight: 700;
`

const CoinCardWrapper = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 20px;

`

const CoinCard = styled.div`
    background-color: #f4f6f8;
    flex: 1;
    min-width: 250px;
    border-radius: 8px;
    padding: 12px;
`;

type CoinProps = {
    coin: BCoin | null;
};

function CoinDetail({ coin }: CoinProps) {
    if (coin === null) {
        return <RightContainer>코인을 선택해주세요.</RightContainer>;
    }

    return (
        <RightContainer>
            <CoinTop>
                <CoinMain>{coin.name}</CoinMain>
                <CoinSymbol>{coin.symbol}</CoinSymbol>
            </CoinTop>
            <hr />
            <CoinCardWrapper>
                <CoinCard>
                    <Info>현재 가격 (USD)</Info>
                    <CoinInt>
                        $
                        {Number(coin.price_usd).toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                        })}
                    </CoinInt>
                </CoinCard>
                <CoinCard>
                    <Info>시가총액</Info>
                    <CoinInt>
                        $
                        {Number(coin.market_cap_usd).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })}
                    </CoinInt>
                </CoinCard>
                <CoinCard>
                    <Info>24시간 거래량</Info>
                    <CoinInt>
                        $
                        {Number(coin.volume24).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })}
                    </CoinInt>
                </CoinCard>
                <CoinCard>
                    <Info>시가총액 순위</Info>
                    <CoinInt>{coin.rank}위</CoinInt>
                </CoinCard>
            </CoinCardWrapper>
        </RightContainer>
    );
}

export default CoinDetail;
