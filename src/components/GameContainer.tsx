import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AlbumCover from "../components/AlbumCover";
import Timer from "../components/Timer";
import { DailyTrackingResponse } from "../models/tracking";
import AlbumPlayer from "./AlbumPlayer";
import Header from "./Header";
import Option from "./Option";

const BASE_URL = process.env.NEXT_PUBLIC_HOST_API;
const EUTERPE_SCORE_LS = 'euterpe_score';
const EUTERPE_DATE_LS = 'euterpe_date';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  width: 100vw;

  @media (max-width: 700px) {
    flex-direction: row;
  }
`;

const GameContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 700px) {
    width: 100vw;
    flex-direction: column;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media (max-width: 700px) {
    width: 100vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    height: 100vh;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Message= styled.h1`
  font-size: ${(props) => (props.$title ? "25px" : "15px")};
  font-weight: ${(props) => (props.$title ? "bold" : "500")};
  color: white;
`;

export default function GameContainer() {
  const [track, setTrack] = useState<DailyTrackingResponse>(null);
  const [rendered, setRendered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [time, setTime] = useState(10);
  const [previousScore, setPreviousScore] = useState(0);

  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement>();

  const loadDailyTrack = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/tracks`);
    const json = await response.json();
    setTrack(json);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, []);

  useEffect(() => {
    if (rendered) {
      loadDailyTrack();
      const previousScore = localStorage.getItem(EUTERPE_SCORE_LS) || "0";
      setPreviousScore(parseInt(previousScore));
      validatePlayerAlreadyPlayed();
    } else {
      setRendered(true);
    }
  }, [loadDailyTrack, rendered]);

  const validatePlayerAlreadyPlayed = () => {
    if (localStorage.getItem(EUTERPE_DATE_LS)) {
      const dateLocalStorage = new Date(
        localStorage.getItem(EUTERPE_DATE_LS)
      ).toISOString();
      const today = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();

      if (dateLocalStorage === today) {
        setAlreadyPlayed(true);
      } else {
        setAlreadyPlayed(false);
      }
    } else {
      setAlreadyPlayed(false);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef && audioRef.current.currentTime > 10) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const onPlayClicked = () => {
    setIsPlaying(true);
    setIsStarted(true);
    audioRef.current.play();
  };

  const onTimesUp = () => {
    setIsRevealed(true);
    setIsFinished(true);
    finishMatch();
    saveScoreLocalStorage(false);
  };

  const onSelectOption = (artist: string, isCorrect: boolean) => {
    if (isStarted) {
    setIsRevealed(true);
    setIsFinished(true);
    setIsPlaying(false);
    saveScoreLocalStorage(isCorrect);
    finishMatch();
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    }
  };

  const saveScoreLocalStorage = (isCorrect: boolean) => {
    if (isCorrect) {
      const newScore = time + previousScore;
      localStorage.setItem(EUTERPE_SCORE_LS, newScore.toString());
    }
  };

  const finishMatch = () => {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    localStorage.setItem(EUTERPE_DATE_LS, today.toISOString());
  };

  const onUpdateRemainingTime = (time: number) => {
    setTime(time);
  };

  return (
    <div >
      {alreadyPlayed ? (
        <div >
        <MessageContainer>
          <Message
            $title
          >{`Você já jogou hoje meu rei!`}</Message>
          <Message>{`Volte amanhã pra mais um sonzinho`}</Message>
        </MessageContainer>
        </div>
      ) : (
        <Content>
          <Header />
          <Timer
            play={isPlaying}
            duration={10}
            onTimeUp={onTimesUp}
            onUpdate={onUpdateRemainingTime}
          />
          <Container>
            {track ? (
              <GameContent>
                <AlbumPlayer
                  audioRef={audioRef}
                  isRevealed={isRevealed}
                  onPlayClicked={onPlayClicked}
                  onTimeUpdate={onTimeUpdate}
                  track={track}
                  finished={isFinished}
                />

                <OptionsContainer>
                <Message $title>{`Descubra a música:`}</Message>
                  {track.answers.map((option) => {
                    return (
                      <Option
                        key={option.artist}
                        isCorrect={option.isCorrect}
                        isRevealed={isRevealed}
                        artist={option.artist}
                        songName={option.songName}
                        isPlaying={isPlaying}
                        onSelectOption={onSelectOption}
                        finished={isFinished}
                        started={isStarted}
                      />
                    );
                  })}
                </OptionsContainer>
              </GameContent>
            ) : null}
          </Container>
        </Content>
      )}
    </div>
  );
}
