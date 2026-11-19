import styled from "styled-components";
import { Link } from "react-router";

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    background-color: #f4f4f4;
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
            <Logo>My Universe{/* 누르면 홈"/"으로 가는 기능 넣을 것 */}</Logo>
            <Nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/Todo"}>할 일</Link>
                <Link to={"/Coin"}>COin</Link>
                <Link to={"/Movie"}>Movie</Link>
                <Link to={"/Rocket"}>Rocket</Link>
                <Link to={"/Book"}>Book</Link>
            </Nav>
            <NavRight>
                <button>테마토글{/* 라이트/다크모드 */}</button>
            </NavRight>
        </Head>
    );
}

export default Header;