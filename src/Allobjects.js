import { useEffect, useState } from "react";
import "./Allobjects.css";
import { useNavigate } from "react-router-dom";
function Allobjects() {
  const [items, setitems] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    fetch("https://api.restful-api.dev/objects")
      .then((res) => res.json())
      .then((data) => setitems(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleEdit=(item)=>{
    navigate(`/updatedetails?id=${item.id}`)
  }
  const handleDelete=(item)=>{
    navigate(`/delete?id=${item.id}`)
  }
  return (
    <div className="allobjects">
      <h1>Items from the server</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Name: {item.name}
            <br />
            {item.data?.color && (
              <>
                Colour: {item.data.color}
                <br />
              </>
            )}
            {item.data?.generation && (
              <>
                Generation: {item.data.generation}
                <br />
              </>
            )}
            {item.data?.price && (
              <>
                Price: {item.data.price}
                <br />
              </>
            )}
            <div className="objbtn">            
            <button onClick={()=>handleEdit(item)}>Edit</button>
            <button onClick={()=>handleDelete(item)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Allobjects;
