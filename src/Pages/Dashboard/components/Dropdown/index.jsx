import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowDown as Open } from "react-icons/io";
import { MdOutlineKeyboardArrowRight as Close } from "react-icons/md";
function DropDown({ optionList = [], name, handleChange }) {
  const [dropDownItem, setDropDownItem] = useState(`Select ${name}`);
  const [isDropDown, setIsDropDown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const dropdownRef = useRef();
  const listRef = useRef();

  const handleItemClick = (item) => {
    setDropDownItem(item);
    handleChange(name, item);
    setIsDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-40 bg-white rounded-lg relative p-2 capitalize  "
      ref={dropdownRef}
    >
      <div
        className="cursor-pointer flex flex-row flex-nowrap items-center gap-2 justify-between  relative"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        {dropDownItem} {isDropDown ? <Open /> : <Close />}
      </div>

      {isDropDown && (
        <div
          className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 z-50"
          ref={listRef}
        >
          <div className="flex flex-col gap-2 p-3  ">
            {optionList.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${
                  activeIndex === index ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  handleItemClick(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;

DropDown.propTypes = {
  optionList: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
