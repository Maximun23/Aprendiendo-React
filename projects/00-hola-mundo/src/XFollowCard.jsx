export function XFollowCard ({ userName, name, isFollowing}) {
    console.log(isFollowing)

    return (
        <article className='x-followCard'>
            <header className='x-followCard-header'>
                <img className='x-followCard-avatar'alt="El avatar de midudev" src={`https://unavatar.io/${userName}`} />
                <div className='x-followCard-info'>
                    <strong className='x-followCard-inforUserName-head'>{name}</strong>
                    <span className='x-followCard-inforUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className='x-followCard-button'>
                    Seguir
                </button>
            </aside>
            
        </article>
    )
}