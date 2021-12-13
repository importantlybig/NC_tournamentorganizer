import classes from './LandingPage.module.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LandingPage = () => {
	const { language, dictionary } = useSelector((state) => state.language)
	return (
		<>
			<div className={`${classes['body-inner']} text-center `}>
				
				<div className={`${classes['body-padding']}`}>
					<h2>MANAGE YOUR TOURNAMENT MORE EFFICIENCY</h2>
					<p className={`h6 lead`}>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged
					</p>
				</div>
				<Link to='/tournaments'>
					<Button variant='btn btn-primary' className={`p-3 mb-3`}>
						<i className='fas fa-arrow-right'></i> {dictionary[language]['FIND TOURNAMENT NOW']}!!
					</Button>
				</Link>
			</div>
		</>
	)
}

export default LandingPage
