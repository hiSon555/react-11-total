import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

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
        <form onSubmit={onSubmitHandler}>
            <input onChange={onChangeHandler} value={input} />
            <button>Search</button>
        </form>
    );
}

export default MovieSearchBar;
