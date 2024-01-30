import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function TopBar() {
  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="lg:max-w-7xl w-[90%] mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="text-white">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="text-white">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        <div className="text-lg font-semibold">
          Welcome to our website! Feel free to message us.
        </div>

        <div className="flex items-center space-x-4">
          <select className="border-none bg-transparent text-white">
            <option value="bdt">BDT</option>
            <option value="usd">USD</option>
          </select>

          <select className="border-none bg-transparent text-white">
            <option value="en">English</option>
            <option value="bn">Bangla</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
