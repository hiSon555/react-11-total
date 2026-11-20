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
