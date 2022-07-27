import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "./board.scss";
import {jwtUtils} from "../../utils/jwtUtils";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
// import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import api from "../../utils/api";
import moment from "moment";
const Board = () => {
    // URL 파라미터 받기 - board의 id
    const {board_id} = useParams();
    const [board, setBoard] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [myBoard, setMyBoard] = useState(false);
    const token = useSelector(state => state.Auth.token);
    const navigate = useNavigate();
    // modal이 보이는 여부 상태
    const [show, setShow] = useState(false);
    // board 가져오기
    useEffect(() => {
        const getBoard = async () => {
            const {data} = await api.get(`/api/boards/${board_id}`);
            return data;
        }
        getBoard().then((result) => {
            setMyBoard(Boolean(result.message === "내 게시글"));
            setBoard(result.data);
        }).then(() => setIsLoaded(true));
    }, [])
    return (
        <React.Fragment>
            {isLoaded && (

                <div className="board-wrapper">
                    {myBoard && (

                        <div className="edit-delete-button">
                            <Button
                                variant="outlined" color="error" className="delete-button"
                                onClick={() => {
                                    setShow(true)
                                }}
                            >
                                삭제
                            </Button>
                            <Button
                                variant="outlined" onClick={() => {
                                    navigate(`/edit-board/${board_id}`)
                                }}
                            >
                                수정
                            </Button>
                        </div>
                    )}
                    <div className="board-header">
                        <div className="board-header-username">{board.writer}</div>
                        <div className="board-header-date">{moment(board.created).add(9,"hour").format('YYYY-MM-DD')}</div>
                    </div>
                    <hr/>
                    <div className="board-body">
                        <div className="board-image">
                            <img src={`/image/${board.file}`}/>

                        </div>
                        <div className="board-title-content">
                            <div className="board-title">{board.title}</div>
                            <div className="board-content">{board.content}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="board-footer"></div>
                </div>
            )}

            <Dialog open={show}>
                <DialogContent style={{position: "relative"}}>
                    <IconButton
                        style={{position: "absolute", top: "0", right: "0"}}
                        onClick={() => setShow(false)}
                    >
                        {/*<DisabledByDefaultOutlinedIcon/>*/}
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    await api.delete(`/api/boards/delete/${board_id}`);
                                    alert("게시물이 삭제되었습니다😎");
                                    navigate("/board-list");
                                }}

                            >
                                예
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default Board;