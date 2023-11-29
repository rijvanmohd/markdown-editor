import { memo } from "react";
import './index.css';

const Button = ({onClick, children}) => {
    return (
        <button onClick={onClick} className="primary-btn">{children}</button>
    )
}

export default memo(Button)