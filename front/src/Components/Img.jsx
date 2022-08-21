import PropTypes from 'prop-types'
import styled from 'styled-components'

const Img = styled.img`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	margin: ${(props) => props.margin};
	border-radius: ${(props) => props.borderRadius};
	display: ${({ display }) => display};
	filter: ${({ filter }) => filter};
	cursor: ${({ cursor }) => cursor};
	transition: ${({ transition }) => transition};
	object-fit: ${({ cover }) => (cover ? 'cover' : '')};
	display: block;
	overflow: ${({ overflow }) => overflow};
`
export default Img

Img.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	margin: PropTypes.string,
	borderRadius: PropTypes.string,
	display: PropTypes.string,
	filter: PropTypes.string,
	objectFit: PropTypes.string,
}
