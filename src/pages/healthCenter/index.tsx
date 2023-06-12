import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { name } = router.query;
  const patientName = typeof name === 'string' ? name : '';

  return (
    <div className="flex min-h-full w-full items-center justify-center flex-col">
      <h1 className="text-xl text-blue-950 pb-3">Você é um(a) enfermeiro(a)</h1>
      <Link href="/healthCenter/patientSearch">
        <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
          <h1>Buscar pacientes</h1>
        </button>
      </Link>
    </div>
  )
}