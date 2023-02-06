import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import Button from "../../components/layout/Button";
import Loader from "../../components/layout/Loader";


const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const {deleteDocument} = useDeleteDocument('posts')

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {loading && <Loader />}
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>No posts found</p>
          <Link to="/posts/create">
            <Button text="Create first post"/>
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Title</span>
          <span>Actions</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`}>
              <Button text="See" className="outline" />
              </Link>
              <Link to={`/posts/edit/${post.id}`}>
              <Button text="Edit" className="outline" />
              </Link>
              <Button
                  deleteDocument={() => deleteDocument(post.id)}
                  className="danger"
                  text="Delete"
                />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
