import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-2xl">Bienvenido</h1>
      <Link
        className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-3"
        href="/pickup"
      >
        Reservas
      </Link>
      <Link
        className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-3"
        href="/dropoff"
      >
        Entregas
      </Link>
    </main>
  );
}
