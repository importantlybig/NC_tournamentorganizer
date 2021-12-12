import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux'
const TabBar = () => {
	const { language, dictionary } = useSelector((state) => state.language)

	const {url} = useRouteMatch();

	return (
		<>
			<Navbar collapseOnSelect expand='lg' bg='secondary' variant='dark'>
				<Container>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav' className='text-center'>
						<Nav>
							<LinkContainer to={`${url}/dashboard`}>
								<Nav.Link>
									<i class='fas fa-cog'></i> {dictionary[language]['Dashboard']}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to={`${url}/brackets`} className='mx-4'>
								<Nav.Link>
									<i class='fas fa-code'></i> {dictionary[language]['Brackets']}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to={`${url}/compeititors`}>
								<Nav.Link>
									<i class='fas fa-users'></i>{' '}
									{dictionary[language]['Competitors']}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer  to={`${url}/ranking`} className='mx-4'>
								<Nav.Link>
									<i class='fas fa-star'></i> {dictionary[language]['Rank']}
								</Nav.Link>
							</LinkContainer>
							{/* <LinkContainer to='/'>
								<Nav.Link>
									<i class='fas fa-user-cog'></i>{' '}
									{dictionary[language]['Configuration']}
								</Nav.Link>
							</LinkContainer> */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default TabBar
