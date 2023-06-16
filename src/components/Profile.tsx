import Link from "next/link";
import React from "react";

export default function Profile() {
    return (
        <div className={'border-blue-950 mt-0.5 border rounded object-contain h-48 w-96 mr-2 bg-blue-950 bg-opacity-50 text-xl'}>
            <ul>
            <h1 className='bg-blue-950 p-1 border-blue-950 text-white text-center'>Meu perfil</h1>
                <li className='mx-5 my-4 text-white text-start'>
                    <Link href="/">
                    <h1>Alterar dados</h1>
                    </Link>
                </li>
            </ul>
        </div>
    )
}