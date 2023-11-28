import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  top: 0;
  padding: 0;
  width: 5em;
  height: 100vh;
  position: fixed;
  background-color: var(--background-secondary);
  transition: width .35s cubic-bezier(var(--transition-main), 1);
  overflow-y: auto;
  overflow-x: hidden;

  &:hover {
    width: 16em;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--background-secondary);
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: var(--background-secondary);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary);
  }
`;

export const NavbarItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;


export const NavbarLogo = styled.li`
  margin: 0 0 2em 0;
  width: 100%;
  height: 5em;
  background: var(--background-secondary-dark);
  display: flex;
  align-items: center;

  > .navbar-item-inner {
    width: calc(5rem - 8px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > .navbar-item-inner > img {
    height: 59px;
    width: 60px;
    display: flex;
    margin-right: 8px;
    margin
  }

  > .navbar-item-inner:hover {
    background-color: transparent;
  }
`;
export const NavbarItem = styled.li`
  padding: 0 .5em;
  width: 100%;
  cursor: pointer;
`;

export const NavbarItemInner = styled(Link)`
  padding: 1em 0;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--white);
  border-radius: .25em;
  text-decoration: none;
  transition: all .2s cubic-bezier(var(--transition-main), 1);

  &:hover {
    background: var(--background-secondary-light);
    box-shadow: 0 17px 30px -10px hsla(var(--black), .25);
  }
`;


export const NavbarItemInnerIconWrapper = styled.div`
	width: calc(5rem - 1em - 10px);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 8px;
	text-align: center;

	> ion-icon {
  font-size: calc(var(--navbar-buttons) - 1rem);
}
`;

export const LinkText = styled.span`
  white-space: nowrap;
  opacity: 0;

  ${NavbarItemInner}:hover & {
    opacity: 1;
  }
`;