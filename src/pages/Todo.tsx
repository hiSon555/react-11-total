import { PageContainer } from "../styles/Container.ts";
import styled from "styled-components";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { AddButton, Input } from "../styles/Submit.ts";

const Container = styled.div`
    max-width: 300px;
    margin: 0 auto;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h2 {
        color: #1876d1;
    }
`;

const InputCard = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #e7e9ec;
    border-radius: 18px;
`



const CheckButton = styled.button`
    width: 36px;
    height: 36px;
    border: 1px solid #b8c4d1;
    outline: none;
    background-color: #fff;
    box-shadow: none;
    cursor: pointer;
    padding: 10px;
    font-size: 14px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const DeletedButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

&:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
`



const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ListItem = styled.li`
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid #e7e9ec;
    border-radius: 8px;
    padding: 10px;
    
    p {
        color: #a0a0a0;
        text-align: start;
        flex: 1;
    }
`;

type Todo = {
    text: string;
    completed: boolean;
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

        setTodoList([...todoList, { text: newTodo, completed: false }]);
        setTodoValue("");
    };
    const handleDeleteTodo = (target: number) => {
       const result = todoList.filter((_, index) => {
            return target !== index;
        });
        setTodoList(result);
    };

    const handleToggleTodo = (index: number) => {
        const newTodoList = todoList.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return { ...item, completed: !item.completed };
        });
        setTodoList(newTodoList);
    };


    return (
        <PageContainer>
            <Container>
                <h2>Todo List</h2>
                <form onSubmit={handleSubmit}>
                    <InputCard>
                        <Input
                            onChange={handleOnChange}
                            value={todoValue}
                            placeholder={"오늘의 할 일을 입력하세요."}
                        />
                        <AddButton type={"submit"}>+</AddButton>
                    </InputCard>
                </form>
                <List>
                    {todoList.map((i, index) => (
                        <ListItem key={index}>
                            <CheckButton onClick={() => handleToggleTodo(index)}>
                                {i.completed ? <FaCheck /> : ""}
                            </CheckButton>
                            <p>{i.text}</p>
                            <DeletedButton
                                onClick={() => {
                                    return handleDeleteTodo(index);
                                }}>
                                <FaTrashAlt />
                            </DeletedButton>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </PageContainer>
    );
}

export default Todo;
