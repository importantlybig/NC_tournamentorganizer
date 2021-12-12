import React, { useState } from 'react'
import Button from '@restart/ui/esm/Button'
import { Form } from 'react-bootstrap'
import { languageActions } from '../../store/lang'
import { useDispatch, useSelector } from 'react-redux'

const ButtonLang = () => {
	const { language, dictionary } = useSelector((state) => state.language)
	const [isLanguageToggleDisable, setIsLanguageToggleDisable] = useState(false)

	const dispatch = useDispatch()

	const languageToggleHandler = () => {
		console.log(language)
		if (language === 'ENG') {
			console.log(!dictionary['VIE'])
			if (!dictionary['VIE']) {
				setIsLanguageToggleDisable(true)
				fetch('/vie.json')
					.then((res) => res.json())
					.then((data) => {
						console.log(data)
						dispatch(languageActions.addLanguageVIE(data['VIE']))
						setIsLanguageToggleDisable(false)
					})
					.catch((error) => {
						console.log('FAIL TO LOAD VIETNAMESE LANGUAGE LIBRARY')
						const toggleBtn = document.getElementById('language-switch')
					})
			} else {
				dispatch(languageActions.setLanguageToVIE())
			}
		} else {
			dispatch(languageActions.setLanguageToENG())
		}
		console.log('Done')
	}

	const languageToggleBtn = (
		<>
			<input
				type='checkbox'
				id='language-switch'
				class={`form-check-input ${language === 'VIE' && 'bg-danger'}`}
				onClick={languageToggleHandler}
				disabled={isLanguageToggleDisable}
			></input>
			<label title='' for='custom-switch' class='form-check-label'>
				{language}
			</label>
		</>
	)

	return (
		<Button className='btn btn-primary'>
			<Form.Check
				type='switch'
				id='custom-switch'
				label='VIE'
				bsPrefix='mb-0'
				children={languageToggleBtn}
			/>
		</Button>
	)
}

export default ButtonLang
