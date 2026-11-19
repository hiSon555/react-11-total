import styled from "styled-components";
import { Link } from "react-router";
import { FaRocket } from "react-icons/fa";

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    background-color: white;
`;

const Nav = styled.nav`
    display: flex;
    gap: 15px;
`;

const Logo = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const NavRight = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
`;

function Header() {
    return (
        <Head>
            <Logo>
                <Link to={"/"}>
                    {<FaRocket />} My Universe
                </Link>
            </Logo>
            <Nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/Todo"}>할 일</Link>
                <Link to={"/Coin"}>Coin</Link>
                <Link to={"/Movie"}>Movie</Link>
                <Link to={"/product"}>Product</Link>
                <Link to={"/Book"}>Book</Link>
            </Nav>
            <NavRight>
                <button>테마토글{/* 라이트/다크모드 */}</button>
            </NavRight>
        </Head>
    );
}

export default Header;