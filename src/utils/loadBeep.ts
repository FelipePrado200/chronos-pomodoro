import beep from '../../public/audios/beep.mp3'

export function loadBeep(){ 
    const audio  = new Audio(beep)
    audio.load();
    return() => {
        audio.currentTime = 0 ; 
        audio.play().catch(error => console.log('erro ao tocar audio' , error)); 
    }
}