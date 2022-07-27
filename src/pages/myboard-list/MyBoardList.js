import {Pagination} from "@mui/material";
import {Card} from "../../components/Card";
import {useEffect, useState} from "react";
import api from "../../utils/api";
import {useSearchParams} from "react-router-dom";
import "../board-list/boardList.scss";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";
import moment from "moment";

const MyBoardList = () => {
    const [pageCount, setPageCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        // 페이지에 해당하는 게시물 가져오기

        const getBoardList = async () => {
            const page_number = searchParams.get("page") - 1;

            const {data} = await api.get(`api/myboards?page=${page_number}&size=4`);
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
                나의 게시물 📝
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
                        window.location.href = `/myboard-list?page=${value}`;
                    }}
                    showFirstButton showLastButton
                />
            </div>
        </div>
    )
}
export default MyBoardList;