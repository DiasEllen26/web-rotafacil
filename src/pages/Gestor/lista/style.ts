import styled from "styled-components";

export const ContentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 5dvh;
`;

export const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 80%;
  max-width: 1200px;
`;
export const ListItem = styled.div`
	 margin: 10px;
  text-align: center;
`;

export const ButtonDeletar = styled.button`
	cursor: pointer;
	background-color: red;
	border: 0px;
	width: 70px;
	height: 40px;
`