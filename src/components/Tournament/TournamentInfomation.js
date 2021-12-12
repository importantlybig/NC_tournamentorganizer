import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import moment from 'moment'

const TournamentInfomation = ({
	nameOfTour,
	typeOfTour,
	typeOfSport,
	adminOfTour,
	startAt,
	endAt,
}) => {
	const dateStart = 	moment.unix(startAt).format("MM/DD/YYYY");
	const dateEnd = moment.unix(endAt).format("MM/DD/YYYY");


	const { language, dictionary } = useSelector((state) => state.language)

	return (
		<>
			<Container>
				<Row className='my-5 '>
					<Col md={2} className='text-center me-5'>
						<Image
							src='https://source.unsplash.com/200x200/?technology'
							rounded
							alt="Tournament's logo"
						/>
					</Col>
					<Col md={7} className='my-5 '>
						<h1>{nameOfTour}</h1>
						<div>
							<span className='lead'>{typeOfTour}</span> |{' '}
							<span className='lead'>{typeOfSport}</span> |{' '}
							<span className='lead'>{adminOfTour.split('@')[0]}</span> |{' '}
							<span className='lead'>@Netcompany</span>
						</div>
					</Col>
					<Col md={2} className='my-5'>
						<p>{dictionary[language]['Start day']}: {dateStart}</p>
						<p>{dictionary[language]['End day']}: {dateEnd}</p>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default TournamentInfomation
