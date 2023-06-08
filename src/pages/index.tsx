import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full w-full bg-slate-700 items-center justify-center flex-col">
      <h1 className="text-xl text-white pb-3">Você é um(a):</h1>
      <div className="flex gap-x-2">
      <Link href="/patient">
        <button className='h-10 w-52 bg-green-400 hover:bg-green-500 rounded-md'>
          <h1>Paciente</h1>
        </button>
      </Link>
      <Link href="/doctor">
        <button className='h-10 w-52 bg-green-400 hover:bg-green-500 rounded-md'>
          <h1>Enfermeiro(a)</h1>
        </button>
      </Link>
      </div>
    </div>
  )
}