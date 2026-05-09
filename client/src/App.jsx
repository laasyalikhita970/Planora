import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [search, setSearch] = useState("");
const [darkMode, setDarkMode] = useState(false);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create Event
const createEvent = async () => {
  try {

    await axios.post("/api/events", {
      title,
      description,
      location,
      date,
    });

    // Clear form
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");

    // Refresh events
    fetchEvents();

  } catch (error) {
    console.log(error);
  }
};
  const deleteEvent = async (id) => {

  console.log("DELETE CLICKED", id);

  try {

    const response = await axios.delete(`/api/events/${id}`);

    console.log(response.data);

    fetchEvents();

  } catch (error) {

    console.log(error);

  }
};
const editEvent = (event) => {
  setTitle(event.title);
  setDescription(event.description);
  setLocation(event.location);
setDate(event.date?.split("T")[0]);
  setEditingId(event._id);

  setIsEditing(true);
};
// Update Event
const updateEvent = async () => {
  try {

    await axios.put(`/api/events/${editingId}`, {
      title,
      description,
      location,
      date,
    });

    // Clear form
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");

    setEditingId(null);
    setIsEditing(false);

    // Refresh events
    fetchEvents();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1 className="heading">Planora 🚀</h1>
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

      <br /><br />

    <button
  className="button"
  onClick={() => {
    if (isEditing) {
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
      <h2>All Events</h2>

      {events
  .filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((event) => (
        <div className="event-card" key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.date?.split("T")[0]}</p>
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
    </div>
  );
}

export default App;