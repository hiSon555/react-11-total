import styled from "styled-components";
import { Link } from "react-router";
import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaHome,
    FaRocket,
} from "react-icons/fa";
import { MdOutlineLocalMovies, MdOutlineProductionQuantityLimits } from "react-icons/md";

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    background-color: white;
    margin: 0 10px
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

const HeaderLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 4px;
`;

function Header() {
    return (
        <Head>
            <Logo>
                <HeaderLink to={"/"}>
                    {<FaRocket />}
                    <p>My Universe</p>
                </HeaderLink>
            </Logo>
            <Nav>
                <HeaderLink to={"/"}>
                    <FaHome />
                    <p>Home</p>
                </HeaderLink>
                <HeaderLink to={"/Todo"}>
                    <FaCheckSquare /> Todo
                </HeaderLink>
                <HeaderLink to={"/Coin"}>
                    <FaBitcoin />
                    <p>Coin</p>
                </HeaderLink>
                <HeaderLink to={"/Movie"}>
                    <MdOutlineLocalMovies />
                    <p>Movie</p>
                </HeaderLink>
                <HeaderLink to={"/product"}>
                    <MdOutlineProductionQuantityLimits />
                    <p>Product</p>
                </HeaderLink>
                <HeaderLink to={"/Book"}>
                    <FaBook />
                    <p>Book</p>
                </HeaderLink>
            </Nav>
            <NavRight>
                <button>테마토글{/* 라이트/다크모드 */}</button>
            </NavRight>
        </Head>
    );
}

export default Header;
