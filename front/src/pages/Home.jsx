import styled from "styled-components"
import StyledLink from "../Components/StyledLink"

/**
 * Sportsee homepage. allows you to choose a user and see his stats page
 * @name Home
 * @returns {ReactElement} homepage view
 * @component
 */
export default function Home() {
  return (
	<Wrapper>
		<H1>Bienvenue sur <Span color="#FF0101">SportSee</Span></H1>
		<P marginTop="1rem">Projet 12 de la formation OpenClassrooms, création d'un tableau de bord avec React et D3.js. Cliquez sur l'identifiant d'un utilisateur pour voir ses données :</P>
		<P marginTop="1rem">
			<StyledLink to="/user/12">User 12</StyledLink>
		</P>
		<P>
			<StyledLink to="/user/18">User 18</StyledLink>
		</P>
	</Wrapper>
  )
}

const Wrapper = styled.main`
	margin-left: 130px;
	margin-top: 20px;
	@media (max-width: 700px) {
		margin: 100px 0;
		padding: 0 30px;
	}
`
const H1 = styled.h1`
	font-size: 40px;
`
const Span = styled.span`
	color: ${({color}) => color};
`
const P = styled.p`
	margin-top: ${({marginTop}) => marginTop};
`