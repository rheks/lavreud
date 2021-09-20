import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api";

const Home = () => {
  const [posts, setPosts] = useState(null);
  let num = 1;

  const fetchPosts = () => {
    api.getAllPosts().then((res) => {
      //   console.log("Text get all posts");
      //   console.log(res);
      const result = res.data;
      setPosts(result.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = () => {
    if (!posts) {
      return (
        <tr>
          <td colSpan="4">Loading Posts...</td>
        </tr>
      );
    }
    if (posts.length === 0) {
      return (
        <tr>
          <td colSpan="4">There is no post yet. add one</td>
        </tr>
      );
    }

    return posts.map((post) => (
      <tr>
        <td>{num++}</td>
        <td>{post.title}</td>
        <td>{post.description}</td>
        <td>
          <Link to={`/edit/${post.id}`} className="btn btn-warning">
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              api
                .deletePost(post.id)
                .then(fetchPosts)
                .catch((err) => {
                  alert("Failed to delete post with id :" + post.id);
                });
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <AppContainer title="Laravel and ReactJs - CRUD">
      <Link to="/add" className="btn btn-primary">
        Add
      </Link>
      <div className="table-responsive">
        <table className="table table-responsive-striped mt-4">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderPosts()}</tbody>
        </table>
      </div>
    </AppContainer>
  );
};

export default Home;

{
  /* <tr>
              <td>1</td>
              <td>Sample Title</td>
              <td>Sample Description</td>
              <td>
                <Link to="/edit/1" className="btn btn-warning">
                  Edit
                </Link>
                <a href="#" className="btn btn-danger">
                  Delete
                </a>
              </td>
            </tr> */
}
