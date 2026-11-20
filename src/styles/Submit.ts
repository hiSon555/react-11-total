import styled from "styled-components";

export const Input = styled.input`
    background-color: #e7e9ec;
    border-radius: 8px;
    border: none;
    padding: 10px;
    outline: none;
`;

export const AddButton = styled.button`
    background: #1976d2;
    border-radius: 8px;
    border: 8px;
    padding: 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: rgb(0 64 126);
    }
`;

export const BackButton = styled.button`
    align-self: flex-start;
    padding: 8px 16px;
    border: 1px solid #e7e9ec;
    border-radius: 8px;
    background-color: #fff;
    color: #1976d2;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 20px;

    &:hover {
        background-color: #f4f6f8;
        border-color: #1976d2;
    }
`;


export const Message = styled.p`
    padding: 24px 0;
    text-align: center;
    font-size: 14px;
    color: #a0a0a0;
`;
