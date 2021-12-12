import Wrapper from '../UI/Wrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
	
	const { language, dictionary } = useSelector((state) => state.language)

	return (
		<>
			<Container >
				<Row className='my-5'>
					<Col md={4} className='text-center'>
						<p className='lead fw-bold'>{dictionary[language]['Current match']}</p>
						<Wrapper>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 1</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 2</span>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 3</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 4</span>
								</div>
							</div>
						</Wrapper>
						<p className='lead fw-bold'>{dictionary[language]['Lastest results']}</p>
						<Wrapper>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 1</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 2</span>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 3</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 4</span>
								</div>
							</div>
						</Wrapper>
						<p className='lead fw-bold'>{dictionary[language]['Upcoming match']}</p>
						<Wrapper>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 1</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 2</span>
								</div>
							</div>
							<div className='d-flex justify-content-between'>
								<div>
									<span>Team 3</span>
								</div>
								<div>
									<span>vs</span>
								</div>
								<div>
									<span>Team 4</span>
								</div>
							</div>
						</Wrapper>
					</Col>
					<Col md={8}>
						<div className='d-flex justify-content-between'>
							<div>
								<h4>{props.name}</h4>
							</div>
							<LinkContainer
								to={`/tournaments/${props.id}/enrollment`}
								className='btn btn-secondary'
								variant='dark'
							>
								<div>{dictionary[language]['Enroll now']}</div>
							</LinkContainer>
						</div>
						<div className='mt-4 mx-4'>
							<span className='fw-bold'>{dictionary[language]['Tournament description']}: </span>
							<span>{props.description}</span>
						</div>
						{/* <div className='mt-4'>
							<span className='fw-bold'>Stadium: </span>
							<span>Etihad</span>
						</div> */}
						<div className='mt-4'>
							<span className='fw-bold'>{dictionary[language]['Location']}: </span>
							<span>{props.location}</span>
						</div>
						<div className='mt-4'>
							<span className='fw-bold'>{dictionary[language]["Match's rules"]}: </span>
							<span>{props.matchRules}</span>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Dashboard
