import React, { useEffect, useState } from "react";
import axios from "axios";
import "./update.css";
import { useLocation, useNavigate } from "react-router-dom";
const API = "https://api.restful-api.dev/objects";
export default function Updatedetails() {
  const [id, setid] = useState("");
  const [items, setitems] = useState(null);
  const [error, seterror] = useState("");
  const [message, setmessage] = useState("");
  //const[ids,setids]=useState("");
  const location=useLocation("");
  const navigate=useNavigate();
  useEffect(() => {
    const params=new URLSearchParams(location.search);
    const urlID=params.get("id");
   
    if (!urlID||urlID.length===0) {
      seterror("Enter the ID");
      return;
    }
    else{
       setid(urlID);
       
    }
  },[location.search])
    useEffect(()=>{
      const fetch = async () => {
      try {
        const response = await axios.get(`${API}/${id}`);
        setitems(response.data);
        seterror(null);
      } catch (err) {
        setitems(null);
        seterror("No Datas Found");
      }
    };
    fetch();
    },[id])
    
  
  

  const handleChange = (key, newValue) => {
    setitems((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: newValue },
    }));
  };

  const handleupdate = async () => {
    if (!id || !items) {
      seterror("Enter valid id");
      return;
    }
    try {
      const response = await axios.put(`${API}/${id}`, {
        name: items.name,
        data: items.data,
      });
      setitems(response.data);
      setmessage("Updated successfully");
      seterror("");
      setTimeout(()=>{
        navigate("/allobjects");
      },4000)
    } catch (err) {
      seterror("Failed to update");
      setmessage("");
    }
  };
  return (
    <div className="update-page">
      <h2>Update Details</h2>
      <input
        type="text"
        value={id}
        placeholder="Enter ID(e.g 1)"
        className="id-input"
        onChange={(e) => setid(e.target.value)}
      />
      <p className="error">{error}</p>
      <p className="success">{message}</p>
      {items && (
        <div className="updatedetails">
          {items.data ? (
            <>
              <h3>{items.name}</h3>
              <ul>
                {Object.entries(items.data).map(([key, value]) => (
                  <li key={key}>
                    <label>{key}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={handleupdate}>Update</button>
            </>
          ) : (
            <p>No Data fields</p>
          )}
        </div>
      )}
    </div>
  );
}
