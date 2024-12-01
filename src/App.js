import { useRef, useState } from 'react';
//useState et useRef : Ces hooks de React permettent de :
//useState : Gérer des états (par exemple : savoir si la musique est en lecture).
//useRef : Créer une référence à un élément DOM (ici, pour contrôler l’audio).
import './App.css';
//App.css : Ajoute le fichier de styles pour personnaliser l’apparence de l’application.

function App() {
//Le composant principal qui englobe toute l'application.
//c comme si la fonction principale
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Bruit Blanc',
    songArtist: 'Blanc',
    songSrc: './assets/sonum1.mp3',
    songAvatar: './assets/photo.jpeg'
  })

  //currentMusicDetails : État contenant les informations sur la chanson en cours :
//Nom de la chanson (songName).
//Artiste (songArtist).
//Fichier audio (songSrc).
//Image de la chanson (songAvatar).
//Pourquoi setCurrentMusicDetails ? Permet de mettre à jour ces informations lorsqu’on change de musique.


  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  //audioProgress : Pour gérer la position de lecture de la musique (en pourcentage).
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  //isAudioPlaying : Indique si la musique est en lecture ou en pause.
  const [musicIndex, setMusicIndex] = useState(0);
  //musicIndex : L'index (position) de la chanson actuelle dans la liste.
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  //musicTotalLength : Durée totale de la chanson (ex : "04:38").
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  //musicCurrentTime : Temps actuel dans la chanson (ex : "00:30").
  const [videoIndex, setVideoIndex] = useState(0)
  //videoIndex : Gère le fond vidéo actuel.

  




  const currentAudio = useRef()
   //currentAudio : Une référence pour accéder et contrôler directement l'élément <audio>.

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }
//But : Permet de mettre à jour la position de lecture lorsque l'utilisateur déplace la barre de progression

  //Change Avatar Class
  let avatarClass = ['objectFitCover','objectFitContain','none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0)
  const handleAvatar = ()=>{
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0)
    }else{
      setAvatarClassIndex(avatarClassIndex + 1)
    }
  }
 // avatarClass : Définit les classes CSS pour l’image de l’avatar.
//objectFitCover : L'image occupe tout l'espace.
//objectFitContain : L'image s'adapte pour ne pas être coupée.
//none : Masque l'avatar.
//handleAvatar : Change la classe de l'image lorsqu'on clique dessus.



  //Play Audio Function
  const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }
  //Si la musique est en pause, elle commence à jouer, sinon elle se met en pause

  const musicAPI = [
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    },
    {
      songName: 'bruit blanc',
      songArtist: 'blanc',
      songSrc: './assets/sonum1.mp3',
      songAvatar: './assets/photo.jpeg'
    }
  ]

  const handleNextSong = ()=>{
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = ()=>{
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number)=>{
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }


  const vidArray = ['./assets/sonum1.mp3','./assets/sonum1.mp3','./assets/sonum1.mp3','./assets/sonum1.mp3','./assets/sonum1.mp3','./assets/sonum1.mp3'];

  const handleChangeBackground = ()=>{
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1)
    }
  }


  return (
    <>
    <div className="container">
      <audio src='./assets/sonum1.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>Music Player</p>
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
        </div>
      </div>
      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
      
    </div>
    </>
  );
}

export default App;