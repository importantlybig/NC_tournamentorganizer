import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Image, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile, getUserDetails } from '../../lib/user-api'
import { notificationActions } from '../../store/notification'
import { authActions } from '../../store/auth'
import {
	// isEmpty,
	// isEmailValid,
	isPasswordContentValid,
	isRePasswordMatch,
	isPasswordLengthValid,
} from '../../utils/inputValidation'
import Loader from '../../components/UI/Loader'
// import Footer from '../components/UI/Footer'

const Profile = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [image, setImage] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [loading, setLoading] = useState(false)

	const history = useHistory()

	const { language, dictionary } = useSelector((state) => state.language)

	const dispatch = useDispatch()

	const userInfo = useSelector((state) => state.auth)
	//console.log(userInfo)
	const { message } = useSelector((state) => state.notification)

	const uploadImage = async (e) => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'NCTournamentOrganizer')

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/pntrongdai/image/upload/',
			{
				method: 'POST',
				body: data,
			}
		)
		const file = await res.json()
		//console.log(file)

		setImage(`${file.url}`)
	}

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const res = await getUserDetails(userInfo.id, userInfo.token)
				console.log(res)
				setFirstName(res.firstName)
				setLastName(res.lastName)
				setEmail(res.email)
				setImage(res.image)
			} catch (error) {
				console.log(error.message)
			}
		}

		loadProfile()
	}, [userInfo.id, userInfo.token])

	const submitHandler = async (e) => {
		e.preventDefault()

		//Validate password length
		if (!isPasswordLengthValid(password)) {
			dispatch(
				notificationActions.fail({
					inputType: 'PASSWORD',
					errorMessage: `Passworld length must be greater than 8`,
				})
			)
			return
		}

		//Validate password content
		if (!isPasswordContentValid(firstName, lastName, password)) {
			dispatch(
				notificationActions.fail({
					inputType: 'PASSWORD',
					errorMessage: `Password must not be first name or lastname`,
				})
			)
			return
		}

		//Validate re-entered password match
		if (!isRePasswordMatch(password, confirmPassword)) {
			dispatch(
				notificationActions.fail({
					inputType: 'RE-PASSWORD',
					errorMessage: `Re-enterd password does not match password`,
				})
			)
			return
		}

		const updatedData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			image: image,
			password: password,
		}

		dispatch(notificationActions.pending('SENDING REQUEST TO SERVER'))
		try {
			setLoading(true)
			await updateUserProfile(userInfo.token, updatedData, userInfo.id)
			dispatch(notificationActions.pending('ACCOUNT UPDATED SUCCESSFULLY'))

			dispatch(authActions.logout())
			dispatch(notificationActions.reset())
			setLoading(false)
			history.replace('/login')
		} catch (error) {
			dispatch(notificationActions.fail(error))
			// doing
		}
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container className='py-5'>
					<Row>
						<Col xs={12} md={6} className='text-center'>
							<Image
								src={image}
								roundedCircle
								className='mb-3 fix-size-image'
								alt='User Image'
							/>
							<p className='lead'>Email: {email}</p>
						</Col>
						<Col xs={12} md={6}>
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='firstname'>
									<Form.Label>{dictionary[language]['First name']}</Form.Label>
									<Form.Control
										defaultValue={firstName}
										type='name'
										placeholder={dictionary[language]['Enter first name']}
										onChange={(e) => setFirstName(e.target.value)}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId='lastname' className='py-3'>
									<Form.Label>{dictionary[language]['Last name']}</Form.Label>
									<Form.Control
										defaultValue={lastName}
										type='name'
										placeholder={dictionary[language]['Enter last name']}
										onChange={(e) => setLastName(e.target.value)}
									></Form.Control>
								</Form.Group>

								{/* <Form.Group controlId='email' className='mb-3'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										defaultValue={email}
										type='email'
										placeholder='Enter email'
										onChange={(e) => setEmail(e.target.value)}
										isInvalid={message.inputType === 'EMAIL'}
									></Form.Control>
									<Form.Control.Feedback type='invalid'>
										{message.errorMessage}
									</Form.Control.Feedback>
								</Form.Group> */}

								<Form.Label>{dictionary[language]['Profile image']}</Form.Label>
								<Form.Group controlId='formFile' className='mb-3'>
									<Form.Control
										defaultValue={image}
										type='file'
										accept='images/*'
										onChange={uploadImage}
									/>
								</Form.Group>

								<Form.Group controlId='password'>
									<Form.Label>{dictionary[language]['Password']}</Form.Label>
									<Form.Control
										type='password'
										placeholder={dictionary[language]['Enter password']}
										onChange={(e) => setPassword(e.target.value)}
										isInvalid={message.inputType === 'PASSWORD'}
									></Form.Control>
									<Form.Control.Feedback type='invalid'>
										{message.errorMessage}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId='confirmPassword' className='py-4'>
									<Form.Label>{dictionary[language]['Confirm password']}</Form.Label>
									<Form.Control
										type='password'
										placeholder={dictionary[language]['Confirm password']}
										onChange={(e) => setConfirmPassword(e.target.value)}
										isInvalid={message.inputType === 'RE-PASSWORD'}
									></Form.Control>
									<Form.Control.Feedback type='invalid'>
										{message.errorMessage}
									</Form.Control.Feedback>
								</Form.Group>

								<div className='d-flex mx-5'>
									<Link
										type='submit'
										variant='btn btn-secondary secondary'
										className='btn btn-secondary px-4 py-2 mx-5'
										to={'/welcome'}
									>
										{dictionary[language]['Cancel']}
									</Link>
									<Button type='submit' variant='primary' className='px-4'>
										{dictionary[language]['Update']}
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
					{/* <Footer /> */}
				</Container>
			)}
		</>
	)
}

export default Profile
