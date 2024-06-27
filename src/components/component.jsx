import styled from "styled-components";

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
export const Container = styled.div`
  padding: 0px 20px;
  width: 420px;
  margin: 0 auto;
`;
export const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
`;
export const Loader = styled.div`
  margin: 0 auto;
  text-align: center;
`;
