import { Routes, Route, Link } from "react-router-dom";
import Allobjects from "./Allobjects.js";
import Objectbyid from "./Objectbyid.js";
import Details from "./Details.js";
import Updatedetails from "./Updatedetails.js";
import Addproduct from "./Addproduct.js";
import Delete from "./Delete.js";
import "./App.css";
function App() {
  return (
    <div className="homepage">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/allobjects">All Objects</Link>
        <Link to="/objectbyid">Object by Id</Link>
        <Link to="/updatedetails">Updatedetails</Link>
        <Link to="addnew">Add product</Link>
        <Link to="delete">Delete</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allobjects" element={<Allobjects />} />
        <Route path="/objectbyid" element={<Objectbyid />} />
        <Route path="/details" element={<Details />} />
        <Route path="/updatedetails" element={<Updatedetails />} />
        <Route path="/addnew" element={<Addproduct />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </div>
  );
}
function Home() {
  return (
    <div style={{ marginTop: "50px" }}>
      <h2>Welcome to List from server</h2>
      <p>Select an option above to get started:</p>
    </div>
  );
}

export default App;
