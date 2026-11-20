import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { AddButton, Input } from "../../styles/Submit.ts";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    gap: 12px;
`;

function MovieSearchBar({ keyword }: { keyword: string }) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setInput(e.target.value);

    const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/movie/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Input onChange={onChangeHandler} value={input} />
            <AddButton>Search</AddButton>
        </Form>
    );
}

export default MovieSearchBar;
