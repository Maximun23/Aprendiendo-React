import { useState } from 'react'
import '../src/App.css'
import { XFollowCard } from './XFollowCard'

export function App () {
    return (
        <section className='container'>
            <XFollowCard  userName={"midudev"} initialIsFollowing={true}>
                Miguel Ángel Durán
            </XFollowCard>

            <XFollowCard  userName={"Maximun12231"}>
                Maximun1223YT
            </XFollowCard>
        </section>
    )
}