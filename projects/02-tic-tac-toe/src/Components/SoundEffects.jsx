import { useEffect, useRef } from "react"

export const MusicEffectWin = () => {

    const audioRef = useRef(null);

    useEffect(() =>{
        audioRef.current.play();
    }, [])

    return (
        <audio ref={audioRef}>
            <source src="/sounds/gameWin.mp3" type="audio/mpeg"/>
            Tu navegador no soporta la etiqueta de audio.
        </audio>
    )
}

export const MusicEffectDraw = () => {

    const audioRef = useRef(null);

    useEffect(() =>{
        audioRef.current.play();
    }, [])

    return (
        <audio ref={audioRef}>
            <source src="/sounds/draw.mp3" type="audio/mpeg"/>
            Tu navegador no soporta la etiqueta de audio.
        </audio>
    )
}

export const MusicEffectX = ({ play }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        }
    }, [play]);

    return (
        <audio ref={audioRef}>
            <source src="/sounds/soundX.mp3" type="audio/mpeg" />
            Tu navegador no soporta la etiqueta de audio.
        </audio>
    );
};

export const MusicEffectO = ({ play }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        }
    }, [play]);

    return (
        <audio ref={audioRef}>
            <source src="/sounds/soundO.mp3" type="audio/mpeg" />
            Tu navegador no soporta la etiqueta de audio.
        </audio>
    );
};