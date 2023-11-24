import { Navbar, NavbarItems, NavbarLogo, NavbarItem, NavbarItemInner, NavbarItemInnerIconWrapper, LinkText } from './styled';
import { FaHome, FaBusAlt } from 'react-icons/fa';
import { IoBusiness } from "react-icons/io5";
import { FaMapLocationDot, FaUserLarge  } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import React from 'react';

import logo from '../../imagens/logo-transparente.png'

const Header: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar id="navbar">
        <NavbarItems className="navbar-items flexbox-col">
          {/* Navbar Logo */}
          <NavbarLogo className="navbar-logo flexbox-left">
            <NavbarItemInner to="/" className="navbar-item-inner flexbox">
              <img src={logo} alt="Logo" />
            </NavbarItemInner>
          </NavbarLogo>

          {/* Home */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/home" className="navbar-item-inner flexbox-left">
              {/* Ícone */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
                <FaHome />
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Home</LinkText>
            </NavbarItemInner>
          </NavbarItem>

          {/*Transportadora */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/transportadora" className="navbar-item-inner flexbox-left">
              {/* Icon */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
                <IoBusiness />  
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Transportadora</LinkText>
            </NavbarItemInner>
          </NavbarItem>

          {/*Rota */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/rota" className="navbar-item-inner flexbox-left">
              {/* Icon */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
                <FaMapLocationDot />
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Rota</LinkText>
            </NavbarItemInner>
          </NavbarItem>

          {/* Veículos */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/veiculo" className="navbar-item-inner flexbox-left">
              {/* Icon */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
                <FaBusAlt />
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Veículo</LinkText>
            </NavbarItemInner>
          </NavbarItem>

          {/* Gestor */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/gestor" className="navbar-item-inner flexbox-left">
              {/* Icon */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
              <RiAdminFill />
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Gestor</LinkText>
            </NavbarItemInner>
          </NavbarItem>

          {/* Usuário */}
          <NavbarItem className="navbar-item flexbox-left">
            <NavbarItemInner to="/usuario" className="navbar-item-inner flexbox-left">
              {/* Icon */}
              <NavbarItemInnerIconWrapper className="navbar-item-inner-icon-wrapper flexbox">
                <FaUserLarge />
              </NavbarItemInnerIconWrapper>
              <LinkText className="link-text">Usuário</LinkText>
            </NavbarItemInner>
          </NavbarItem>
        </NavbarItems>
      </Navbar>
    </>
  );
};

export default Header;
