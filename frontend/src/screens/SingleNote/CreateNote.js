import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [file, setFile] = useState({});
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  // console.log(note);

  const resetHandler = () => {
    setTitle("");
    setYear("");
    setCategory("");
    setSubCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, year, category, subCategory));
    if (!title || !category || !subCategory) return;

    resetHandler();
    history.push("/mynotes");
  };

  useEffect(() => {}, []);
  return (
    <MainScreen title="My Achievements">
      <Card.Header>Achievements and Accomplishments</Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              value={title}
              placeholder="Enter achievement title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="year"
              value={year}
              placeholder="Enter achievement year"
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSelect">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => {
                // console.log("e.target.value", e.target.value);
                setCategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              <option value="School">School</option>
              <option value="College">College</option>
            </Form.Control>
          </Form.Group>

          {category == "School" ? (
            <Form.Group controlId="subCategory">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                as="select"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>Select a SubCategory</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
              </Form.Control>
            </Form.Group>
          ) : (
            <Form.Group controlId="subCategory">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                as="select"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>Select a SubCategory</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Internships">Internship</option>
                <option value="Club">Club</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload your certificate</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted">
        Creating on - {new Date().toLocaleDateString()}
      </Card.Footer>
    </MainScreen>
  );
}

export default CreateNote;
