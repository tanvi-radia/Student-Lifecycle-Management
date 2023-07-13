import React, { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPub } from "../../actions/pubActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const PublicScreen = () => {
  const dispatch = useDispatch();
  const [sid, setSid] = useState("");

  const pubFetchList = useSelector((state) => state.pubFetchList);
  const { loading, error, pubList } = pubFetchList;
  // const pubList = [
  //   {
  //     id: 1,
  //     title: "aaaaa",
  //     category: "School",
  //     verified: true,
  //   },
  //   {
  //     id: 2,
  //     title: "aaaaa",
  //     category: "School",
  //     verified: true,
  //   },
  //   {
  //     id: 3,
  //     title: "aaaaa",
  //     category: "School",
  //     verified: true,
  //   },
  // ];

  const showDetails = (id) => {
    dispatch(fetchPub(id));
  };
  return (
    <MainScreen title="Enter a student ID">
      <Form>
        <Form.Group controlId="sid">
          <Form.Control
            type="text"
            value={sid}
            placeholder="Enter a student's unique id"
            onChange={(e) => setSid(e.target.value)}
          />
          <Button onClick={() => showDetails(sid)}>Enter</Button>
        </Form.Group>
      </Form>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {pubList &&
        pubList?.map((item) => (
          <Accordion>
            <Card style={{ margin: 10 }} key={item._id}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {item.title}
                  </Accordion.Toggle>
                </span>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h5>
                    {item.category}: {item.subcategory}
                    <div>Year: {item.year}</div>
                  </h5>
                  <h4>
                    <Badge variant="success">
                      {item.isVerified && "Verified"}
                    </Badge>
                  </h4>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default PublicScreen;
