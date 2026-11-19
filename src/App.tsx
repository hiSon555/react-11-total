import GlobalStyle from "./styles/GlobalStyle.ts";
import Home from "./pages/Home.tsx";
import Coin from "./pages/Coin.tsx";
import Todo from "./pages/Todo.tsx";
import Movie from "./pages/Movie.tsx";
import Rocket from "./pages/Rocket.tsx";
import Book from "./pages/Book.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />}></Route>
                    <Route path={"/todo"} element={<Todo />}></Route>
                    <Route path={"/coin"} element={<Coin />}></Route>
                    <Route path={"/movie"} element={<Movie />}></Route>
                    <Route path={"/rocket"} element={<Rocket />}></Route>
                    <Route path={"/book"} element={<Book />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
