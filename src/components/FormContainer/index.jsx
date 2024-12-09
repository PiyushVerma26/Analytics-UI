import PropTypes from "prop-types";

function FormContainer({ children }) {
  return (
    <div className="bg-white rounded-lg max-w-[500px] w-full overflow-hidden shadow-xl">
      {children}
    </div>
  );
}

export default FormContainer;
FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
