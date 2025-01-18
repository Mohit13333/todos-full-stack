import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const { isLoggedIn } = useAuth();

  return (
    <nav className="fixed top-0 right-0 w-full  text-white z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">
          <img src="/images/todo.png" alt="logo" className="w-20 rounded-3xl" />
        </div>

        <button
          className="text-2xl sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaTimes className="text-white" />
          ) : (
            <FaBars className="text-white" />
          )}
        </button>
        <ul className="hidden sm:flex space-x-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 font-bold" : "hover:text-indigo-500"
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-bold"
                    : "hover:text-indigo-500"
                }
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-gray-800 py-4 px-6">
          <ul className="space-y-4 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-bold"
                    : "hover:text-indigo-500"
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-500 font-bold"
                        : "hover:text-indigo-500"
                    }
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-500 font-bold"
                        : "hover:text-indigo-500"
                    }
                    onClick={toggleMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                  onClick={toggleMenu}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
