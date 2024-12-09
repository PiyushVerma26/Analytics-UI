import PropTypes from "prop-types";

function Forms({
  formField = [],
  formTitle,
  btnText,
  handleSubmit,
  handleChange,
  isLoading,
}) {
  const inputCss = "bg-slate-200 p-2 rounded-md focus:outline-none w-full";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-full flex flex-col gap-3 items-center justify-center max-w-[400px] mx-auto pb-10"
    >
      <h2 className="font-bold text-2xl text-green-900 my-2">{formTitle}</h2>
      {formField &&
        formField.map((item, index) => {
          return (
            <input
              key={index}
              type={item.type}
              placeholder={item.placeholder}
              className={`${inputCss}`}
              required
              onChange={handleChange}
              name={item.name}
            />
          );
        })}
      <button
        type="submit"
        className="bg-blue-500 px-3 py-1 rounded-md text-white font-semibold mt-2 w-full"
      >
        {isLoading ? "Submittig" : btnText}
      </button>
    </form>
  );
}

export default Forms;
Forms.propTypes = {
  formField: PropTypes.array.isRequired,
  formTitle: PropTypes.node.isRequired,
  btnText: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.node,
};
