import '../src/App.css'
import { XFollowCard } from './XFollowCard'

export function App () {
    return (
        <section className='container'>
            <XFollowCard
            isFollowing
            userName={"midudev"}
            name={"Miguel Ángel Durán"} />

            <XFollowCard
            isFollowing={false}
            userName={"Maximun12231"} name={"Maximun1223YT"} />

            <XFollowCard
            isFollowing
            userName={"NASA"} name={"NASA"} />

            <XFollowCard
            isFollowing
            userName={"Google"} name={"Google"} />

            <XFollowCard    
            isFollowing
            userName={"daviardev"} name={"daviardev"} />
        </section>
    )
}