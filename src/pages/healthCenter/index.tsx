import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { name } = router.query;
  const patientName = typeof name === 'string' ? name : '';

  return (
    <div className="flex min-h-full w-full items-center justify-center flex-col">
      <h1 className="text-xl text-blue-950 pb-3">Você é um(a) enfermeiro(a)</h1>
    </div>
  )
}