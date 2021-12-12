import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				width: '40px',
				height: '40px',
				margin: '4em auto',
				size: 'lg',
				display: 'flex',
				alignItems: 'center',
				textAlign: 'center',
			}}
		>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	)
}

export default Loader
