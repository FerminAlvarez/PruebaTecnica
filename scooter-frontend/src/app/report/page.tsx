"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [dni, setDni] = useState("");
  const [start_date, setStart_date] = useState("2018-06-12T19:30");
  const [end_date, setEnd_date] = useState("2022-06-12T19:30");
  const [rents, setRents] = useState(undefined);
  
  async function getData() {
    const converted_start_date = convertDate(start_date);
    const converted_end_date = convertDate(end_date);

    const res = await fetch(`http://localhost:3001/rents/${dni}/dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start_date: converted_start_date, end_date: converted_end_date }),
    });

    let data;
    if(res.ok){
      data = await res.json();

    } 
    setRents(data);
  }

  function convertDate(date) {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-2xl">Reporte de alquileres</h1>

      <div className="grid grid-flow-row grid-cols-1 justify-items-center w-2/3">
        <div className="w-5/6 text-center">
          <label>Ingrese su DNI</label>
          <input
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="number"
            value={dni}
            onChange={(event) => setDni(event.target.value)}
          />
        </div>

        <div className="grid grid-flow-row grid-cols-2 justify-items-center">
          <div className="text-center p-7">
            <label>Fecha de inicio</label>
            <input
              type="datetime-local"
              value={start_date}
              max={end_date}
              onChange={(event) => setStart_date(event.target.value)}
            />
          </div>

          <div className="text-center p-7">
            <label>Fecha de finalización</label>
            <input
              type="datetime-local"
              value={end_date}
              min={start_date}
              onChange={(event) => setEnd_date(event.target.value)}
            />
          </div>
        </div>

        {dni && start_date && end_date && (
          <button
            className="w-5/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-12 my-5"
            onClick={() => getData()}
          >
            Ver reporte
          </button>
        )}

        <div>
          {rents && rents.map((rent) => (
            <ul key={rent.rent_id} className="p-4">
              <li>Rent ID: {rent.rent_id}</li>
              <li>Scooter ID: {rent.scooter_id}</li>
              <li>Duración: {rent.minutes_duration} minutos</li>
            </ul>
          ))}
        </div>
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
