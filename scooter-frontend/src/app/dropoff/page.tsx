"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [points, setPoints] = useState(undefined);
  const [selectedPoint, setSelectedPoint] = useState(undefined);
  const [rent, setRent] = useState(undefined);
  const [dni, setDni] = useState(undefined);
  const router = useRouter();

  async function getPoints() {
    const res = await fetch("http://localhost:3001/points");

    setPoints(await res.json());

    if (!res.ok) {
      throw new Error("Failed to fetch points");
    }
  }

  async function getActiveRent() {
    const res = await fetch(`http://localhost:3001/rents/active/${dni}`);

    let data;
    if (res.ok) {
      data = await res.json();
    }

    setRent(data);
  }

  async function updateRent() {
    const res = await fetch(`http://localhost:3001/rents`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Rent_ID: rent.rent_id, Point_ID: selectedPoint }),
    });

    let data = await res.json();

    console.log(data);

    alert(data.message);
  }

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="font-bold text-2xl">Entrega de monopatines</h1>

      <div className="grid grid-flow-row grid-cols-2 justify-items-center w-2/3">
        <div className="w-5/6 text-center">
          <label>Ingrese su DNI</label>
          <input
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="number"
            onChange={(event) => setDni(event.target.value)}
          />
        </div>

        {points && (
          <div className="w-5/6 text-center">
            <label>Selecciona el punto de entrega</label>
            <select
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onChange={(event) => setSelectedPoint(event.target.value)}
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

        {dni && points && (
          <div className="w-5/6 my-5 text-center">
            <button
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onClick={() => getActiveRent()}
            >
              Previsualizar
            </button>
          </div>
        )}

        {dni && points && rent && (
          <div className="w-5/6 text-center">
            <h2>Monopatin alquilado</h2>
            <p>
              ID: {rent.scooter_id} - Fecha y hora de alquiler:{" "}
              {rent.start_date_time}
            </p>
            <button
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onClick={() => updateRent()}
            >
              Entregar
            </button>
          </div>
        )}
      </div>

      <Link
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-12"
        href="/"
      >
        Home
      </Link>
    </main>
  );
}
