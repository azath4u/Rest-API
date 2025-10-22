import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API = "https://api.restful-api.dev/objects";

export default function Details() {
  const { search } = useLocation();
  const [items, setitems] = useState([]);
  const [err, seterror] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const idscsv = params.get("ids") || "";
    // if (Array.isArray(idscsv)) idscsv = idscsv.join(",");
    const ids = idscsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      //setitems([]);
      return;
    }
    setitems([]);

    Promise.all(ids.map((id) => axios.get(`${API}/${encodeURIComponent(id)}`)))
      .then((responses) => {
        const fetcheddata = responses.map((res) => res.data);
        setitems(fetcheddata);
      })
      .catch((error) => {
        seterror(error);
      });
  }, [search]);
  return (
    <div className="allobjects">
      <h1>Items from the server</h1>
      {err && <p>{err.message}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Name: {item.name}
            <br />
            {(item.data?.color || item.data?.Color) && (
              <>
                Colour: {item.data.color || item.data.Color}
                <br />
              </>
            )}
            {(item.data?.Generation || item.data?.generation) && (
              <>
                Generation: {item.data.Generation || item.data.generation}
                <br />
              </>
            )}
            {(item.data?.price || item.data?.price) && (
              <>
                Price: {item.data.price || item.data.Price}
                <br />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
