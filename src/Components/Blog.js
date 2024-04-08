//Blogging App with Firebase
import { useState, useRef, useEffect } from "react";

//Import fireStore reference from frebaseInit file
import { db } from "../firebase-init";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";

export default function Blog() {
  const [formData, setformData] = useState({ title: "", content: "", _id: "" });
  const [blogs, setBlogs] = useState([]);
  const [docs, setDocs] = useState([]);

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Blogs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blog = [];
        const docmt = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc);
            docmt.push(doc);
            blog.push(doc.data());
        });
        setBlogs(blog);
        setDocs(docmt);
      });
      
  }, []);


  async function removeBlog(id){

    setDocs( docs.filter((doc)=> doc.id !== id));

    /*********************************************************************** */
    /** Deleting a document from the Firestore */ 
    /*********************************************************************** */
    await deleteDoc(doc(db, "Blogs", id));
    /*********************************************************************** */
 }


  async function handleSubmit(e) {
    e.preventDefault();
    titleRef.current.focus();

    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    // Add a new document with a generated _id.
    const date=new Date();
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: formData.title,
      content: formData.content,
      _id: date
    });
    console.log("Document written with ID: ", docRef._id);
    setBlogs([{ title: formData.title, content: formData.content, _id: date }, ...blogs]);
    
    setformData({ title: "", content: "", _id: "" });
  }


  return (
    <>
      <h1>Write your thought!</h1>
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          <Row label="Name">
            <input
              className="input"
              placeholder="Enter your name here.."
              ref={titleRef}
              value={formData.title}
              onChange={(e) =>
                setformData({
                  title: e.target.value,
                  content: formData.content
                })
              }
            />
          </Row>

          <Row label="Your Thought">
            <textarea
              className="input content"
              placeholder="your thought goes here.."
              required
              value={formData.content}
              onChange={(e) =>
                setformData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>

          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Thought Of The Day </h2>
      <div className="blog-cont">  
      {docs.map((doc, i) => (
        <div className="blog" key={i}>
          <h3>{doc.data().title}</h3>
          <hr />
          <p>{doc.data().content}</p>

          <div className="blog-btn">
            <button
              onClick={() => {
                console.log(doc.id);
                removeBlog(doc.id);
              }}
              className="btn remove"
            >
              Delete
            </button>
          </div>
        </div>
      ))}      
      </div>
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
