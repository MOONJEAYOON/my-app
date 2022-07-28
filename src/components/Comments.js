import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import {Button, Dialog, DialogContent, IconButton, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import api from "../utils/api";
import {useNavigate, useParams} from "react-router-dom";
// import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./comments.scss";

const Comments = () => {
    // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
    const {board_id} = useParams();;
    const navigate = useNavigate();
    const [commentList, setCommentList] = useState([]);
    // 입력한 댓글 내용
    const [content, setContent] = useState("");

    useEffect(() => {
        const getCommentList = async () => {
            const {data} = await api.get(`/api/comments/${board_id}`);
            return data;
        }
        // 기존 commentList에 데이터를 덧붙임
        getCommentList().then((result) => {
            setCommentList(result.data);
        });
    }, [])
    const submit = async () => {
        await api.post(`/api/comments/${board_id}`, {
            "content": content
        });
        alert("댓글 등록 완료");
        window.location.reload();
    }
    // submit().then((result) => {
    //     setCommentList(result.data);
    //     alert("댓글 등록 완료");
    //     window.location.reload();
    // });
    // console.log(commentList)

    return (
        <div className="comments-wrapper">
            <div className="comments-header">
                <TextField
                    className="comments-header-textarea"
                    maxRows={3}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    multiline placeholder="댓글을 입력해주세요✏️"
                />
                {content !== "" ? (
                    <Button variant="outlined" onClick={submit}>등록하기</Button>
                ) : (
                    <Button variant="outlined" disabled={true}>
                        등록하기
                    </Button>
                )}
            </div>
            <div className="comments-body">
                {commentList.map((item, index) => (
                    <div key={index} className="comments-comment">
                        <div className="comment-username-date">
                            <div className="comment-username">{item.writer}</div>
                            <div className="comment-date">{moment(item.created).add(9, "hour").format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                        <div className="comment-content">{item.content}</div>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Comments;