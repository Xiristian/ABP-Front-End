import Schedules from "@/components/SchedulesCard";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function Home() {

  return (
    <div className="flex min-h-full w-full items-center text-left justify-center flex-col">
      <div className="flex flex-row">
        <BackButton customClass="h-10 mr-8 -ml-8"></BackButton>
        <h2 className="mb-5 text-3xl font-semibold text-gray-800">Próximos agendamentos</h2>
      </div>
      <Schedules/>
      <Link href={`/patient/newSchedule`}>
        <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
          <h1>Agendar consulta</h1>
        </button>
      </Link>
    </div>
  )
}
