import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin-bottom: 7px;
  color: white;
  background: rgb(63, 50, 94);
  background: linear-gradient(
    90deg,
    rgba(63, 50, 94, 1) 0%,
    rgba(83, 53, 175, 1) 49%
  );
  border-radius: 4px;
`;

const GameTitle = styled.h4`
  margin-left: 10px;
`;

const CreatorName = styled.p`
  margin-right: 10px;
  font-size: 12px;
  color: #cbd5e1;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <GameTitle>Euterpe</GameTitle>
      <div>
        <CreatorName>Criado por Kevin Uehara</CreatorName>
      </div>
    </HeaderContainer>
  );
}
