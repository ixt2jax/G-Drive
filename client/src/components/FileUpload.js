import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          
          data: formData,
          headers: {
            // pinata_api_key:`8dc3555fadf735025314`,
            //pinata_api_key:`01f77a4dc8014c72a303`,
      pinata_api_key:'94a1c91cfb8c9469fab9',
            //pinata_secret_api_key:`2202c3d0d29db15a46ae1fbc2d39ee927672a4fa4e0baf4f14319dc6bfe11ef4`,
            // pinata_secret_api_key:`2202c3d0d29db15a46ae1fbc2d39ee927672a4fa4e0baf4f14319dc6bfe11ef4`,
            // "Content-Type": "multipart/form-data",
      pinata_secret_api_key:'1fb1527ea414c00db8e3fce373dfc86690846e2c8d4a3e1074d21fc1118ef431',
      "Content-Type": "multipart/form-data",

            
            // pinata_api_key:/*`a69a4ecdfc35da0a5a16`,*/`a8a0e5fa6cd9ba50de02`,
            // pinata_secret_api_key:`d482c8c1205b6a02879fba1b0ef46566a1c82f31ffb72c2c114110886f367da2`,
            // "Content-Type": "multipart/form-data",
          },
        });
        // const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const ImgHash= `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      }  catch (error) {
            alert("Error sending File to IPFS");
            console.log(error.message); //this mostly occurse when net is not working
           }
    }
    // alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: '822a82c99a268c543b6b',
//               pinata_secret_api_key: 'e0b3cae8cfecf780ea0a077cd6b9dd58ca15fd3001dc68a0fdb43f9f4c912816',
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;