import { UserLogged, deleteUserLogged, postUserLogged } from "@/actions/userLogged";
import Link from "next/link";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

export default function Home() {
  const loginPatient = () => {
    const user = { name: 'Christian', type: 'patient' } as UserLogged;
    mutationPost.mutate(user);
  }

  const loginHealthCenter = () => {
    const user = { name: 'Pinheirinho', type: 'healthCenter' } as UserLogged;
    mutationPost.mutate(user);
  }

  const queryClient = useQueryClient();

  const mutationPost = useMutation(
    (newUserLogged: UserLogged) => postUserLogged(newUserLogged),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userLogged");
      },
    }
  );

  useEffect(() => {
    mutationDelete.mutate();
  }, []);

  const mutationDelete = useMutation(
    () => deleteUserLogged(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userLogged");
      },
    }
  );

  return (
    <div className="flex min-h-full w-full items-center justify-center flex-col">
      <h1 className="text-xl text-blue-950 pb-3">Você é um(a):</h1>
      <div className="flex gap-x-2">
        <Link href="/patient">
          <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white' onClick={loginPatient}>
            <h1>Paciente</h1>
          </button>
        </Link>
        <Link href="/healthCenter">
          <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white' onClick={loginHealthCenter}>
            <h1>Enfermeiro(a)</h1>
          </button>
        </Link>
        <Link href="/register">
          <button className='h-10 w-52 bg-blue-950 hover:bg-blue-800 rounded-md text-white'>
            <h1>Cadastro</h1>
          </button>
        </Link>
      </div>
    </div>
  )
}

