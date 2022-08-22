import styled from "styled-components"
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
	color: ${props => props.color ? props.color : "black"};
	text-decoration: ${props => props.$underlined ? 'underline' : 'none'};
	margin: ${({margin}) => margin};
	font-size: ${({fontSize}) => fontSize};
	display: ${({display}) => display};
	justify-content: ${({$justifyContent}) => $justifyContent};
	align-items: ${({$alignItems}) => $alignItems};
	&:hover {
		text-decoration: underline;
	}
`
export default StyledLink
