import PropTypes from "prop-types";

function Card({ title, value }) {
  return (
    <div className="w-full h-28 bg-white shadow-xl rounded-md p-3 flex flex-col justify-center items-center">
      <p className="text-black font-bold text-4xl">{value}</p>
      <p className="text-slate-600">{title}</p>
    </div>
  );
}

export default Card;
Card.propTypes = {
  value: PropTypes.node,
  title: PropTypes.node.isRequired,
};
