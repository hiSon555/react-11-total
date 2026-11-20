import GlobalStyle from "./styles/GlobalStyle.ts";
import Home from "./pages/Home.tsx";
import Coin from "./pages/Coins/Coin.tsx";
import Todo from "./pages/Todo.tsx";
import Movie from "./pages/movies/Movie.tsx";
import Book from "./pages/books/Book.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import styled from "styled-components";
import Product from "./pages/product/Product.tsx";
import MovieDetail from "./pages/movies/MovieDetail.tsx";
import ProductDetail from "./pages/product/ProductDetail.tsx";

const Wrap = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Wrap>
                    <Header />
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/todo"} element={<Todo />} />
                        <Route path={"/coin"} element={<Coin />} />
                        <Route path={"/movie"} element={<Movie />} />
                        <Route path={"/movie/search"} element={<Movie />} />
                        <Route path={"/movie/detail/:imdbID"} element={<MovieDetail />} />
                        <Route path={"/product"} element={<Product />} />
                        <Route path={"/product/detail/:id"} element={<ProductDetail />} />
                        <Route path={"/book"} element={<Book />} />
                    </Routes>
                </Wrap>
            </BrowserRouter>
        </>
    );
}

export default App;
