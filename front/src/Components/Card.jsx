import styled from "styled-components"
import Img from "./Img"
import PropTypes from 'prop-types'

/**
 * Component to create a card
 * @name Card
 * @param {string} imgSrc - path of the svg icon.
 * @param {string} bgColor - background-color of the card.
 * @param {string} label - label of the icon.
 * @param {string} width - width of the icon.
 * @param {string} height - height of the icon.
 * @returns {ReactElement} a card with an icon.
 * @component
 */
export default function Card({imgSrc, bgColor, label, width, height, margin}) {
  return (
	<>
		<StyledCard $bgColor={bgColor} $width={width} $height={height} $margin={margin}>
			<Img src={imgSrc} alt={label} />
		</StyledCard>		
	</>
  )
}

const StyledCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FF0101;
	border-radius: 6px;
	width: ${({$width}) => $width};
	height: ${({$height}) => $height};
	background-color: ${({$bgColor}) => $bgColor};
	margin: ${({$margin}) => $margin};
`

Card.propTypes = {
	imgSrc : PropTypes.string,
	bgColor : PropTypes.string,
	label : PropTypes.string,
	width : PropTypes.string,
	height : PropTypes.string,
	margin : PropTypes.string,
}