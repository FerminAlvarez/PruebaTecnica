"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [points, setPoints] = useState(undefined);
  const [scooters, setScooters] = useState(undefined);

  async function getPoints() {
    const res = await fetch("http://localhost:3001/points");

    setPoints(await res.json());

    if (!res.ok) {
      throw new Error("Failed to fetch points");
    }
  }

  async function getScooters(event) {
    const id = event.target.value;

    const res = await fetch(`http://localhost:3001/points/${id}/scooters`);

    let data;
    if (res.ok) {
      data = await res.json();
    }

    setScooters(data);
  }

  useEffect(() => {
    getPoints();
    getScooters({ target: { value: 1 } });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="font-bold text-2xl">Alquiler de monopatines</h1>

      {points && (
        <>
          <label>Puntos de retiro:</label>
          <select onChange={(event) => getScooters(event)}>
            {points.map((point) => (
              <option key={point.id} value={point.point_id}>
                {point.location}
              </option>
            ))}
          </select>
        </>
      )}

      {scooters && (
        <>
          <label>Monopatines disponibles:</label>
          <select>
            {scooters.map((scooter) => (
              <option key={scooter.id}>{scooter.scooter_id}</option>
            ))}
          </select>
        </>
      )}
    </main>
  );
}
