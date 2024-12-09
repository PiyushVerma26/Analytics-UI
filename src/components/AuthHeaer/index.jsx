import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AuthHeader({ link, btnText }) {
  return (
    <div className="relative h-full w-full">
      <img
        src="/icon.jpg"
        className="object-fill w-full h-56 hover:scale-105 transform transition-all duration-300 ease-linear "
      />

      <div className="absolute left-0 bottom-0 p-3 text-white flex flex-col gap-2 ">
        <p className="text-xl font-bold  ">
          Welcome to the World Of analytics !
        </p>
        <p className="text-sm text-slate-300 tracking-wider">
          Discover the power of data as it transforms into actionable insights.
          Unlock new opportunities and drive smarter decisions with the world of
          analytics.
        </p>

        <Link
          to={link}
          className="text-black bg-white font-semibold max-w-max px-3 py-1 rounded-lg hover:bg-yellow-300 "
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
}

export default AuthHeader;
AuthHeader.propTypes = {
  link: PropTypes.node.isRequired,

  btnText: PropTypes.node.isRequired,
};
