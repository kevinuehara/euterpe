import { useCallback, useEffect, useRef, useState } from "react";
import { finished } from "stream";
import styled from "styled-components";
import AlbumCover from "../components/AlbumCover";
import Timer from "../components/Timer";
import { DailyTrackingResponse } from "../models/tracking";
import AlbumPlayer from "./AlbumPlayer";
import Header from "./Header";
import Option from "./Option";
import { lime30, purple90, red50 } from "../styles/colors";

const BASE_URL = process.env.NEXT_PUBLIC_HOST_API;
const EUTERPE_SCORE_LS = "euterpe_score";
const EUTERPE_DATE_LS = "euterpe_date";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  width: 100vw;


  @media (max-width: 700px) {
    flex-direction: row;
    margin-top: 0;
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

const Message = styled.h1`
  font-size: ${(props) => (props.$title ? "25px" : "15px")};
  font-weight: ${(props) => (props.$title ? "bold" : "500")};
  color: ${(props) => props.$color};
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

  const [correctChoice, setCorrectChoice] = useState(false);

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
      const dateLocalStorage = localStorage.getItem(EUTERPE_DATE_LS);
      const today = new Date().toDateString();

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
      setCorrectChoice(isCorrect);
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
    const today = new Date().toDateString();
    localStorage.setItem(EUTERPE_DATE_LS, today.toString());
  };

  const onUpdateRemainingTime = (time: number) => {
    setTime(time);
  };

  const renderFeedbackOnFinishMatch = () => {
    if (isFinished) {
      if (correctChoice) {
        return (
          <div>
            <Message $title $color={lime30}>{`Você Acertou!`}</Message>
            <Message $color="white">{`Sua pontuação: ${localStorage.getItem(EUTERPE_SCORE_LS) || 0}!`}</Message>
          </div>
        );
      } else {
        return (<div>
          <Message $title $color={red50}>{`Você Errou :(`}</Message>
          <Message $color="white">{`Sua pontuação: ${localStorage.getItem(EUTERPE_SCORE_LS) || 0}!`}</Message>
        </div>);
      }
    } else {
      return <Message $title $color="white">{`Descubra a música:`}</Message>;
    }
  };

  return (
    <div>
      {alreadyPlayed ? (
        <div>
          <MessageContainer>
            <Message $title $color="white">{`Você já jogou hoje bb`}</Message>
            <Message $color="white">{`Volte amanhã pra mais um sonzinho`}</Message>
            <Message $color={purple90}>{`Sua Pontuação: ${
              localStorage.getItem(EUTERPE_SCORE_LS) || 0
            }`}</Message>
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
                { renderFeedbackOnFinishMatch() }
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
