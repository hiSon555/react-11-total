import GlobalStyle from "./styles/GlobalStyle.ts";
import Home from "./pages/Home.tsx";
import Coin from "./pages/Coin.tsx";
import Todo from "./pages/Todo.tsx";
import Movie from "./pages/Movie.tsx";
import Rocket from "./pages/Rocket.tsx";
import Book from "./pages/Book.tsx";

function App() {
    return (
        <>
            <GlobalStyle />
            <Home />
            <Todo />
            <Coin />
            <Movie />
            <Rocket />
            <Book />
        </>
    );
}

export default App;
