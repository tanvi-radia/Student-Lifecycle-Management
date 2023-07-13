import React from "react";
import { useEffect } from "react";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers } from "../../actions/adminActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const AdminLanding = ({ history, search }) => {
  const dispatch = useDispatch();

  // const pendingUsers = [
  //   {
  //     id: 1,
  //     name: "abc",
  //     unverified: 0,
  //   },
  //   {
  //     id: 2,
  //     name: "bcd",
  //     unverified: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "cde",
  //     unverified: 0,
  //   },
  // ];
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, pendingUsers, error } = userList;

  useEffect(() => {
    dispatch(listUsers());
    // if (!userInfo) {
    //   history.push("/");
    // }
  }, [
    dispatch,
    history,
    // userInfo
  ]);

  return (
    <MainScreen title="Welcome back Admin">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* {console.log(loading)} */}
      <ListGroup>
        {pendingUsers?.map((stud) => (
          <Link to={`/adm/${stud.s_id}`} key={stud.s_id}>
            <ListGroupItem>
              <span>{stud.name}</span>
              <div>
                <Badge variant="dark">Unverified: {stud.noUnvAch}</Badge>
              </div>
            </ListGroupItem>
          </Link>
        ))}
      </ListGroup>
    </MainScreen>
  );
};

export default AdminLanding;
