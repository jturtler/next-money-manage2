import { ChangeEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateFieldProps {
    id?: string;
    disabled?: boolean;
    handleOnChange?: (date: Date | null) => void;
    value: Date | null;
    [key: string]: any; // to support the rest of the props
}

export default function DateField({ id = "", disabled = false, handleOnChange = (date: Date | null) => { }, value, ...rest }: DateFieldProps) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(value);

    const handelOnChange = ( date: Date | null) => {
        setSelectedDate(date);
        if( handleOnChange ) {
            handleOnChange(date);
        }
    }

    return (
        <DatePicker
            {...rest}
            disabled={disabled}
            className={`custom-datepicker ${rest.className}`}
            selected={selectedDate}
            onChange={(date, e) => handelOnChange(date)}
            dateFormat="yyyy-MM-dd"
        />
    );
};