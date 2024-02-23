import styled from "styled-components";

const CarouselItemList = ({ currentCarouselList }) => {
  return (
    <>
      {currentCarouselList?.map((image, idx) => {
        return (
          <CarouselItem key={`carouselItem${idx}`} id={"carouselItem"}>
            <CarouselImg src={image} alt="carousel-img" draggable={false} />
          </CarouselItem>
        );
      })}
    </>
  );
};

const CarouselItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 10px 0 15px;
  overflow: hidden;
  border-right: 2px solid colors.$WHITE;
  border-left: 2px solid colors.$WHITE;
  transition: border 300ms;

  :root[color-theme="dark"] & {
    .carouselItem {
      border-right: 2px solid colors.$GRAY2;
      border-left: 2px solid colors.$GRAY2;
    }
  }
`;

const CarouselImg = styled.img`
  width: fit-content;
  height: fit-content;
`;

export default CarouselItemList;
