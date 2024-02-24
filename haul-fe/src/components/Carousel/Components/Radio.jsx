import styled from "styled-components";

const CarouselRadio = ({ carouselList, currentCarouselIndex, handleSwipe }) => {
  return (
    <RadioContainer>
      {carouselList?.map((notUsedItem, carouselIndex) => {
        return (
          <input
            key={`radio${carouselIndex}`}
            type="radio"
            name="carousel"
            id={`radio${carouselIndex}`}
            value={carouselIndex + 1}
            checked={carouselIndex === currentCarouselIndex % carouselList.length}
            onChange={() => {
              handleSwipe(carouselIndex - (currentCarouselIndex % carouselList.length));
            }}
          />
        );
      })}
    </RadioContainer>
  );
};

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & input[type="radio"] {
    background-color: ${({ theme }) => theme.colors.radioUnchecked};
    width: 10px;
    height: 10px;
    &:checked {
      width: 10px;
      height: 10px;
      background-color: ${({ theme }) => theme.colors.mainColor};
    }
  }
`;
export default CarouselRadio;
