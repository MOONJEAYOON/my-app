import "./home.scss";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="slidesWarp">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div className="Slide_inner">
                        <div className="home-wrapper">
                            <div className="home-title">
                                안녕하세요.
                            </div>
                            <div className="home-contents1">
                                🛠 본 사이트는 개인의 개발 역량을 키우기 위해 만들어지고 있는 중이며, 사용한 기술 스택은 아래와 같습니다.<br/>
                            </div>

                            <div className="home-contents2">
                                <strong>개발 언어</strong><br/>
                                JAVASCRIPT, HTML, CSS<br/>
                                <br/>
                                <strong>프레임워크</strong><br/>
                                React<br/>
                                <br/>
                                기타 라이브러리<br/>
                                Redux, axios 등등<br/><br/>
                            </div>
                            <div className="home-contents3">
                                다음장<br/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Slide_inner">
                        <div className="home-wrapper">
                            <div className="home-title">
                                구현된 기능
                            </div>
                            <div className="home-contents1">
                                <strong>USER</strong><br/>
                                회원가입/로그인/로그아웃<br/>
                                닉네임,비밀번호 변경<br/>
                                <br/>
                                <strong>BOARD</strong><br/>
                                게시판 글쓰기/수정/삭제(타이틀, 이미지, 본문)<br/>
                                게시판 페이징 처리<br/>
                                나의 게시물 보기<br/>
                                댓글 쓰기/삭제<br/>
                                <br/>
                                <br/>
                            </div>
                            <div className="home-contents2">
                                다음장<br/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Slide_inner last_slide">
                        <div className="home-wrapper">
                            <div className="home-title">
                                제가한번 해보겠습니다!
                            </div>
                            <div className="home-contents1">
                                <Link to="/sign-up">회원가입 바로가기</Link>
                            </div>
                            <div className="home-contents2">
                                <Link to="/login">로그인 바로가기</Link>
                            </div>
                            <div className="home-contents3">
                                <Link to="/board-list?page=1">게시판 바로가기</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default Home;