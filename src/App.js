
import AlbumList from './components/albumList/AlbumList.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { CustomAlbumContext } from './context/albumContext.jsx';

function App() {
  return (
    <CustomAlbumContext>
        <Navbar></Navbar>
        <AlbumList></AlbumList>
    </CustomAlbumContext> 
  );
}

export default App;
