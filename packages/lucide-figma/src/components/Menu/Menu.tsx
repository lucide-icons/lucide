import { useState } from 'react';
import './Menu.scss';

interface MenuProps {
  page: string;
  setPage: (page: string) => void;
}

const menuItems = ['icons', 'info'];

const Menu = ({ page, setPage = (page) => {} }: MenuProps) => {
  return (
    <nav className="menu">
      {menuItems.map((menuItem) => (
        <div
          className={`menu-item ${page === menuItem ? 'active' : null}`}
          onClick={() => setPage(menuItem)}
        >
          {menuItem}
        </div>
      ))}
    </nav>
  );
};

export default Menu;
