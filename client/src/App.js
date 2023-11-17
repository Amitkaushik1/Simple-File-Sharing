import {useRef, useState, useEffect} from "react";
import './App.css';
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile]=useState('');

  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const logo = "https://th.bing.com/th?id=OIP.4siKIW3oZ4kEo0vkEVQ5hgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

      let response = await uploadFile(data);
      setResult(response.path);

      }
    }
    getImage();
  }, [file])


  const onUploadClick = () => {
    fileInputRef.current.click();
  }


  return (
      <div className="imgbox">
        <img src={logo} alt="image" />

        <div className="linkbox">
          <h1>Share Your File</h1>
          <p>Upload and share the download link.</p>

          <button onClick={()=> onUploadClick()}>Upload</button>
          <input type="file"
          ref={fileInputRef} 
          style={{display: "none"}}
          onChange={(e)=> setFile(e.target.files[0]) }
          />

            <a href={result} target="blank">{result}</a>

        </div>

      </div>
    
  );
}

export default App;
