import styles from './Home.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react'

import {useFetchDocuments} from '../../hooks/useFetchDocuments'

import Input from '../../components/form/Input';
import Button from '../../components/layout/Button';
import PostDetail from '../../components/layout/PostDetail';

const Home = () => {

  const navigate = useNavigate()
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts')
  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Recent posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <Input type="text" placeholder='Or search by tags' onChange={(e) => setQuery(e.target.value)} value={query}/>
        <Button text='Search' className='dark'/>
      </form>
      <div>
        <h1>Posts...</h1>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No posts found</p>
            <Link to='/posts/create'><Button text='Create first post' className='dark'/></Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home