import styled from "styled-components";

export const PageContainer = styled.main`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background-color: #f4f6f8;
    box-sizing: border-box;
    gap : 20px
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    min-height: 100px;
    padding: 32px;
    background-color: #fff;
    border-radius: 18px;
    margin: 0;
    color: #1976d2;

    p {
        font-size: 12px;
        color: #a0a0a0;
    }
`;


export const Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;