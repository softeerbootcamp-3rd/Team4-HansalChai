import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import { UrlMap } from "../../../data/GlobalVariable.js";
import { isTokenInvalid } from "../../../repository/userRepository.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { getUserInfo } from "./index.jsx";
import ViewForm from "./components/ViewForm.jsx";
import EditForm from "./components/EditForm.jsx";
import { logoutFun } from "../../../utils/localStorage.js";

const UserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    tel: ""
  });
  const [isOutdated, setIsOutdated] = useState(false);

  const brokenAccountNotice = () => {
    ToastMaker({
      type: "error",
      children: (
        <>
          오류가 발생했습니다. <br /> 다시 로그인해주세요.
        </>
      )
    });
    logoutFun();
    navigate(UrlMap.loginPageUrl);
  };

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUserInfo()
      .then(data => {
        setUserInfo(data);
      })
      .catch(response => {
        if (isTokenInvalid(response.code)) navigate(UrlMap.loginPageUrl);
        ToastMaker({ type: "error", children: response.message });
        setIsOutdated(true);
      });
  }, []);

  return (
    <MobileLayout>
      <Header home={true} back={true}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          더보기
        </Typography>
      </Header>
      <Margin height="32px" />
      {isEdit ? (
        <EditForm setIsEdit={setIsEdit} navigate={navigate} />
      ) : (
        <ViewForm
          userInfo={userInfo}
          setIsEdit={isOutdated ? brokenAccountNotice : setIsEdit}
          navigate={navigate}
        />
      )}
    </MobileLayout>
  );
};

export default UserInfo;
