
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const albumContext = createContext();

function useValue(){
    const value=useContext(albumContext);
    return value;
}
 function CustomAlbumContext({children}){
    const [list,setList]=useState([]);
    const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [title, setTitle] = useState("");

    useEffect(() => {
        axios
          .get("https://jsonplaceholder.typicode.com/albums")
          .then((response) => {
            setList(response.data); // Set the fetched albums in state
          })
          .catch((error) => {
            console.error("Error fetching albums:", error);
          });
      }, []);

      async function handleDelete(id) {
        try {
             // Update the state to remove the deleted album from the list
            const updatedList = list.filter((item) => item.id !== id);
            setList(updatedList);
          // Make an Axios DELETE request to the API
            await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
        } catch (error) {
          console.error("Error deleting the album:", error);
        }
      }
       // Function to handle edit action
  function handleUpdate(id) {
    setEditingId(id); // Set the ID of the item being edited
    const albumToEdit = list.find((item) => item.id === id);
    setNewTitle(albumToEdit.title); // Pre-fill input with current title
  }


      // Function to handle save action with Axios PUT call
  async function handleSave(id) {
    try {
        
      // Make an Axios PUT request to update the album
      const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        title: newTitle,
      });

      // Update the state with the updated album data
      const updatedList = list.map((item) =>
        item.id === id ? response.data : item
      );
      setList(updatedList);
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating the album:", error);
    }
  }

//   function to add a new Album
async function handleAdd(title){
    try {
        // Make a POST request to create a new album
        const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
            title, // Provide necessary album data
            userId: list.length+1
        });
        // Add the new album to the state
        setList([...list, response.data]);
    } catch (error) {
        console.error('Error adding the album:', error);
    }
}

 // Function to handle the input change
 function handleTitleChange(event) {
    setTitle(event.target.value);
}

// Function to handle the click event of the "Create new Album" button
async function handleCreate() {
    if (title.trim() === "") {
        alert("Album title cannot be empty.");
        return;
    }
    await handleAdd(title); // Pass the title to the context function
    setTitle(""); // Clear the input field after adding
}

    return(
        <albumContext.Provider value={{list,setList,handleDelete,handleUpdate,handleSave,setNewTitle,
            newTitle,editingId,handleAdd,title, setTitle,handleCreate,handleTitleChange}}>
            {children}
        </albumContext.Provider>
    )
 }
 export {useValue,CustomAlbumContext};