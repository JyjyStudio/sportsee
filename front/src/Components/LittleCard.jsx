import styled from "styled-components"
import Img from "./Img"

export default function LittleCard({imgSrc, $bgColor, label}) {
  return (
	<>
		<StyledCard bgColor={$bgColor}>
			<Img src={imgSrc} alt={label} />
		</StyledCard>		
	</>
  )
}

const StyledCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 52px;
	height: 52px;
	color: #FF0101;
	border-radius: 6px;
	background-color: ${({bgColor}) => bgColor};
`
