import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [isLogin, setIsLogin] = useState(true);

const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [search, setSearch] = useState("");
const [status, setStatus] = useState("Upcoming");

const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
});

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);
useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

}, []);

  // Create Event
const createEvent = async () => {
  try {

   await axios.post(
  "/api/events",
  {
    title,
    description,
    location,
    date,
    category,
    status,
    image,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

    // Clear form
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setCategory("");
    setStatus("Upcoming");
    setImage("");

    // Refresh events
    fetchEvents();
    toast.success("Event Added Successfully!");

  } catch (error) {
    console.log(error);
toast.error("Something went wrong!");
  }
};
  const deleteEvent = async (id) => {

  console.log("DELETE CLICKED", id);

  try {

    const response = await axios.delete(
  `/api/events/${id}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

    console.log(response.data);

    fetchEvents();
    toast.success("Event Deleted Successfully!");

  } catch (error) {

    console.log(error);
toast.error("Something went wrong!");

  }
};
const editEvent = (event) => {

  setTitle(event.title);
  setDescription(event.description);
  setLocation(event.location);
  setDate(event.date?.split("T")[0]);
  setCategory(event.category);
  setStatus(event.status);
  setImage(event.image);
  setEditingId(event._id);

  setIsEditing(true);
};
// Update Event
const updateEvent = async () => {
  try {

   await axios.put(
  `/api/events/${editingId}`,
  {
    title,
    description,
    location,
    date,
    category,
    status,
    image,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setCategory("");
    setStatus("Upcoming");
    setImage("");
    setEditingId(null);
    setIsEditing(false);

    fetchEvents();

    toast.success("Event Updated Successfully!");

  } catch (error) {

    console.log(error);

    toast.error("Something went wrong!");

  }
};
const signup = async () => {
  try {

    await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });

    toast.success("Signup Successful!");

    setIsLogin(true);

  } catch (error) {

    console.log(error.response.data.message);

    toast.error("Signup Failed");

  }
};
const login = async () => {
  try {

    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);

    toast.success("Login Successful!");

  } catch (error) {

    console.log(error);

    toast.error("Login Failed");

  }
};
const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  setUser(null);

};
  return (
    <div className={darkMode ? "container dark" : "container"}>
      {!user ? (

<div className="auth-box">

  <h1 className="heading">
    Planora 🚀
  </h1>

  {!isLogin && (
    <input
      className="input"
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />
  )}

  <input
    className="input"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <input
    className="input"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <button
    className="button"
    onClick={() => {
      if (isLogin) {

  console.log("LOGIN CLICKED");

  login();

} else {

  console.log("SIGNUP CLICKED");

  signup();

}
    }}
  >
    {isLogin ? "Login" : "Signup"}
  </button>

  <p
    className="switch-text"
    onClick={() =>
      setIsLogin(!isLogin)
    }
  >
    {isLogin
      ? "Don't have an account? Signup"
      : "Already have an account? Login"}
  </p>

</div>

) : (
  <>
      
      <h1 className="heading">Planora 🚀</h1>
      <button
  className="mode-btn"
  onClick={logout}
>
  Logout
</button>
      <button
  className="mode-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>

      <h2>Create Event</h2>
      <div className="form">
        <input
  className="input search-box"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <br /><br />

      <input
  className="input search-box"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
  className="input search-box"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
  className="input search-box"
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
<input
  className="input search-box"
  type="text"
  placeholder="Paste Image URL"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>
<select
  className="input search-box"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="Tech">Tech</option>
  <option value="Music">Music</option>
  <option value="Sports">Sports</option>
  <option value="Education">Education</option>
</select>
<select
  className="input search-box"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option>Upcoming</option>
  <option>Ongoing</option>
  <option>Completed</option>
</select>

      <br /><br />

   <button
  className="button"
  onClick={() => {
    if (isEditing && editingId) {
      updateEvent();
    } else {
      createEvent();
    }
  }}
>
  {isEditing ? "Update Event" : "Add Event"}
</button>
      </div>

      <hr />
      <input
  className="input search-box"
  type="text"
  placeholder="Search events..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<div className="stats-container">

  <div className="stat-card">
    <h3>Total Events</h3>
    <p>{events.length}</p>
  </div>

  <div className="stat-card">
    <h3>Upcoming</h3>
    <p>
      {
        events.filter(
          (event) => event.status === "Upcoming"
        ).length
      }
    </p>
  </div>

  <div className="stat-card">
    <h3>Ongoing</h3>
    <p>
      {
        events.filter(
          (event) => event.status === "Ongoing"
        ).length
      }
    </p>
  </div>

  <div className="stat-card">
    <h3>Completed</h3>
    <p>
      {
        events.filter(
          (event) => event.status === "Completed"
        ).length
      }
    </p>
  </div>

</div>
      <h2>All Events</h2>

      {events
  .filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((event) => (
        <div className="event-card" key={event._id}>
          <img
  src={event.image}
  alt={event.title}
  className="event-image"
/>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.date?.split("T")[0]}</p>
          <p>Category: {event.category}</p>
          <div
  className={`status ${(event.status || "upcoming").toLowerCase()}`}
>
  {event.status || "Upcoming"}
</div>
          <button
  className="button"
  onClick={() => editEvent(event)}
>
  Edit
</button>
          <button
  className="delete-btn"
  onClick={() => deleteEvent(event._id)}
>
  Delete
</button>
          <hr />
        </div>
      ))}
      <ToastContainer />
      </>
      )}
    </div>
  );
}

export default App;
