import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts, addPost, deletePost } from '../features/postSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.post);

  //  fetch All post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/posts/profile', {
          headers: { Authorization: token },
        });
        dispatch(setPosts(response.data));
      } catch (error) {
        console.error('Fetch Posts Error:', error);
      }
    };
    fetchPosts();
  }, [dispatch, token]);

  // add new post
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/posts/post', { content ,title }, {
        headers: { Authorization: token },
      });
      dispatch(addPost(response.data));
      setContent('');
      setTitle('')
    } catch (error) {
      console.error('Post Error:', error);
    }
  };

  // delete post 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/posts/post/${id}`, {
        headers: { Authorization: token },
      });
      dispatch(deletePost(id));
    } catch (error) {
      console.error('Delete Post Error:', error);
    }
  };

  // handle logout 
  const handleLogout = () => {  
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mb-4">Log Out</button>
      <form onSubmit={handlePost} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="What's on your mind?"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-2">Post</button>
      </form>
      <div className="w-full max-w-md">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className=' font-semibold text-lg'>{post.title}</h2>
            <p>{post.content}</p>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white p-2 rounded mt-2 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
