import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import BlogOwner from "./BlogOwner";

import { deleteASpecificBlog } from "../actions/BlogAction";

import { getImageUrl } from "../utils/utils";

import "./BlogItem.css";

const BlogItem = (props) => {
  let blogs = props.blogs;

  // const handleUpdatingBlog = (blogId) => {
  //   props.history.push(`/blogform/${blogId}`);
  // };

  const handleDeletingBlog = (blogId) => {
    props.deleteASpecificBlog(blogId);
    delete blogs[props.blogs.findIndex((blog) => blog?._id == blogId)];
  };

  if (blogs) {
    return (
      <React.Fragment>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="blog-card card text-white mt-1 border-success"
                style={{ backgroundColor: "#011528" }}
              >
                <div className="row no-gutters">
                  <div className="col-md-4" style={{ overflow: "hidden" }}>
                    <img
                      className="card-img"
                      src={
                        blog.image
                          ? getImageUrl(blog.image.data)
                          : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
                      }
                      alt=""
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title my-card-title">{blog.title}</h4>
                      <p className="card-text">{blog.body}</p>
                      <h6 className="my-card-tags">{blog.tags}</h6>

                      <BlogOwner id={blog.owner} time={blog.date}></BlogOwner>
                      {props.auth.item._id === blog.owner && (
                        <div className="card-button">
                          {/* <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => handleUpdatingBlog(blog._id)}
                          >
                            Edit
                          </button> */}
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => handleDeletingBlog(blog._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
  return <h1>loading</h1>;
};

function mapStateToProps(state) {
  return {
    anyUser: state.anyUser.item,
    auth: state.auth,
    blogToEditOrDelete: state.blogs.item,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    deleteASpecificBlog,
  })(BlogItem)
);
