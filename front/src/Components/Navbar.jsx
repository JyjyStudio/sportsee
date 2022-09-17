import styled from 'styled-components'
import StyledLink from './StyledLink'
import Img from './Img'
import LogoNavbar from '../assets/logo-navbar.svg'
import Card from './Card'
import Yoga from '../assets/yoga.svg'
import Piscine from '../assets/piscine.svg'
import Velo from '../assets/velo.svg'
import Altere from '../assets/altere.svg'
import BurgerMenu from '../assets/menu-burger-icon.png'
import useViewport from '../utils/Hooks/useViewport'
import { useState } from 'react'


/**
 * The top and left navbar 
 * @name Navbar
 * @returns {ReactElement} the navbar
 * @component
 */
export default function Navbar() {

	//menu burger state
	const [toggleMenu, setToggleMenu] = useState(false)
	const handleMenu = () => setToggleMenu(!toggleMenu)

	const {viewportWidth} = useViewport()
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
			<Nav padding="0 30px"
			height={(viewportWidth < 700 && toggleMenu) ? "auto" : "70px"} >

			{ (viewportWidth > 700 || toggleMenu) && 
				
					<NavList justifyContent="space-between" height="100%">
						{topNavbarItems.map((item, id) => (
							<li key={`${id}-${item.label}`}>
								<StyledLink color="#fff" to={item.path}>
									{ item.imgSrc 
										? <Img src={item.imgSrc} width="150px" alt="sportsee-logo" />
										: item.label }
								</StyledLink>
							</li>
						))}
					</NavList>
			}
			<Button onClick={handleMenu}/>

			</Nav>

			{ viewportWidth > 700 &&
			<Nav
				width="90px"
				height="calc(100vh + 70px)"
				margin="0 50px 0 0"
				float="left"
				justifyContent="center"
				alignItems="center"
				gridTemplateRows="2fr 1fr"
				grid
			>
				<NavList flexDirection="column">
					{ 
						leftNavbarItems.map((item, id) => (
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
						))
					}
				</NavList>
				<Copyright>Copiryght, SportSee {year}</Copyright>
			</Nav>
			}
		</>
	)
}

const Nav = styled.nav`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	margin: ${({ margin }) => margin};
	float: ${({ float }) => float};
	padding: ${({ padding }) => padding};
	background-color: #000;
    display: ${({ grid }) => grid && 'grid'};
	justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
	grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
	@media (max-width: 700px) {
		position: fixed;
		width: 100%;
		top: 0;
		padding: 0;
	}
}
`

const NavList = styled.ul`
	display: flex;
	align-items: center;
	font-weight: 500;
	gap: 2rem;
	background-color: ${({ bgColor }) => bgColor};
	flex-direction: ${({ flexDirection }) => flexDirection};
	justify-content: ${({ justifyContent }) => justifyContent};
	height: ${({ height }) => height};
	width: ${({ width }) => width};
	float: ${({ float }) => float};
	@media (max-width: 1024px) {
		font-size: calc(15px + 1vw);
	}
	@media (max-width: 700px) {
		flex-direction: column;
		justify-content: inherit;
		gap: 0;
		li:nth-child(1) {
			display: none;
		}
		li {
			border-bottom: 1px #fff solid;
			width: 100%;
			text-align: center;
			padding: 1rem 0;
		}
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
const Button = styled.button`
	display: none;
	position: absolute;
	top: .4rem;
	right: 1rem;
	width: 45px;
	height: 45px;
	background-image: url(${BurgerMenu});
	background-size: cover;
	background-color: #000;
	cursor: pointer;
	border: none;
	@media (max-width: 700px) {
		display: block;
	}
`