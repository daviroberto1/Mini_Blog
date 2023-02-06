import styles from "./EditPost.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import Textarea from "../../components/form/Textarea";
import Input from "../../components/form/Input";

import Submit from "../../components/form/Submit";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
    });

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(id,data)

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit Post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
          <Input type='text' spanText="Title:" name='title' placeholder="Create your title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            <Input type='text' spanText="Image URL:" name='image' placeholder="Insert an image"
            onChange={(e)=>setImage(e.target.value)}
            value={image}
            />
            <p className={styles.preview_title}>preview da imagem</p>
            <img className={styles.image_preview} src={post.image} alt={post.title}/>
            <Textarea name="body" spanText="Content:" placeholder='Enter post content' onChange={(e) => setBody(e.target.value)} value={body}/>
            <Input type='text' name='tags' spanText="Tags" placeholder="Enter tags separated by comma"
            onChange={(e)=> setTags(e.target.value)}
            value={tags}
            />
            {!response.loading && <Submit value="Edit" />}
        {response.loading && <Submit value="Wait..." disabled />}

  {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;