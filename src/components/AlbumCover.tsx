import Image from "next/image";
import styled from "styled-components";
import { songIcon } from "./icons";
import { gray20, gray70 } from "../styles/colors";

interface AlbumCoverProps {
  imgUrl: string;
  isRevealed: boolean;
  artist: string;
}

const AlbumCardHidden = styled.div`
  background-color: ${gray20};
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  color: ${gray70};
`;

const AlbumContainer = styled.div`
  margin-top: 10px;
`;

export default function AlbumCover(props: AlbumCoverProps) {
  return (
    <AlbumContainer>
      {props.isRevealed ? (
        <Image
          loader={() => props.imgUrl}
          src={props.imgUrl}
          alt={`Album Cover Image of ${props.artist}`}
          width={200}
          height={200}
        />
      ) : (
        <AlbumCardHidden>
          <Icon>{songIcon}</Icon>
        </AlbumCardHidden>
      )}
    </AlbumContainer>
  );
}
