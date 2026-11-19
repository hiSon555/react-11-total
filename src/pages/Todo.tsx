import { PageContainer } from "../styles/Container.ts";
import { Card } from "../styles/Card.ts";
import styled from "styled-components";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

const Container = styled.div`
    max-width: 300px;
    margin: 0 auto;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

type Todo = {
    text: string;
}

function Todo() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoValue, setTodoValue] = useState<string>("");


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = todoValue.trim();
        if (newTodo === "") {
            return;
        }

        setTodoList([...todoList, { text: newTodo }]);
        setTodoValue("");
    };


    return (
        <PageContainer>
            <Container>
                <h2>Todo List</h2>
                <form onSubmit={handleSubmit}>
                    <Card>
                        <input onChange={handleOnChange} value={todoValue} />
                        <button type={"submit"}>+</button>
                    </Card>
                </form>
                {todoList.map((i) => {
                    return <p>{i.text}</p>
                })}
            </Container>
        </PageContainer>
    );
}

export default Todo;
