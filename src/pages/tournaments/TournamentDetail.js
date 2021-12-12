import { useEffect, useState } from "react";
import { Switch, useParams, Route, useRouteMatch } from "react-router";
import EnrollForm from "../../components/Form/EnrollForm";
import Brackets from "../../components/Tournament/Brackets";
import Competitors from "../../components/Tournament/Compeititors";
import Dashboard from "../../components/Tournament/Dashboard";
import Ranking from "../../components/Tournament/Ranking";
import TabBar from "../../components/Tournament/TabBar";
import TournamentInfomation from "../../components/Tournament/TournamentInfomation";
import { getTournamentDetail } from "../../lib/tournament-api";

const TournamentDetail = () => {
  const { id } = useParams();
  const {path,url} = useRouteMatch();
  const [nameOfTour, setNameOfTour] = useState("");
  const [typeOfTour, setTypeOfTour] = useState("");
  const [typeOfSport, setTypeOfSport] = useState("");
  const [adminOfTour, setAdminOfTour] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [tourDescription, setTourDescription] = useState("");
  const [location, setLocation] = useState("");
  const [matchRules, setMatchRules] = useState("");

  useEffect(() => {
    const loadTournamentDetail = async () => {
      try {
        const res = await getTournamentDetail(id);
        //console.log(res)
        setNameOfTour(res.name);
        setTypeOfTour(res.tournamentStructure);
        setTypeOfSport(res.sportType.sportName);
        setAdminOfTour(res.createdBy);
        // const dateStart = new Date(res.startAt)
        // const dateEnd = new Date(res.endAt)
        setStartAt(res.startAt);
        setEndAt(res.endAt);
        setTourDescription(res.description);
        setLocation(res.location);
        setMatchRules(res.rule);
      } catch (error) {
        console.log(error.message);
      }
    };

    loadTournamentDetail();
  }, [id]);

  return (
    <>
      <TournamentInfomation
        nameOfTour={nameOfTour}
        typeOfTour={typeOfTour}
        typeOfSport={typeOfSport}
        adminOfTour={adminOfTour}
        startAt={startAt}
        endAt={endAt}
      />
      <TabBar />
      <Switch>
        <Route path={`${path}/dashboard`} exact >
          <Dashboard
            id={id}
            description={tourDescription}
            location={location}
            matchRules={matchRules}
            name={nameOfTour}
          />
        </Route>
        <Route path={`${path}/enrollment`} >
          <EnrollForm tournamentId={id} />
        </Route>
        <Route path={`${path}/brackets`} >
          <Brackets/>
        </Route>
        <Route path={`${path}/ranking`} >
          <Ranking/>
        </Route>
        <Route path={`${path}/compeititors`} >
          <Competitors/>
        </Route>
      </Switch>
    </>
  );
};

export default TournamentDetail;
