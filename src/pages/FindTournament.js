import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap'
import TournamentItem from '../components/Tournament/TournamentItem'
import Loader from '../components/UI/Loader'
import MyPagination from '../components/UI/MyPagination'
import Search from '../components/UI/Search'
import useHttp from '../hooks/useHttp'
import { getTournaments } from '../lib/tournament-api'
const FindTournament = () => {
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)
	const [tournaments, setTournaments] = useState([])
	const [searchKeyword, setSearchKeyWord] = useState('')
	console.log(searchKeyword)

	const { language, dictionary } = useSelector((state) => state.language)

	const tournamentList = tournaments.map((tournament) => {
		return (
			<TournamentItem
				key={tournament.id}
				name={tournament.name}
				structure={tournament.tournamentStructure}
				id={tournament.id}
			/>
		)
	})

	const onSelectPageHandler = (pageSelected) => {
		setCurrentPage(pageSelected)
	}

	const {
		httpRequest: sendTournamentRequest,
		isLoading,
		hasError,
		errorMessage,
	} = useHttp()



	useEffect(() => {
		sendTournamentRequest(
			getTournaments,
			{ page: currentPage, search: searchKeyword },
			(data) => {
				setTotalPages(data.totalPages - 1)
				setTournaments(data.content)
			}
		)
	}, [currentPage, searchKeyword, sendTournamentRequest])

	const onSearchByKeywordHander = (keyword) => {
		setSearchKeyWord(keyword)
		setCurrentPage(0)
	}

	return (
		<Container className="mb-5">
			<h2 className='my-5 text-center'>
				{dictionary[language]['Available tournaments']}: {tournaments.length}
			</h2>
			<Search
				defaultKeyword={searchKeyword}
				searchHandler={onSearchByKeywordHander}
			/>
			<Row>
				{isLoading && <Loader />}
				{!isLoading && hasError && (
					<Col xs={12}>
						<p className='text-center'>{errorMessage}</p>
					</Col>
				)}
				{!isLoading && !hasError && tournamentList.length === 0 && (
					<Col xs={12}>
						<p className='text-center'>No records</p>
					</Col>
				)}
			</Row>
			<Row xs={1} sm={2} md={3} lg={4} className='g-4'>
				{!isLoading && !hasError && tournamentList}
			</Row>
			<div className='d-flex justify-content-center mt-3'>
				<MyPagination
					current={currentPage}
					total={totalPages}
					onSelect={onSelectPageHandler}
				></MyPagination>
			</div>
		</Container>
	)
}

export default FindTournament
