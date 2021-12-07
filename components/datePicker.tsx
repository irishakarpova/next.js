
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DataChange{
    date: Date
    handleChangeDate: () => void
}
const CreateDate: React.FC<DataChange> = ({date, handleChangeDate}) => {

    return (
        <DatePicker 
            selected={date} 
            onChange={handleChangeDate} 
        />
    );
  };

  export default CreateDate