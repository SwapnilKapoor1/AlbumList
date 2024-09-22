import { useValue } from "../../context/albumContext";
import style from "./navbar.module.css";
function Navbar(){
    const {title,handleCreate,handleTitleChange}=useValue();

    return(          
        <div className={style.outerContainer}>
            <h1 className={style.heading}>My Album</h1>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter new album title"
                className={style.input}
            />
            <button className={style.top} onClick={handleCreate}>Add</button>
        </div>
    )
}
export default Navbar;