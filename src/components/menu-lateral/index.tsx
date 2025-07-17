import { useContext, useEffect, useState } from 'react';
import { IoLogOut } from 'react-icons/io5';
import { MdArrowForwardIos } from 'react-icons/md';
import menuContentItens from '../../utils/content/menuContentItens';
import type { MenuItem } from '../../utils/interfaces/MenuContentInterface';
import { Tooltip } from 'react-tooltip';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UsuarioContext } from '../../context';
const MOBILE_BREAKPOINT = 768;

const LateralNav = () => {
  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;
  console.log(isMobile());
  const [collapsed, setCollapsed] = useState<boolean>(isMobile());
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const { limpar, idUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => {
      if (isMobile()) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setMenu(
      menuContentItens.map((item) => ({
        ...item,
        active: item.link === '/' ? currentPath === '/' : currentPath.startsWith(item.link),
      })),
    );
  }, []);

  const handleMenu = (index: number) => {
    const updated = menu.map((item, i) => ({
      ...item,
      active: i === index,
    }));
    setMenu(updated);
    navigate(menu[index].link);
  };

  const handleSair = () => {
    limpar();
    toast.info('Logout realizado com Sucesso');
  };

  const handleCollapsed = () => {
    if (isMobile()) {
      setCollapsed(true);
    } else {
      setCollapsed(!collapsed);
    }
  };
  return (
    <aside
      className={`relative h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out overflow-visible ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <Tooltip id="menu-tooltip" place="right" />

      <button
        onClick={handleCollapsed}
        className="absolute top-4 right-0 translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors duration-300 z-10"
      >
        <span
          className={`text-white text-xl transform transition-transform duration-500 ease-in-out ${
            collapsed ? 'rotate-180' : ''
          }`}
        >
          <MdArrowForwardIos />
        </span>
      </button>

      <div className="flex items-center justify-center  border-b border-gray-200">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className={`transition-all duration-500 ease-in-out ${collapsed ? 'w-' : 'w-32'}`}
        />
      </div>

      <nav>
        <ul className="pt-4 space-y-2">
          {menu.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleMenu(index)}
              className={`cursor-pointer flex items-center rounded mb-4 transform transition-all duration-300 ease-in-out hover:bg-gray-100 px-4 ${
                item.active
                  ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600'
                  : 'border-r-4 border-transparent text-black'
              }`}
              {...(isMobile()
                ? {
                    'data-tooltip-id': 'menu-tooltip',
                    'data-tooltip-content': item.label,
                  }
                : {})}
            >
              <item.icon
                className={` ${collapsed ? 'text-xl text-center mx-auto' : 'text-xl mx-0 mr-3'} `}
              />
              {!collapsed && <span className="text-sm font-semibold">{item.label}</span>}
            </li>
          ))}
          {idUsuario !== null && (
            <li
              onClick={handleSair}
              className={`cursor-pointer flex items-center fixed bottom-2.5 justify-center rounded mt-8 px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100 text-indigo-800 ${
                collapsed ? 'justify-center w-20' : 'justify-start w-64'
              }`}
              {...(isMobile()
                ? {
                    'data-tooltip-id': 'menu-tooltip',
                    'data-tooltip-content': 'Deslogar',
                  }
                : {})}
            >
              <IoLogOut className={`text-2xl ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span className="text-sm font-semibold">Sair</span>}
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default LateralNav;
