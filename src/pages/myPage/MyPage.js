import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./myPage.scss";
import api from "../../utils/api";

const MyPage = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [exPassword, setExPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    useEffect(() => {
        const getMe = async () => {
            const {data} = await api.get("/api/member/me");
            return data;
        }
        getMe().then((result) => {
            setEmail(result.email);
            setNickname(result.nickname);
        });
    }, []);


    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다!")
            .required("이메일을 입력하세요!"),
        nickname: Yup.string()
            .min(2, "닉네임은 최소 2글자 이상입니다!")
            .max(10, "닉네임은 최대 10글자입니다!")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
            )
            .required("닉네임을 입력하세요!"),
        exPassword: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다")
            .max(16, "비밀번호는 최대 16자리입니다!")
            .required("패스워드를 입력하세요!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
            ),
        newPassword: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다")
            .max(16, "비밀번호는 최대 16자리입니다!")
            .required("패스워드를 입력하세요!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
            )
            .required("필수 입력 값입니다!"),
    });

    const submit = async () => {


        try {
            // 회원 닉네임 변경
            const {data1} = await api.post("/api/member/nickname", {
                "email": email,
                "nickname": nickname
            });

            const {data2} = await api.post("/api/member/password", {
                "email": email,
                "exPassword": exPassword,
                "newPassword": newPassword
            });
            toast.success(<h3>회원정보 변경 성공😎</h3>, {
                position: "top-center",
                autoClose: 2000
            });


        } catch (e) {
            // 서버에서 받은 에러 메시지 출력
            toast.error(e.response.data.message + "😭", {
                position: "top-center",
            });
        }
    };

    return (




                <div className="signup-wrapper">
                    <ToastContainer/>
                    <div className="input-forms">
                        <div className="input-forms-item">
                            <div className="input-label">이메일</div>
                            <TextField
                                value={email}
                                name="email"
                                variant="outlined"
                                inputProps={
                                    { readOnly: true }
                                }
                            />
                            {/*<div className="error-message">*/}
                            {/*    {errors.email}*/}
                            {/*</div>*/}
                        </div>
                        <div className="input-forms-item">
                            <div className="input-label">닉네임</div>
                            <TextField
                                value={nickname}
                                name="nickname"
                                variant="outlined"
                                onChange={e => setNickname(e.target.value)}
                            />
                            {/*<div className="error-message">*/}
                            {/*    {errors.nickname}*/}
                            {/*</div>*/}
                        </div>
                        <div className="input-forms-item">
                            <div className="input-label">이전비밀번호</div>
                            <TextField
                                value={exPassword}
                                name="exPassword"
                                variant="outlined"
                                type="password"
                                onChange={e => setExPassword(e.target.value)}
                            />
                            {/*<div className="error-message">*/}
                            {/*    {errors.exPassword}*/}
                            {/*</div>*/}
                        </div>
                        <div className="input-forms-item">
                            <div className="input-label">변경할비밀번호</div>
                            <TextField
                                value={newPassword}
                                name="newPassword"
                                variant="outlined"
                                type="password"
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            {/*<div className="error-message">*/}
                            {/*    {errors.newPassword}*/}
                            {/*</div>*/}
                        </div>
                        <Button
                            color="primary"
                            onClick={submit}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            정보변경
                        </Button>
                    </div>
                </div>

    );
};

export default MyPage;