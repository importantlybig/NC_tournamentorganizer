import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLang from './ButtonLang'
import { authActions } from '../../store/auth'
import { useHistory } from 'react-router'

const Header = () => {
	const { isLoggedIn, role } = useSelector((state) => state.auth)
	const { language, dictionary } = useSelector((state) => state.language)
	const userInfo = useSelector((state) => state.auth)
	// console.log(userInfo)

	const dispatch = useDispatch()
	const history = useHistory()

	const logoutHandler = () => {
		dispatch(authActions.logout())
		history.replace('/welcome')
	}

	return (
		<header>
			<Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>NC Tournament Organizer</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav' className='text-center'>
						<Nav className='me-auto'></Nav>
						<Nav>
							<LinkContainer to='/'>
								<Nav.Link>
									<i className='fas fa-home'></i> {dictionary[language]['Home']}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/user/createtournament' className='mx-4'>
								<Nav.Link>
									<i className='fas fa-plus'></i>{' '}
									{dictionary[language]['Create tournament']}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/tournaments'>
								<Nav.Link>
									<i className='fas fa-search'></i>{' '}
									{dictionary[language]['Find tournament']}
								</Nav.Link>
							</LinkContainer>

							{!isLoggedIn && (
								<LinkContainer to='/login' className='mx-4'>
									<Nav.Link>
										<i className='fas fa-user'></i>{' '}
										{dictionary[language]['Sign In']}
									</Nav.Link>
								</LinkContainer>
							)}
							{isLoggedIn && (
								<NavDropdown
									title={userInfo.name}
									id='username'
									className='mx-4'
								>
									<LinkContainer to='/user/profile'>
										<NavDropdown.Item>{dictionary[language]['Profile']}</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/user/mytournament'>
										<NavDropdown.Item>{dictionary[language]['My tournaments']}</NavDropdown.Item>
									</LinkContainer>
									{role === 'SUPER_ADMIN' && (
										<LinkContainer to='/user/sadm'>
											<NavDropdown.Item>{dictionary[language]['Accounts management']}</NavDropdown.Item>
										</LinkContainer>
									)}
									<NavDropdown.Item onClick={logoutHandler}>
										{dictionary[language]['Sign out']}
									</NavDropdown.Item>
								</NavDropdown>
							)}
							<ButtonLang />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
