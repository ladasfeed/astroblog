import styles from "./PostList.module.css";

const getPosts = () => {
  return fetch("/api/posts");
};

export const PostList = () => {
  return <div></div>;
};
