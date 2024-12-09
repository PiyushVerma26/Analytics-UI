import PropTypes from "prop-types";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

function DateRangePickerComponents({ handleDateSelect }) {
  return (
    <div>
      <DateRangePicker
        onOk={(e) => {
          const date = {};
          e.forEach((item, index) => {
            const dateObj = new Date(item);
            const formattedDate = dateObj.toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            date[index] = formattedDate;
            handleDateSelect(date[0], date[1]);
          });
        }}
      />
    </div>
  );
}

export default DateRangePickerComponents;
DateRangePickerComponents.propTypes = {
  handleDateSelect: PropTypes.func.isRequired,
};
