import { useValue } from "../../context/albumContext.jsx"
import style from "./album.module.css";

function AlbumList(){
    const {list,handleDelete,handleSave,handleUpdate,setNewTitle,newTitle,editingId}=useValue();
    
    return (
        <div className={style.container}>
          {list.map((item) => (
            <div key={item.id} className={style.outer} >
              {editingId === item.id ? (
              <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => handleSave(item.id)}>Save</button>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <button onClick={() => handleUpdate(item.id)}>Update</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </>
          )}
            </div>
          ))}
        </div>
      );
    }

    export default AlbumList;