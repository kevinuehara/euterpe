import { MutableRefObject } from "react";
import styled from "styled-components";
import { DailyTrackingResponse } from "../models/tracking";
import AlbumCover from "./AlbumCover";
import PlayButton from "./PlayButton";

interface AlbumPlayerProps {
  track: DailyTrackingResponse;
  isRevealed: boolean;
  finished: boolean;
  onTimeUpdate: () => void;
  onPlayClicked: () => void;
  audioRef: MutableRefObject<HTMLAudioElement>;
}

const AlbumPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 

  @media (min-width: 700px) {
    margin-left: 10%;
    margin-top: 30px;
  }
`;

const Audio = styled.audio`
  display: none;
`;

const Heading = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const HeadingContent = styled.span`
  color: white;
  font-weight: ${(props) => props.$title ? "bold" : "300"};
`;

export default function AlbumPlayer({
  track,
  onTimeUpdate,
  onPlayClicked,
  isRevealed,
  audioRef,
  finished,
}: AlbumPlayerProps) {
  return (
    <AlbumPlayerContainer>
      <AlbumCover
        imgUrl={track.previewCoverAlbumImage}
        isRevealed={isRevealed}
        artist={track.artistName}
      />

      {isRevealed ? (
        <Heading>
          <HeadingContent $title={true}>{track.artistName}</HeadingContent>
          <HeadingContent $title={false}>{track.musicName}</HeadingContent>
        </Heading>
      ) : null}

      <Audio controls ref={audioRef} onTimeUpdate={onTimeUpdate}>
        <source src={track.previewUrl} type="audio/ogg" />
        <source src={track.previewUrl} type="audio/mpeg" />
      </Audio>

      <PlayButton disabled={finished} onPlayClicked={onPlayClicked}/>
    </AlbumPlayerContainer>
  );
}
