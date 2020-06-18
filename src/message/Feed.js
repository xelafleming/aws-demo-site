import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify";

function Feed() {
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isPosting, setPosting] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [postBeingEdited, setPostBeingEdited] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [isUpdating, setUpdating] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    Auth.currentSession().then(res => res.getAccessToken().getJwtToken()).then(
        token => {
          fetch("https://api.roorise.dev/v1/posts", {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          }).then(res =>
              res.json().then(data => setPosts(data.sort((a, b) =>
                  new Date(b.createdTimestamp) - new Date(a.createdTimestamp)
              ))).then(setLoading(false))
          )
        }
    )
  }, [isPosting, isDeleting, isUpdating])
  const handleSubmitPost = (event) => {
    event.preventDefault();
    setPosting(true);
    Auth.currentSession().then(res => res.getAccessToken().getJwtToken()).then(
        token => {
          fetch("https://api.roorise.dev/v1/post", {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"message": message})
          }).then(() => {
            setPosting(false)
            setMessage("")
          })
        }
    );
  }
  const handleDelete = (event, id) => {
    event.preventDefault();
    setDeleting(true)
    Auth.currentSession().then(res => res.getAccessToken().getJwtToken()).then(
        token => {
          fetch("https://api.roorise.dev/v1/post", {
            method: 'DELETE',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"messageId": id})
          }).then(() => {
            setDeleting(false)
          })
        }
    );
  }

  const handleEdit = (event, post) => {
    event.preventDefault();
    post.message = editedMessage;
    setUpdating(true);
    Auth.currentSession().then(res => res.getAccessToken().getJwtToken()).then(
        token => {
          fetch("https://api.roorise.dev/v1/post", {
            method: 'PUT',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          }).then(() => {
            setUpdating(false);
            setPostBeingEdited("");
          })
        }
    );
  }

  return (
      <div className="row">
        <div className="card mx-auto w-50 mt-2">
          <div className="card-body">
            <form className="p-2">
              <div className="form-group row">
                <label htmlFor="message">Take a note!</label>
                <textarea value={message}
                          onChange={e => setMessage(e.target.value)}
                          id="message"
                          className="form-control" rows="3"/>
              </div>
              <div className="row">
                <button className="btn btn-primary"
                        onClick={handleSubmitPost}>Post!
                </button>
                {isPosting && <i className="fa fa-spinner fa-spin"/>}
              </div>
            </form>
          </div>
          {isLoading &&
          <div className="card m-1">
            <div className="card-body">
              <i className="fa fa-spinner fa-spin"/>
            </div>
          </div>
          }
          {posts.map(post =>
              <div key={post.messageId} className="card m-1">
                <div className="card-body ml-1">
                  {post.messageId === postBeingEdited &&
                  <form>
                    <div className="form-group row">
                        <textarea value={editedMessage}
                                  onChange={e => setEditedMessage(
                                      e.target.value)} id="message"
                                  className="form-control" rows="3"/>
                    </div>
                  </form>
                  }
                  <div className="btn-group float-right">
                    {post.messageId !== postBeingEdited &&
                    <>
                      <button type="submit" className="btn btn-primary"
                              onClick={e => {
                                e.preventDefault();
                                setPostBeingEdited(post.messageId);
                                setEditedMessage(post.message);
                              }}><i
                          className="fa fa-pencil"/></button>
                      <button type="submit"
                              onClick={e => handleDelete(e, post.messageId)}
                              className="btn btn-danger"><i
                          className="fa fa-trash"/></button>
                    </>
                    }
                    {post.messageId === postBeingEdited &&
                    <>
                      <button type="submit" onClick={e => handleEdit(e, post)}
                              className="btn btn-primary"><i
                          className="fa fa-check"/></button>
                      <button type="submit"
                              onClick={e => {e.preventDefault(); setPostBeingEdited("")}}
                              className="btn btn-danger"><i
                          className="fa fa-times"/></button>
                    </>
                    }
                  </div>
                  {post.messageId !== postBeingEdited &&
                  <p>{post.message}</p>
                  }
                  <small>Created: {post.createdTimestamp} Last
                    Updated: {post.updatedTimestamp}</small>
                </div>
              </div>)}
        </div>
      </div>
  )
}

export default Feed;