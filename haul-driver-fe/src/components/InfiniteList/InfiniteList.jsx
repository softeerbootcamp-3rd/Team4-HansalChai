import styled from "styled-components";
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useRef, useState } from "react";
import Margin from "../Margin/Margin.jsx";
import Typography from "../Typhography/Typhography.jsx";
import SummaryItemBox from "./components/SummaryItemBox.jsx";
import Skeleton from "./components/Skeleton.jsx";
import Flex from "../Flex/Flex.jsx";
import ToastMaker from "../Toast/ToastMaker.jsx";

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

const InfiniteList = ({ fetcher, baseURL, fetcherIndex = null }) => {
  const [isEnd, setIsEnd] = useState(false); //데이터를 모두 불러왔으면 end를 트리거 시키기 위한 state
  const realEndRef = useRef(false); //리스트를 모두 불러왔는지 확인하기 위한 ref
  const endRef = useRef(null); //마지막 요소를 참조하기 위한 ref
  const [page, setPage] = useState(0); //현재 불러와진 최종 페이지
  const [isLoading, setIsLoading] = useState(true); //데이터를 불러오는 중이면 True
  const [reservationList, setReservationList] = useState([]); //현재 불러와진 예약 리스트

  //IntersectionObserver에 마지막 요소가 잡히면 페이지를 1 증가시킴
  const [observe, unobserve, disconnect] = useIntersectionObserver(() => {
    if (realEndRef.current) return;
    setPage(prev => prev + 1);
  });

  //페이지가 바뀔 때마다 새로운 데이터를 불러옴
  useEffect(
    () => async () => {
      if (realEndRef.current) return;
      setIsLoading(true);
      console.log(fetcher);
      const newPage =
        typeof fetcher === "function"
          ? await fetcher({ page })
          : await fetcher[fetcherIndex]({ page });
      console.log(newPage);
      if (newPage.success !== true) {
        setIsEnd(true);
        ToastMaker({
          type: "error",
          children: "예약 정보를 불러오지 못했어요."
        });
        return;
      }

      setIsEnd(newPage.data.lastPage);
      setReservationList(prev => {
        if (newPage.data.list.length !== 0)
          return prev.concat(newPage.data.list);
        return prev;
      });
      setIsLoading(false);
    },
    [page]
  );

  useEffect(() => {
    if (isEnd) {
      setIsLoading(true);
      disconnect();
      endRef.current = null;
      realEndRef.current = true;
    }
  }, [isEnd]);

  useEffect(() => {
    if (realEndRef.current) return;
    if (isLoading) unobserve(endRef.current);
    else observe(endRef.current);
  }, [isLoading]);

  useEffect(() => {
    if (realEndRef.current) return setIsEnd(false);
    setIsLoading(false);
    return () => {
      if (endRef.current) observe(endRef.current);
      setReservationList([]);
      setIsEnd(false);
    };
  }, []);

  return (
    <ListFrame>
      {reservationList.map((data, index) => (
        <div key={`reserv${index}`}>
          <Link to={`${baseURL}/${data.orderId}`} key={`reserv${index}`}>
            <SummaryItemBox
              status={data.status}
              src={data.src}
              dst={data.dst}
              time={data.time}
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
