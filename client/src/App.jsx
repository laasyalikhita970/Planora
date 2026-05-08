import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

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

  // Create event
  const createEvent = async () => {
    try {
      await axios.post("/api/events", {
        title,
        description,
        location,
      });

      // clear inputs
      setTitle("");
      setDescription("");
      setLocation("");

      // refresh events
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
  return (
    <div style={{ padding: "20px" }}>
      <h1>Planora 🚀</h1>

      <h2>Create Event</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      <button onClick={createEvent}>
        Add Event
      </button>

      <hr />

      <h2>All Events</h2>

      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <button onClick={() => deleteEvent(event._id)}>
  Delete
</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;