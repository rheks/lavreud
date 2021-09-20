import React, { useState } from "react";
import AppContainer from "./AppContainer";
import { useHistory } from "react-router";
import api from "../api";

const Add = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onAddSubmit = async () => {
    setLoading(true);
    try {
      await api.addPost({
        title,
        description,
      });
      history.push("/");
    } catch {
      alert("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer title="Add Data">
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onAddSubmit}
            disabled={loading}
            className="btn btn-success"
          >
            {loading ? "Loading..." : "Add Post"}
          </button>
        </div>
      </form>
    </AppContainer>
  );
};

export default Add;
