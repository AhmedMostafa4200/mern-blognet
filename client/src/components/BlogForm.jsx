import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { postNewBlog } from "../actions/BlogAction";

import "./BlogForm.css";

const BlogForm = (props) => {
  const [owner, setOwner] = useState({});

  useEffect(() => {
    setOwner(props.auth.item._id);
  }, [props.auth.item._id]);

  const [state, setState] = useState(
    {
      title: "",
      // props.match.params.blogId !== "addblog"
      //   ? props.blogToPostOrEdit.title
      //   : "",
      tags: "",
      // props.match.params.blogId !== "addblog"
      //   ? props.blogToPostOrEdit.tags
      //   : "",
      body: "",
      // props.match.params.blogId !== "addblog"
      //   ? props.blogToPostOrEdit.body
      //   : "",
      image: "",
    },
    []
  );
  let { title, tags, body, image } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setState({ ...state, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postNewBlog({ title, tags, body, image, owner });
    props.history.push("/explore");
  };
  const handleCanceling = () => {
    props.history.push("/explore");
  };

  return (
    <React.Fragment>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              required
              maxLength="50"
              className="blog-input form-control"
              id="inputTitle"
              autoFocus
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputTag">Tags</label>
            <input
              type="text"
              required
              maxLength="30"
              className="blog-input form-control"
              id="inputTag"
              name="tags"
              value={tags}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputBody">Body</label>
          <textarea
            rows="8"
            required
            maxLength="300"
            className="blog-input form-control"
            id="inputBody"
            placeholder="Max length 300 characters"
            name="body"
            value={body}
            onChange={handleChange}
          />
        </div>
        <div className="upload-post form-row">
          <div className="col-md-4">
            <div>
              <div className="form-group pb-2">
                <h5>Blog Image</h5>
                <hr />
                <small className="text-muted">{image?.name}</small>
                <br></br>

                <small className="text-muted">Max size: 5mb</small>
                <br />
                <label className="btn btn-outline-info">
                  Upload Blog Image
                  <input
                    type="file"
                    required
                    className="form-control"
                    accept="image/*"
                    hidden
                    id="blog-image"
                    onChange={handleImageChange}
                  />
                </label>
                <img src="" alt="" id="myimage" className="" />
              </div>
            </div>
          </div>
          <div className="form-btns">
            <button type="submit" className="btn btn-primary mr-1">
              Post
            </button>
            {/* {props.match.params.blogId === "addblog" && (
              <button type="submit" className="btn btn-primary mr-1">
                Post
              </button>
            )}
            {props.match.params.blogId !== "addblog" && (
              <button type="submit" className="btn btn-primary mr-1">
                Update
              </button>
            )} */}
            <button className="btn btn-primary" onClick={handleCanceling}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    blogToPostOrEdit: state.blogs.item,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    postNewBlog,
  })(BlogForm)
);
