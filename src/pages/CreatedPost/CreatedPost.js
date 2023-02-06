import styles from './CreatedPost.module.css'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useInsertDocument} from '../../hooks/useInsertDocument'

import Input from '../../components/form/Input'
import Submit from '../../components/form/Submit'
import Textarea from '../../components/form/Textarea'

const CreatedPost = () => {
  const [title,setTitle] = useState("")
  const [image,setImage] = useState("")
  const [body,setBody] = useState("")
  const [tags,setTags] = useState([])
  const [formError, setFormError] = useState("")
  
  const {user} = useAuthValue()

  const navigate = useNavigate();
  
  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };
  return (
    <div className={styles.create_post}>
          <h2>Create a post</h2>
          <form onSubmit={handleSubmit}>
            <Input type='text' spanText="Title:" name='title' placeholder="Create your title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            <Input type='text' spanText="Image URL:" name='image' placeholder="Insert an image"
            onChange={(e)=>setImage(e.target.value)}
            value={image}
            />
            <Textarea name="body" spanText="Content:" placeholder='Enter post content' onChange={(e) => setBody(e.target.value)} value={body}/>
            <Input type='text' name='tags' spanText="Tags" placeholder="Enter tags separated by comma"
            onChange={(e)=> setTags(e.target.value)}
            value={tags}
            />

            {!response.loading && <Submit value="Create" />}
        {response.loading && <Submit value="Wait..." disabled />}

  {formError && <p className='error'>{formError}</p>}
          </form>
        
    </div>
  )
}

export default CreatedPost