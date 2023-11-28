import banner from "../../imagens/banner.jpg";
import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
	overflow-x: hidden;
	overflow-y: hidden;
`;

export const ContainerContent = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100dvh;
	align-items: center;
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  width: 560px;
	height: 100dvh;
	background-color: #fff;
	padding-bottom: 100px;
`;

export const LoginInput = styled.input`
  box-sizing: border-box;
	margin: 10px;
	padding: 4px 11px;
	color: rgba(0, 0, 0, 0.88);
	font-size: 14px;
	line-height: 1.5714285714285714;
	list-style: none;
	font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
	position: relative;
	display: inline-block;
	width: 90%;
	min-width: 0;
	background-color: #ffffff;
	background-image: none;
	border-width: 1px;
	border-style: solid;
	border-color: #d9d9d9;
	border-radius: 6px;
	transition: all 0.2s;
`;

export const LoginButton = styled.button`
  outline: none;
	position: relative;
	display: inline-block;
	font-weight: 400;
	white-space: nowrap;
	text-align: center;
	background-image: none;
	background-color: transparent;
	border: 1px solid transparent;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	user-select: none;
	touch-action: manipulation;
	line-height: 1.5714285714285714;
	color: rgba(0, 0, 0, 0.88);
	color: #fff;
	background-color: #1677ff;
	box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
	font-size: 14px;
	height: 32px;
	padding: 4px 15px;
	border-radius: 6px;
	width: 90%;
`;

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;
