import { useNavigate } from "react-router";
import { type SubmitEvent, type ChangeEvent, useState } from "react";
import { AddButton, Input } from "../../styles/Submit.ts";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    gap: 12px;
`

type BookProps = { keyword: string };



function BookSearchBar({ keyword } : BookProps) {
const navigate = useNavigate();
const [input, setInput] = useState(keyword || "");

const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
    setInput(e.target.value);

const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const k = input.trim();
    if (!k) return;
    navigate(`/book/search?keyword=${encodeURIComponent(k)}`);
};
return (
    <Form onSubmit={handleSubmit}>
        <Input
            onChange={handleChange}
            value={input}
            placeholder="책 제목을 입력하세요"
        />
        <AddButton type={"submit"}>검색</AddButton>
    </Form>
);
}


export default BookSearchBar;