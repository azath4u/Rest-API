import { useEffect, useState } from "react";
import axios from "axios";
import "./delete.css";
import { useLocation, useNavigate } from "react-router-dom";

const API = "https://api.restful-api.dev/objects";
export default function Delete() {
  const [id, setid] = useState("");
  const[items,setitems]=useState(null);
  const [message, setmessage] = useState("");
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    const params=new URLSearchParams(location.search);
    const urlId=params.get("id");
    if(urlId){
      setid(urlId);
    }
    else{
      setmessage("ID not defined");
    }
  },[location.search])

  useEffect(()=>{
    if(!id)return;
    const fetch=async()=>{
      try{
        const response=await axios.get(`${API}/${id}`)
        setitems(response.data);
        setmessage("");
      }
      catch(err){
        setitems(null);
        setmessage("Datas not found");
      }
    };fetch()
  },[id])
  const handledelete = async () => {
    if (!id) {
      setmessage("Please enter ID to delete");
      return;
    }
    try {
      await axios.delete(`${API}/${id}`);
      setmessage(`Deleted Successfully!Object id:"${id}`);
      setitems(null);
      setTimeout(() => navigate("/allobjects"), 3000);
    } catch (err) {
      if (err.response && err.response.status === 405) {
        setmessage(" This ID cannot be deleted (read-only example).");
      } else if (err.response && err.response.status === 404) {
        setmessage("No object found with this ID.");
      } else {
        setmessage(" Failed to delete: " + err.message);
      }
    }
  };
  return (
    <div className="deleteprd">
      <h3>Delete the Product</h3>
      <div className="input-group">
        <input
          type="text"
          placeholder="Please Enter ID to Delete"
          value={id}
          onChange={(e) => setid(e.target.value)}
        /></div>
      {items&&items.data&&(
        <div className="deletedetails">
       <h3>{items.name}</h3>
            <ul>
            
             {Object.entries(items.data).map(([key,value])=>(
              <li key={key}>{key}:{value}</li>
             ))}        
            </ul>
          
        
        
        </div>
      )}
      
      <button onClick={handledelete}>Delete</button>
      <p style={{ color: message.includes("Deleted") ? "green" : "red" }}>{message}</p>
    </div>
  );
}
