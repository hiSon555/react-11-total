import { Card, CardIcon, CardText } from "../styles/Card.ts";
import { PageContainer } from "../styles/Container.ts";
import styled from "styled-components";
import { Link } from "react-router";
import { FaBitcoin, FaBook, FaCheckSquare, FaClipboardList } from "react-icons/fa";
import { MdOutlineLocalMovies, MdOutlineProductionQuantityLimits } from "react-icons/md";

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    min-height: 100px;
    padding: 32px;
    background-color: #ffffff;
    border-radius: 18px;
    margin: 0;
    color: #1976d2;

    p {
        font-size: 12px;
        color: #a0a0a0;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

function Home() {
    return (
        <PageContainer>
            <Title>
                <h1>My Project Dashboard</h1>
                <p>지금까지 구축한 포트폴리오 리스트입니다.</p>
            </Title>
            <Grid>
                <Link to={"/todo"}>
                    <Card>
                        <CardIcon>
                            <FaCheckSquare />
                        </CardIcon>
                        <h3>투두리스트</h3>
                        <CardText>일 체계적인 일정 관리와 할 일 목록 기록</CardText>
                    </Card>
                </Link>
                <Link to={"/coin"}>
                    <Card>
                        <div>
                            <CardIcon>
                                <FaBitcoin />
                            </CardIcon>
                        </div>
                        <h3>코인트래커</h3>
                        <CardText>실시간 가상화폐 시세 확인 및 정보 트래킹</CardText>
                    </Card>
                </Link>
                <Link to={"/movie"}>
                    <Card>
                        <div>
                            <CardIcon>
                                <MdOutlineLocalMovies />
                            </CardIcon>
                        </div>
                        <h3>무비검색앱</h3>
                        <CardText>영화 데이터베이스 API를 활용한 영화 검색</CardText>
                    </Card>
                </Link>
                <Link to={"/"}>
                    <Card>
                        <div>
                            <CardIcon>
                                <FaClipboardList />
                            </CardIcon>
                        </div>
                        <h3>게시판</h3>
                        <CardText>기본적인 커뮤니티 게시판</CardText>
                    </Card>
                </Link>
                <Link to={"/product"}>
                    <Card>
                        <div>
                            <CardIcon>
                                <MdOutlineProductionQuantityLimits />
                            </CardIcon>
                        </div>
                        <h3>상품</h3>
                        <CardText>상품 재고 조회</CardText>
                    </Card>
                </Link>
                <Link to={"/book"}>
                    <Card>
                        <div>
                            <CardIcon>
                                <FaBook />
                            </CardIcon>
                        </div>
                        <h3>구글북스 검색앱</h3>
                        <CardText>구글 도서 데이터를 활용한 온라인 책 검색</CardText>
                    </Card>
                </Link>
            </Grid>
        </PageContainer>
    );
}

export default Home;
