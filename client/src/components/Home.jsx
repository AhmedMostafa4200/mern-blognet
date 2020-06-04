import React, { useEffect } from "react";
import { connect } from "react-redux";

import BlogItem from "./BlogItem";

import { gethHomeBlogs } from "../actions/BlogAction";

const Home = (props) => {
  useEffect(() => {
    props.gethHomeBlogs();
  }, []);
  return (
    <React.Fragment>
      <BlogItem blogs={props.homeBlogs}></BlogItem>

      {props.homeBlogs.length === 0 && (
        <div
          className="text-white font-weight-bold font-italic pt-5"
          style={{ textAlign: "center", fontSize: "25px" }}
        >
          You have not followed or created any blog!
        </div>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    homeBlogs: state.blogs.items,
  };
}
export default connect(mapStateToProps, { gethHomeBlogs })(Home);
