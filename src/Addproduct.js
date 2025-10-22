import {  useState } from "react";
import axios from "axios";
import "./addprd.css";
export default function Addproduct() {
  const [name, setname] = useState("");
  const [color, setcolor] = useState("");
  const [price, setprice] = useState("");
  const [message, setmessage] = useState("");

  const adddetails = async() => {
    if (!name || !color || !price) {
      setmessage("Please fill all fileds");
      return;
    }
try
{
  const res=await fetch("https://api.restful-api.dev/objects");
    const data1=await res.json();

    const duplicate=data1.find((item)=>item.name?.trim().toLowerCase() === name.trim().toLowerCase() )
          
 if (duplicate) {
        setmessage("Product already exists!");
        return;
      }


    axios
      .post("https://api.restful-api.dev/objects", {
        name: name,
        data: { color: color, price: price },
      })
      .then((resp) => {
        setmessage(`Product added successfully with id:${resp.data.id}`);
      })
      }
      catch(error){
        setmessage("Failed to add product:" + error);
      } 
  };

  return (
    <div className="addprd">
      <h3>Add Products Details</h3>
      <div className="addprdctn">
        <div className="input-group">
          <label>Name</label>
          <input type="text" onChange={(e) => setname(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Colour</label>
          <input type="text" onChange={(e) => setcolor(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Price</label>
          <input type="text" onChange={(e) => setprice(e.target.value)} />
        </div>
        <div className="btn">
        <button onClick={adddetails}>ADD</button>
        
      </div>
      <p>{message}</p></div>
    </div>
  );
}
