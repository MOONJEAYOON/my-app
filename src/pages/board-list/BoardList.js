import {Button, Pagination} from "@mui/material";
import {Card} from "../../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import "./boardList.scss";
import moment from "moment";
import api from "../../utils/api";
import {jwtUtils} from "../../utils/jwtUtils";

const BoardList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);

    // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
    // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
    useEffect(() => {
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);
            console.log("true");
        } else {
            setIsAuth(false);
            console.log("false");
        }
        const getBoardList = async () => {
            const page_number = searchParams.get("page") - 1;

            const {data} = await api.get(`/api/boards?page=${page_number}&size=4`);
            return data;
        }
       // 현재 페이지에 해당하는 게시물로 상태 변경하기

        getBoardList().then((result) => {
            setBoardList(result.data);
            setPageCount(Math.ceil(result.totalElements / 4));
        });
    }, [])

    return (
        <div className="boardList-wrapper">
            <div className="boardList-header">
                전체 게시물
                {isAuth && (
                    <div className={"boardListBtn"}>
                        <Button
                            variant="outlined" color="primary" title={"내 게시물"} className="delete-button"
                            onClick={() => {
                                window.location.href = "/myboard-list?page=1";
                            }}
                        >
                            내 게시물📝
                        </Button>
                        <Button
                            variant="outlined" color="primary" title={"글쓰기"} className="delete-button"
                            onClick={() => {
                                window.location.href = "/add-board";
                            }}
                        >
                            글쓰기🖊️
                        </Button>
                    </div>
                )}
            </div>
            <div className="boardList-body">
                {boardList.map((item, index) => (
                    <Card key={item.id} username={item.writer} date={moment(item.created).add(9, "hour").format('YYYY-MM-DD')}
                          title={item.title} content={item.content}
                          board_id={item.id} img_url={`/image/${item.file}`}
                    />
                ))}
            </div>
            <div className="boardList-footer">
                {/*페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기*/}
                <Pagination
                    variant="outlined" color="primary" page={Number(searchParams.get("page"))}
                    count={pageCount} size="large"
                    onChange={(e, value) => {
                         window.location.href = `/board-list?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>
        </div>

    )
}
export default BoardList;