import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="py-4 md:py-6 sticky top-0 bg-white/60 backdrop-blur-md shadow-md z-10 p-4">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a
              href="#"
              title=""
              className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              <img
                className="w-auto h-8"
                src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg"
                alt=""
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900 bg-gray-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                // Close Icon
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Solutions{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Industries{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Fees{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              About Rareblocks{" "}
            </a>
          </div>

          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">
            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {" "}
              Sign in{" "}
            </a>

            <a
              href="#"
              title=""
              className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              Create free account
            </a>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <a
              href="#"
              className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Solutions
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Industries
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Fees
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              About Rareblocks
            </a>
            <div className="border-t">
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Sign in
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-white text-center bg-gray-900 rounded-lg hover:bg-gray-700"
              >
                Create free account
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
