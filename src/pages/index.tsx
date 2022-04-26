import Head from "next/head";
import styled from "styled-components";
import GameContainer from "../components/GameContainer";
import Header from "../components/Header";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(98,83,136);
  background: linear-gradient(180deg, rgba(98,83,136,1) 0%, rgba(218,206,255,1) 71%, rgba(0,0,0,1) 100%);
  margin: 0;

  @media(min-width: 700px) {
    height: 100vh;
  }
`;

export default function Home() {
  return (
    <div>
    <Container>
      <Head>
        <title>Euterpe</title>
        <meta name="description" content="Jogo para adivinhar musica" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameContainer />
    </Container>
    </div>
  );
}
