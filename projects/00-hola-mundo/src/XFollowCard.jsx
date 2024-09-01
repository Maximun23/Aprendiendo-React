import { useState } from 'react'

export function XFollowCard ({ children, userName, initialIsFollowing}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)


    console.log('[x-followCard] render with userName: ', userName)

    const text = isFollowing ? 'Siguiendo': 'Seguir'
    const buttonClassname = isFollowing 
        ? 'x-followCard-button is-following' 
        : 'x-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='x-followCard'>
            <header className='x-followCard-header'>
                <img className='x-followCard-avatar'alt="El avatar de midudev" src={`https://unavatar.io/${userName}`} />
                <div className='x-followCard-info'>
                    <strong className='x-followCard-inforUserName-head'>{children}</strong>
                    <span className='x-followCard-inforUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassname} onClick={handleClick}>
                    <span className='x-followCard-text'>{text}</span>
                    <span className="x-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}