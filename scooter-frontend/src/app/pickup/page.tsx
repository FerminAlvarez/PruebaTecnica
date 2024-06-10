"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [points, setPoints] = useState(undefined);
  const [scooters, setScooters] = useState(undefined);
  const [selectedScooter, setSelectedScooter] = useState(undefined);
  const [dni, setDni] = useState(undefined);
  const router = useRouter();

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

  async function rent() {
    const res = await fetch(`http://localhost:3001/rents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ DNI: dni, Scooter_ID: selectedScooter }),
    });

    let data = await res.json();

    alert(data.message);
  }

  useEffect(() => {
    getPoints();
    getScooters({ target: { value: 1 } });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-2xl">Alquiler de monopatines</h1>

      <form className="grid grid-flow-row grid-cols-2 justify-items-center w-2/3">
        {points && (
          <div className="w-5/6 text-center">
            <label>Selecciona el punto</label>
            <select
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onChange={(event) => getScooters(event)}
              disabled={!points}
            >
              {!points && (
                <option>No hay puntos de retiro disponibles actualmente</option>
              )}

              {points.map((point) => (
                <option key={point.id} value={point.point_id}>
                  {point.location}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="w-5/6 text-center">
          <label>Monopatines disponibles</label>
          <select
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            disabled={!scooters}
            onChange={(event) => setSelectedScooter(event.target.value)}
          >
            {!scooters && <option>No hay monopatines disponibles</option>}

            {!selectedScooter && <option>Seleccione un punto de retiro</option>}

            {scooters &&
              scooters.map((scooter) => (
                <option key={scooter.id}>{scooter.scooter_id}</option>
              ))}
          </select>
        </div>

        <div className="w-5/6 text-center">
          <label>Ingrese su DNI</label>
          <input
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="number"
            disabled={!scooters}
            onChange={(event) => setDni(event.target.value)}
          />
        </div>

        {dni && selectedScooter && (
          <button
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onClick={() => rent()}
          >
            Alquilar
          </button>
        )}
      </form>

      <button
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-12"
        onClick={() => router.back()}
      >
        Back
      </button>
    </main>
  );
}
