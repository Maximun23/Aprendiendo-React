import '../src/App.css'
import { XFollowCard } from './XFollowCard'

const users = [
    {
        userName: 'Maximun12231',
        name: 'Maximun1223YT',
        isFollowing: false,
    },
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: false,
    },
    {
        userName: 'petrogustavo',
        name: 'Gustavo Petro',
        isFollowing: false,
    },
    {
        userName: 'UmbrellaAcad',
        name: 'Umbrella Academy',
        isFollowing: false,
    },
]

export function App () {
    return (
        <section className='container'>
           {
            users.map(({userName, name, isFollowing }) =>(
                <XFollowCard 
                key ={userName}
                userName={userName}
                initialIsFollowing={isFollowing}
                >
                   {name}
                </XFollowCard>
            ))
           }
        </section>
    )
}