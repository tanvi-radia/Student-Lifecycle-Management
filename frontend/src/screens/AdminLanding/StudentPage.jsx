import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { evaluateAch, listStuAch } from "../../actions/adminActions";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { baseUrl } from "../../constants/userConstants";

const StudentPage = ({ history, match, search }) => {
  const dispatch = useDispatch();
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const stuAchList = useSelector((state) => state.stuAchList);
  const { error, loading, achsList } = stuAchList;

  const evaluate = useSelector((state) => state.evaluate);
  const { loading: eLoad, success, error: eError } = evaluate;

  useEffect(() => {
    dispatch(listStuAch(match.params.sid));
    // if (!userInfo) {
    //   history.push("/");
    // }
  }, [history, dispatch, success, eError]);
  // const achs = [
  //   {
  //     id: 1,
  //     s_id: 1,
  //     name: "aaaaa",
  //     verified: false,
  //   },
  //   {
  //     id: 2,
  //     s_id: 1,
  //     name: "oooo",
  //     verified: false,
  //   },
  //   {
  //     id: 3,
  //     s_id: 2,
  //     name: "nnnnnnn",
  //     verified: false,
  //   },
  // ];

  const verifyOne = (id, stat, u_id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(evaluateAch(id, stat, u_id));
    }
  };
  return (
    <MainScreen title={`For student ${match.params.sid}`}>
      {eLoad && <Loading />}
      {loading && <Loading />}
      <ListGroup>
        {achsList
          // ?.filter((fAch) => fAch.s_id == match.params.sid)
          ?.filter((filteredNote) => filteredNote.year.includes(search))
          ?.map((ach) => (
            <>
              <Accordion>
                <Card style={{ margin: 10 }} key={ach._id}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {ach.title}
                      </Accordion.Toggle>
                    </span>
                    <Button
                      className="text-right"
                      variant={ach.isVerified ? "danger" : "primary"}
                      onClick={() => {
                        const stat = ach.isVerified ? false : true;
                        verifyOne(ach._id, stat, ach.s_id);
                      }}
                    >
                      {ach.isVerified ? "Unverify" : "Verify"} this achievement
                    </Button>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h5>
                        {ach.category}: {ach.subcategory}
                        <div>Year: {ach.year}</div>
                      </h5>
                      <h4>
                        <Badge variant={ach.isVerified ? "success" : "dark"}>
                          {ach.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </h4>
                      <img src="" alt={`${ach.certificate}`} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              {/* <ListGroupItem key={ach._id}> 
                <span>{ach.title}</span>
                <span className="mx-5">
                  <Badge variant={ach.isVerified ? "success" : "dark"}>
                    {ach.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </span>
                <Button
                  className="text-right"
                  onClick={() => {
                    const stat = ach.isVerified ? false : true;
                    verifyOne(ach._id, stat, ach.s_id);
                  }}
                >
                  {ach.isVerified ? "Unverify" : "Verify"} this achievement
                </Button>
              </ListGroupItem> */}
            </>
          ))}
      </ListGroup>
    </MainScreen>
  );
};

export default StudentPage;
