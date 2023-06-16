import Link from "next/link";
import React from "react";

export default function Modal() {
    return (
        <div className={'object-contain h-48 w-96 mr-12 bg-blue-950 bg-opacity-50 text-white font-bold'}>
            <ul className="mx-2 text-blue-950">
            <h1>Notificações</h1>
                <li className="my-2 text-white">
                    <Link href="/">
                    <h1>Conteúdo x</h1>
                    </Link>
                </li>
            </ul>
        </div>
    )
}