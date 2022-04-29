import { useAlert } from "react-alert";
import styled from "styled-components";
import { lime30, purple70, purple90, red50 } from "../styles/colors";
import { shareIcon } from "./icons";

interface FeedbackScoreProps {
  isCorrect: boolean;
  showAlertCopyClipboard: () => void;
}

const Message = styled.h1`
  font-size: ${(props) => (props.$title ? "25px" : "15px")};
  font-weight: ${(props) => (props.$title ? "bold" : "500")};
  color: ${(props) => props.$color};
`;

const Icon = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const ShareButton = styled.button`
  color: ${purple90};
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-weight: 700;
  color: #fff;
  background-color: ${purple90};
  border: none;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: ${purple70};
  }
`;

const EUTERPE_SCORE_LS = "euterpe_score";

export default function FeedbackScore({ isCorrect, showAlertCopyClipboard }: FeedbackScoreProps) {

  return (
    <div>
      <Message $title $color={isCorrect ? lime30 : red50}>
        {isCorrect ? `Você Acertou!` : `Você Errou :(`}
      </Message>
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
        <Message $color="white">{`Sua pontuação: ${
          localStorage.getItem(EUTERPE_SCORE_LS) || 0
        }!`}</Message>

        <ShareButton onClick={showAlertCopyClipboard}>
          {`Compartilhar Resultado`}
          <Icon>{shareIcon}</Icon>
        </ShareButton>
      </div>
    </div>
  );
}
