// components/Lista/style.js
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 5vh;
  margin-left: 12vw;
`;

export const StyledListItem = styled.div`
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }

  a {
    color: #3498db;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #1a6073;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    a {
      color: #3498db;
      text-decoration: none;
      display: inline-block;
      margin-top: 10px;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #1a6073;
      }
    }

    button {
      cursor: pointer;
      background-color: #e74c3c;
      border: none;
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #c0392b;
      }
    }
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 5vh auto;
`;

export const StyledCadastrarButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0,
    rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;

  &:hover {
    background: #f6f9fe;
    color: #174ea6;
  }

  &:active {
    box-shadow: 0 4px 4px 0 rgba(60, 64, 67, 0.3),
      0 8px 12px 6px rgba(60, 64, 67, 0.15);
    outline: none;
  }

  &:focus {
    outline: none;
    border: 2px solid #4285f4;
  }

  &:not(:disabled) {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
      rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
    box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
      rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
  }

  &:disabled {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }
`;
