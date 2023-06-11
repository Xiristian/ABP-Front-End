import Schedules from "@/components/SchedulesCard";

export default function Home() {
  return (
    <div className="flex min-h-full w-full items-center text-left justify-center flex-col">
      <h2 className="mb-5 text-3xl font-semibold text-gray-800">Próximos agendamentos</h2>
      <Schedules />
    </div>
  )
}
