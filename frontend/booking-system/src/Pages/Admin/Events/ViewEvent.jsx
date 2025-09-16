import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../APIs/EventAPI";
import Card from "../../../components/Card/Card";

function ViewEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card type="event" data={event} />
    </div>
  );
}

export default ViewEvent;
