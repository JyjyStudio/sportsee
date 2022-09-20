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
import { useEffect, useState } from 'react'


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
	
	//to adjust the height of the page 
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
	useEffect(() => {
		setViewportHeight(window.innerHeight)
		const heightTimeout = setTimeout(() => {
			setViewportHeight(document.body.scrollHeight)
		}, 300)
		return () => clearTimeout(heightTimeout)
	}, [viewportWidth])

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
		{/* top navbar*/}
			<Nav padding="0 30px" height={(viewportWidth < 700 && toggleMenu) ? "208px" : "70px"} animated>
				{ (viewportWidth > 700 || toggleMenu) && 
					<NavList justifyContent="space-between" height="100%">
						{topNavbarItems.map((item, id) => (
							<li key={`${id}-${item.label}`} tabIndex="1">
								<StyledLink color="#fff" to={item.path} onClick={handleMenu}>
									{ item.imgSrc 
										? <Img src={item.imgSrc} width="150px" alt="sportsee-logo" />
										: item.label }
								</StyledLink>
							</li>
						))}
					</NavList>
				}
			
			{/* Menu burger, only on mobile size */}
			<Button onClick={handleMenu}/>
			
			{/* left navbar */}
			</Nav>
			{ viewportWidth > 700 &&
			<Nav width="80px"
				height={`${viewportHeight}px`}
				margin="0 50px 0 0"
				float="left"
				justifyContent="center"
				alignItems="center"
				gridTemplateRows="30rem 10rem"
				grid >
				<NavList flexDirection="column">
					{ 
						leftNavbarItems.map((item, id) => (
							<li key={`${id}${item.path}`} tabIndex="1">
								<StyledLink color="red" to={item.path}>
									<Card imgSrc={item.imgSrc} bgColor="#fff" label={item.path} width="50px" height="50px" />
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
    transition: ${({ animated }) => animated && "height .2s ease-in-out"};
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
	@media (max-width: 700px) {
		flex-direction: column;
		justify-content: inherit;
		gap: 0;
		li:nth-child(1) { //logo
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