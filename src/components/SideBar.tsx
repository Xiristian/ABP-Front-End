import Link from "next/link";

export default function SideBar() {
    return (
        <div className={'flex w-52 min-h-full bg-green-200'}>
            <ul className="mx-2">
                <li className="my-2">
                    <Link href="/">
                        <h1>Tela inicial</h1>
                    </Link>
                </li>
                <li className="my-2">
                    <Link href="/">
                        <h1>Novo agendamento</h1>
                    </Link>
                </li>
            </ul>
        </div>
    )
}