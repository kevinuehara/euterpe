import styled from "styled-components";
import { gray20, red50, green50, slate60 } from "../styles/colors";
import { correctIcon, wrongIcon } from "./icons";

interface OptionProps {
  artist: string;
  isCorrect: boolean;
  isRevealed: boolean;
  songName: string;
  isPlaying: boolean;
  finished: boolean;
  onSelectOption: (artist: string, isCorrect: boolean) => void;
}

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-top: 10px;
  padding: 12px 5px;
  border-radius: 10px;
  transition: 0.4s;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.finished ? 'white' : gray20};
    cursor: ${(props) => props.finished ? 'default' : 'pointer'};
  }
`;

const Icon = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 10px;
  color: ${(props) => props.color};
`;

const OptionSpan = styled.span`
  padding-left: 10px;
  color: ${slate60};
`;

export default function Option({
  artist,
  songName,
  isCorrect,
  isRevealed,
  isPlaying,
  onSelectOption,
  finished
}: OptionProps) {

  return (
    <OptionContainer finished={finished} onClick={() => onSelectOption(artist, isCorrect)}>
      <div>
        <OptionSpan
        >{`${artist} - ${songName}`}</OptionSpan>
      </div>
      <div>
        {isRevealed ? (
          isCorrect ? (
            <Icon color={green50}>{correctIcon}</Icon>
          ) : (
            <Icon color={red50}>{wrongIcon}</Icon>
          )
        ) : null}
      </div>
    </OptionContainer>
  );
}
