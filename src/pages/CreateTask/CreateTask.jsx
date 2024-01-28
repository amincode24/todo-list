import { useState } from "react";
import classes from "./CreateTask.module.css";
import { MdSaveAs } from "react-icons/md";
import Container from "../../components/UI/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function CreateTask() {
  const [title, setTitle] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const titleInputChangeHandler = (event) => {
    setTitle(event.target.value);
    setFormIsValid(event.target.value.trim().length > 3);
  };

  const titleInputBlurHandler = (event) => {
    setFormIsValid(event.target.value.trim().length > 3);
  };

  const createTodo = async () => {
    try {
      const data = {
        title: title,
      };
      console.log(data);
      const BASE_URL = "http://localhost:1337";
      const response = await axios.post(`${BASE_URL}/api/todolists`, {
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!title) {
      window.alert("Please Write Something!");
    }

    createTodo();
    if (title) {
      navigate("/");
    }
  };
  return (
    <Container className={classes.container}>
      <header className={classes.header}>
        <Link to="/" className={classes["back-to-home-link"]}>
          <span className={classes["link-arrow"]}>←</span>Back To Home Page
        </Link>
        <h2 className={classes.heading}>Create Task</h2>
      </header>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <input
            type="text"
            value={title}
            onChange={titleInputChangeHandler}
            onBlur={titleInputBlurHandler}
            placeholder="Title"
            autoFocus
          />
          <button
            type="submit"
            className={classes.button}
            disabled={!formIsValid}
          >
            Save
            <i>
              <MdSaveAs />
            </i>
          </button>
        </div>
      </form>
    </Container>
  );
}

export default CreateTask;
