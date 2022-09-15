import styled from 'styled-components'
import StyledLink from './StyledLink'
import Img from './Img'
import LogoNavbar from '../assets/logo-navbar.svg'
import Card from './Card'
import Yoga from '../assets/yoga.svg'
import Piscine from '../assets/piscine.svg'
import Velo from '../assets/velo.svg'
import Altere from '../assets/altere.svg'

/**
 * The top and left navbar 
 * @returns {ReactElement} the navbar
 */
export default function Navbar() {
	const year = new Date().getFullYear()

	const topNavbarItems = [
		{ imgSrc: LogoNavbar, path: '/' },
		{ label: 'Accueil', path: '/' },
		{ label: 'Profil', path: '#profil' },
		{ label: 'Réglages', path: '#reglages' },
		{ label: 'Communauté', path: '#communaute' },
	]
	const leftNavbarItems = [
		{ imgSrc: Yoga, path: '#yoga' },
		{ imgSrc: Piscine, path: '#piscine' },
		{ imgSrc: Velo, path: '#velo' },
		{ imgSrc: Altere, path: '#musculation' },
	]
	return (
		<>
			<Nav height="70px" bgColor="#000" padding="0 30px">
				<NavList justifyContent="space-between" height="100%">
					{topNavbarItems.map((item, id) => (
						<li key={`${id}-${item.label}`}>
							<StyledLink color="#fff" to={item.path}>
								{item.imgSrc ? (
									<Img
										src={item.imgSrc}
										width="150px"
										alt="sportsee-logo"
									/>
								) : (
									item.label
								)}
							</StyledLink>
						</li>
					))}
				</NavList>
			</Nav>
			<Nav
				width="90px"
				height="calc(100vh + 70px)"
				bgColor="#000"
				float="left"
				justifyContent="center"
				alignItems="center"
				gridTemplateRows="2fr 1fr"
				column
				grid
			>
				<NavList column>
					{leftNavbarItems.map((item, id) => (
						<li key={`${id}${item.path}`}>
							<StyledLink color="red" to={item.path}>
								<Card
									imgSrc={item.imgSrc}
									bgColor="#fff"
									label={item.path}
									width="50px"
									height="50px"
								/>
							</StyledLink>
						</li>
					))}
				</NavList>
				<Copyright>Copiryght, SportSee {year}</Copyright>
			</Nav>
		</>
	)
}

const Nav = styled.nav`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	float: ${({ float }) => float};
	padding: ${({ padding }) => padding};
	background-color: ${({ bgColor }) => bgColor};
    display: ${({ grid }) => grid && 'grid'};
	justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
	grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
}
`

const NavList = styled.ul`
	display: flex;
	align-items: center;
	font-weight: 500;
	gap: 2rem;
	background-color: ${({ bgColor }) => bgColor};
	flex-direction: ${({ column }) => (column ? 'column' : 'row')};
	justify-content: ${({ justifyContent }) => justifyContent};
	height: ${({ height }) => height};
	width: ${({ width }) => width};
	float: ${({ float }) => float};
	@media (max-width: 1024px) {
		font-size: calc(15px + 1vw);
	}
	@media (max-width: 389px) {
		font-size: calc(15px + 2vw);
	}
`
const Copyright = styled.div`
	color: #fff;
	transform: rotate(-90deg);
	font-size: 14px;
	width: 10rem;
`
