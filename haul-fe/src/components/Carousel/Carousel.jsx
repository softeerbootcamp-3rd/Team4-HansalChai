import { forwardRef, useEffect, useRef, useState } from "react";
import {
  IoIosArrowBack as BackIcon,
  IoIosArrowForward as ForwardIcon
} from "react-icons/io";
import styled from "styled-components";
import CarouselRadio from "./Components/Radio";
import CarouselItemList from "./Components/Item";

const Carousel = ({ carouselList, setSelectedIndex, initialIndex = 0 }) => {
  //현재 위치를 나타내는 인덱스와 이미지 리스트를 관리
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(
    carouselList.length + initialIndex
  );
  const [currentCarouselList, setCurrentCarouselList] = useState();

  //버튼 클릭 시 이미지 이동을 막기 위한 상태
  const [disabled, setDisabled] = useState(false);

  //touch 이벤트 처리를 위한 ref(값을 유지해야 함)
  const touchStartXRef = useRef();
  const touchEndXRef = useRef();

  //캐러셀 리스트(HTML ul 태그)를 담을 ref
  const carouselRef = useRef(null);

  //이미지 이동 함수 - 이미지 인덱스가 바뀌면 바뀐 인덱스의 이미지로 이동
  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currentCarouselIndex}00%)`;
    }
    setSelectedIndex?.(() => currentCarouselIndex % carouselList.length);
  }, [currentCarouselIndex]);

  //캐러셀 리스트가 변경되면 시작과 끝에 이미지를 추가하여 무한 슬라이드 구현
  useEffect(() => {
    if (carouselList.length !== 0) {
      const newList = [...carouselList, ...carouselList, ...carouselList];
      setCurrentCarouselList(newList);
    }
  }, [carouselList]);

  //이미지 이동 함수 - 이미지 인덱스를 받아 해당 이미지로 이동
  //(무한 슬라이드 구현에서 복제된 슬라이드 -> 실제 슬라이드로 바로 이동)
  const moveToNthSlide = index => {
    setTimeout(() => {
      setCurrentCarouselIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = "";
      }
    }, 200);
  };

  //화살표 클릭 이벤트 처리 - 이전, 다음 이미지로 이동
  const handleSwipe = direction => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 200);
    const newIndex = currentCarouselIndex + direction;

    if (newIndex === carouselList.length * 2 + 1) {
      moveToNthSlide(carouselList.length + 1);
    } else if (newIndex === carouselList.length) {
      moveToNthSlide(carouselList.length * 2);
    }

    setCurrentCarouselIndex(prev => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = "all 0.2s ease-in-out";
    }
  };

  //터치 이벤트 처리 - 터치 방향에 따라 이미지 이동
  //터치 시작 이벤트 처리 - 시작 위치 잡기
  const touchStartHandler = e => {
    touchStartXRef.current = disabled ? e.nativeEvent.touches[0].clientX : null;
  };

  //터치 이동 이벤트 처리 - 터치 중 손가락 움직임에 따라 이미지 이동
  const touchMoveHandler = e => {
    if (disabled) return;
    if (touchStartXRef.current === null)
      touchStartXRef.current = e.nativeEvent.changedTouches[0].clientX;
    const currentTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(calc(-${currentCarouselIndex}00% - ${
        (touchStartXRef.current - currentTouchX) * 0.1 || 0
      }px))`;
    }
  };

  //터치 종료 이벤트 처리 - 터치 종료 시 이동 방향에 따라 이미지 이동(1개씩만 이동 가능)
  const touchEndHandler = e => {
    if (disabled || touchStartXRef.current === null) return;
    touchEndXRef.current = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartXRef.current > touchEndXRef.current) {
      handleSwipe(1);
    } else if (touchStartXRef.current < touchEndXRef.current) {
      handleSwipe(-1);
    }
  };

  return (
    <>
      <Container>
        <CarouselWrapper
          onTouchStart={touchStartHandler}
          onTouchMove={touchMoveHandler}
          onTouchEnd={touchEndHandler}
        >
          <CarouselBtn
            type="button"
            className={"carousel__left-btn"}
            id={"carouselLeftBtn"}
            onClick={() => handleSwipe(-1)}
            disabled={disabled}
          >
            <BackIcon />
          </CarouselBtn>
          <RefedCarouselList id={"carouselList"} ref={carouselRef}>
            <CarouselItemList currentCarouselList={currentCarouselList} />
          </RefedCarouselList>
          <CarouselBtn
            type="button"
            className={"carousel__right-btn"}
            id={"carouselRightBtn"}
            onClick={() => handleSwipe(1)}
            disabled={disabled}
          >
            <ForwardIcon />
          </CarouselBtn>
        </CarouselWrapper>
      </Container>
      <CarouselRadio
        carouselList={carouselList}
        currentCarouselIndex={currentCarouselIndex}
        handleSwipe={handleSwipe}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10%;
  overflow: hidden;
  &:hover {
    button {
      position: absolute;
      top: 45%;
      z-index: 1;
      display: block;
      padding: 8px 6px;
      background-color: ${({ theme }) => theme.colors.carBackground};
      border-radius: 10px;
    }
  }
  &.carousel {
    display: flex;
    width: 100%;
  }
  li {
    flex: none;
    object-fit: contain;
  }
`;

const CarouselBtn = styled.button`
  display: none;
  &.carousel__left-btn {
    left: 0px;
  }
  &.carousel__right-btn {
    right: 0px;
  }
`;

const CarouselList = styled.ul`
  display: flex;
  width: 100%;
`;

const RefedCarouselList = forwardRef((props, ref) => {
  return <CarouselList ref={ref} {...props}></CarouselList>;
});

RefedCarouselList.displayName = "CarouselList";

export default Carousel;
