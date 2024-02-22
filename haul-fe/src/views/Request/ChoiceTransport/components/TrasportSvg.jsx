import TranportSvgs from "../../../../assets/svgs/TransportSvg.svg"

const TranportSvg = ({id, color, size=140}) => (
    <svg fill={color} width={size} height={size}>
        <use href={`${TranportSvgs}#${id}`} />
    </svg>
)

export default TranportSvg;