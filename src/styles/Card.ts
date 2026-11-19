import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 24px;
    background-color: #ffffff;
    border: 1px solid #e7e9ec;
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        border-color: #1976d2;
    }
`;

export const CardIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #1876d1;
`;

export const CardText = styled.p`
    margin: 0;
    font-size: 12px;
    color: #a0a0a0;
    text-align: center;
`;
