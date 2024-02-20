import styled from "styled-components";
import { Link } from "react-router-dom";
import { forwardRef, useEffect, useRef, useState } from "react";
import Margin from "../Margin/Margin.jsx";
import Typography from "../Typhography/Typhography.jsx";
import SummaryItemBox from "./components/SummaryItemBox.jsx";
import Skeleton from "./components/Skeleton.jsx";
import Flex from "../Flex/Flex.jsx";
import ToastMaker from "../Toast/ToastMaker.jsx";
import { isTokenInvalid } from "../../repository/userRepository.jsx";

// eslint-disable-next-line react/display-name
const LoadingSkeleton = forwardRef((props, ref) => {
  return (
    <div ref={ref} id="loadingskeleton">
      <Skeleton />
    </div>
  );
});

const ListFrame = styled.div`
  width: 100%;
  height: fit-content;
  ${({ theme }) => theme.flex.flexColumn};
  padding-bottom: 100px;
`;

const ListEnd = () => {
  return (
    <div id="listend">
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
  //useEffect를 통해 컴포넌트 생성시에만 observer를 생성하고, 컴포넌트가 사라질 때에만 observer를 제거함
  const observer = useRef();
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.style.display = "none";
          callback();
        });
      },
      { threshold: 0 }
    );
    return () => observer.current.disconnect();
  }, []);

  const observe = element => {
    observer.current.observe(element);
  };

  const unobserve = element => {
    observer.current.unobserve(element);
  };

  const disconnect = () => {
    observer.current.disconnect();
  };

  return { observe, unobserve, disconnect };
}

const InfiniteList = ({
  fetcher,
  baseURL,
  listStatus,
  emptyListView = <></>
}) => {
  const [isEnd, setIsEnd] = useState(false); //데이터를 모두 불러왔으면 end를 트리거 시키기 위한 state
  const endRef = useRef(null); //마지막 요소를 참조하기 위한 ref
  const page = useRef(0); //현재 불러와진 최종 페이지
  const isLoading = useRef(false); //데이터를 불러오는 중이면 True
  //const [isLoading, setIsLoading] = useState(true); //데이터를 불러오는 중이면 True
  const [reservationList, setReservationList] = useState([]); //현재 불러와진 예약 리스트

  //IntersectionObserver에 마지막 요소가 잡히면 페이지를 1 증가시킴
  const { observe, disconnect } = useIntersectionObserver(() => {
    if (isLoading.current) return;

    page.current += 1;
    (async () => {
      await runFetcher();
    })();
  });

  const runFetcher = async () => {
    //if (isLoading.current) return;
    isLoading.current = true;
    const newPage =
      typeof fetcher === "function"
        ? await fetcher({ page: page.current })
        : await fetcher[listStatus]({ page: page.current });
    if (newPage.success !== true) {
      if (!isTokenInvalid(newPage.code)) {
        setIsEnd(true);
        if (newPage.code === 1003) {
          ToastMaker({
            type: "error",
            children: newPage.message
          });
        }
        ToastMaker({
          type: "error",
          children: newPage.message
        });
      }
      return;
    }
    setReservationList(prev => prev.concat(newPage.data.list));
    setIsEnd(newPage.data.lastPage);
    endRef.current.style.display = newPage.data.lastPage ? "none" : "";
    isLoading.current = false;
  };

  useEffect(() => {
    page.current = 0;
    setReservationList([]);
    setIsEnd(false);
    (async () => {
      await runFetcher();
    })();
  }, [listStatus]);

  useEffect(() => {
    observe(endRef.current);
    return () => disconnect();
  }, []);

  const ListTail = () => {
    if (isEnd) {
      if (reservationList.length === 0) return emptyListView;
      return ListEnd();
    }
  };

  return (
    <ListFrame>
      {reservationList.map((data, index) => (
        <div key={`reserv${index}`}>
          <Link to={`${baseURL}/${data.orderId}`} key={`reserv${index}`}>
            <SummaryItemBox
              index={index}
              selectedStatus={listStatus}
              src={data.src}
              dst={data.dst}
              time={data.time}
              fee={data.cost}
            />
          </Link>
          <Margin height="20px" />
        </div>
      ))}
      <ListTail />
      <LoadingSkeleton ref={endRef} />
    </ListFrame>
  );
};

export default InfiniteList;
