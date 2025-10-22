import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Objectbyid() {
  const [input, setinput] = useState("");
  const navigate = useNavigate();

  /*function handlesearch() {
    if (input.trim() !== "") {
      fetch(`https://api.restful-api.dev/objects/${input}`)
        .then((res) => res.json())
        .then((data) => setitems(Array.isArray(data) ? data : [data]))
        .catch((err) => console.log("Error:", err));
    } else {
      alert("Enter the Valid Id");
      return;
    }
  }*/
  function handlesearch() {
    const ids = input
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (ids.length === 0) {
      alert("Enter the Id");
      return;
    }

    const q = `ids=${encodeURIComponent(ids.join(","))}`;
    navigate(`/details?${q}`);
  }
  return (
    <div className="objectsbyid">
      <h1>Enter the Id</h1>

      <input
        type="text"
        value={input}
        placeholder="e.g. 1, 2, 3"
        onChange={(e) => setinput(e.target.value)}
      />
      <button onClick={() => handlesearch()}>Search</button>
    </div>
  );
}
