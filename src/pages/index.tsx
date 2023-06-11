import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full w-full items-center justify-center flex-col">
      <h1 className="text-xl text-blue-950 pb-3">Você é um(a):</h1>
      <div className="flex gap-x-2">
      <Link href="/patient?name=Christian">
        <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
          <h1>Paciente</h1>
        </button>
      </Link>
      <Link href="/healthCenter?name=Pinheirinho">
        <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
          <h1>Enfermeiro(a)</h1>
        </button>
      </Link>
      </div>
    </div>
  )
}