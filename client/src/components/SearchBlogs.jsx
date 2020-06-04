import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import BlogItem from "./BlogItem";

const SearchBlogs = (props) => {
  return (
    <React.Fragment>
      <BlogItem blogs={props.searchBlogs}></BlogItem>
      {props.searchBlogs.length === 0 && (
        <div
          className="text-white font-weight-bold font-italic pt-5"
          style={{ textAlign: "center", fontSize: "25px" }}
        >
          No matched blogs
        </div>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    searchBlogs: state.blogs.items,
  };
}
export default withRouter(connect(mapStateToProps, {})(SearchBlogs));
