import styled from "styled-components";
import { playIcon } from "./icons";
import { purple50, purple90, purple30 } from '../styles/colors';

interface PlayButtonProps {
  disabled?: boolean;
  onPlayClicked: () => void;
}

const Button = styled.button`
  margin-top: 10px;
  width: 200px;
  display: flex;
  justify-content:center;
  border-radius: 30px;
  border: none;
  padding: 10px;
  background-color: ${(props) => props.disabled ? purple30 : purple90};
  transition: 0.4s;

  &:hover {
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
    background-color: ${(props) => props.disabled ? purple30 : purple50};;
  }
`;

const Icon = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  color: #fff;
`;

export default function PlayButton({
  disabled,
  onPlayClicked,
}: PlayButtonProps) {
  return (
    <Button disabled={disabled} onClick={onPlayClicked}>
      <Icon>{playIcon}</Icon>
    </Button>
  );
}
