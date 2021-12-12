import React, { Suspense } from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import Welcome from './pages/Welcome'
import FindTournament from './pages/FindTournament'

import Header from './components/UI/Header'
import Footer from './components/UI/Footer'
import { useSelector } from 'react-redux'
import TournamentDetail from './pages/tournaments/TournamentDetail'
import { Container } from 'react-bootstrap'
import Loader from './components/UI/Loader'

//Lazy loading (import or load specific component only when it is needed)
//For optimization
// const Sadm = React.lazy(() => import('./pages/Sadm'))
// const CreateTournament = React.lazy(() =>
// 	import('./pages/user/CreateTournament')
// )
const Login = React.lazy(() => import('./pages/Login'))
const User = React.lazy(() => import('./pages/user/User'))

function App() {
	const authCtx = useSelector((state) => state.auth)
	const isLoggedIn = authCtx.isLoggedIn
	const role = authCtx.role

	return (
		<Router>
			<Header />
			<Suspense fallback={
			<Container className="vh-100">
				<Loader></Loader>
			</Container>
		
		}
			>
				<Switch>
					<Route path='/' exact>
						<Redirect to='/welcome'></Redirect>
					</Route>
					<Route path='/welcome'>
						<Welcome></Welcome>
					</Route>
					<Route path='/user'>
						{!isLoggedIn && <Redirect to='/login' />}
						{isLoggedIn && <User role={role}></User>}
					</Route>
					<Route path='/login'>
						{/* if user is already logged => redirect to create tournament page */}
						{isLoggedIn && <Redirect to='/user/createtournament' />}
						<Login></Login>
					</Route>

					<Route path='/tournaments' exact>
						<FindTournament />
					</Route>
					<Route path='/tournaments/:id'>
						<TournamentDetail />
					</Route>
					<Route path='/*'>
						<p>404 page</p>
					</Route>
				</Switch>
			</Suspense>
			<Footer />
		</Router>
	)
}

export default App
