import Schedules from "@/components/SchedulesCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full w-full items-center text-left justify-center flex-col">
      <h2 className="mb-5 text-3xl font-semibold text-gray-800">Próximos agendamentos</h2>
      <Schedules />
      <Link href="/patient/newSchedule">
        <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
          <h1>Agendar consulta</h1>
        </button>
      </Link>
    </div>
  )
}
