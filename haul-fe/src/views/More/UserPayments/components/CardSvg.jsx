import CardPreset from "../../../../assets/svgs/CardPreset.svg";

const CardSvg = ({ id, color, size = 140 }) => (
  <svg fill={color} width={size} height={size}>
    <use href={`${CardPreset}#${id}`} />
  </svg>
);

export default CardSvg;
