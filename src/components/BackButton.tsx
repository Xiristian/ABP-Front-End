import { useRouter } from 'next/router';

export default function BackButton({ customClass }: { customClass: string }) {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <button className={`bg-blue-950 rounded text-white p-2 ${customClass}`} onClick={goBack}>Voltar</button>
    );
};

