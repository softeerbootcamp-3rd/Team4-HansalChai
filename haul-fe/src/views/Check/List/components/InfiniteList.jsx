import Margin from "../../../../components/Margin/Margin.jsx";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import { Link } from "react-router-dom";
import SummaryItemBox from "./SummaryItemBox.jsx";
import { dummyPagedSummary } from "../../../../data/DummyData.js";
import { forwardRef, useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton.jsx";
import styled from "styled-components";
import Flex from "../../../../components/Flex/Flex.jsx";
import { getUserSummaryList } from "../../../../repository/checkRepository.js";
import ToastMaker from "../../../../components/Toast/ToastMaker.jsx";

// eslint-disable-next-line react/display-name
const LoadingSkeleton = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Skeleton />
    </div>
  );
});

const ListFrame = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  padding-bottom: 100px;
`;

const ListEnd = () => {
  return (
    <div>
      <Flex kind="flexColumn" align="center">
        <Typography font={"medium16"} color={"upperTextColor"}>
          모두 보여드렸어요
        </Typography>
      </Flex>
    </div>
  );
};

//IntersectionObserver를 훅으로 만들어서 사용
function useIntersectionObserver(callback) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0 }
    )
  );

  const observe = element => {
    observer.current.observe(element);
  };

  const unobserve = element => {
    observer.current.unobserve(element);
  };

  const disconnect = () => {
    observer.current.disconnect();
  };

  return [observe, unobserve, disconnect];
}

const InfiniteList = () => {
  const [isEnd, setIsEnd] = useState(false); //데이터를 모두 불러왔으면 True
  const endRef = useRef(null); //마지막 요소를 참조하기 위한 ref
  const [page, setPage] = useState(0); //현재 불러와진 최종 페이지
  const [isLoading, setIsLoading] = useState(false); //데이터를 불러오는 중이면 True
  const [reservationList, setReservationList] = useState([]); //현재 불러와진 예약 리스트

  //IntersectionObserver에 마지막 요소가 잡히면 페이지를 1 증가시킴
  const [observe, unobserve, disconnect] = useIntersectionObserver(() => {
    if (isEnd) return;
    setPage(prev => prev + 1);
  });

  //페이지가 바뀔 때마다 새로운 데이터를 불러옴
  useEffect(() => {
    if (isEnd) return;
    setIsLoading(true);
    const newPage = getUserSummaryList({ page });
    if(newPage.success !== true){
      setIsEnd(true);
      ToastMaker({ type: "error", children: "예약 정보를 불러오지 못했어요." });
      return;
    }
    setIsEnd(newPage.lastPage);
    setReservationList(prev => {
      if (newPage.reservationInfoDTOS.length !== 0)
        return prev.concat(newPage.reservationInfoDTOS);
      return prev;
    });
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (isEnd) {
      disconnect();
      setIsLoading(true);
    }
  }, [isEnd]);

  useEffect(() => {
    if (isEnd) return;
    if (isLoading) unobserve(endRef.current);
    else observe(endRef.current);
  }, [isLoading]);

  useEffect(() => {
    if (isEnd) return;
    setIsLoading(false);
    return () => {
      setReservationList([]);
      if (endRef.current) observe(endRef.current);
    };
  }, []);

  return (
    <ListFrame>
      {reservationList.map((data, index) => (
        <div key={`reserv${index}`}>
          <Link to={`/check/detail/${data.id}`} key={`reserv${index}`}>
            <SummaryItemBox
              model={data.car}
              status={data.status}
              time={data.datetime}
              fee={data.cost}
            />
          </Link>
          <Margin height="20px" />
        </div>
      ))}
      {isEnd ? <ListEnd /> : <LoadingSkeleton ref={endRef} />}
    </ListFrame>
  );
};

export default InfiniteList;
