import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getUserLogged } from '../actions/userLogged'
import { FaUserCircle } from 'react-icons/fa';

interface UserPanelProps {
    handleClickEvent: () => void;
}

export const UserPanel: React.FC<UserPanelProps> = ({ handleClickEvent }) => {

    const userLogged = useQuery({ queryKey: ["userLogged"], queryFn: getUserLogged });

    return (
        <button className='flex items-center' onClick={handleClickEvent}>
            <FaUserCircle size={50} color='white'></FaUserCircle>
            {!userLogged.isLoading && userLogged.data?.length > 0 && (
                <h1 className='ml-2 text-xl text-white text-left'>Olá,<br />{userLogged.data?.[0]?.name}</h1>
            )}
            {!userLogged.isLoading && userLogged.data?.length === 0 &&
                <h1 className='ml-2 text-xl text-white text-left'>Sem<br />usuário</h1>
            }

        </button>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["userLogged"],
        queryFn: getUserLogged,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
