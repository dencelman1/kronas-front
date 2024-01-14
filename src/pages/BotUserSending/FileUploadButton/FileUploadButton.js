import { useState } from "react";


var FileUploadButton = ({
  fileType,
  onFileSelect,
}) => {
  var [files, setFiles] = useState([])

  var handleFileSelect = (event) => {
    var files = event.target.files
    onFileSelect(files)
    setFiles(files)
  }

  return (
    <div>
      <label className="fileUploadButton__label" htmlFor={`file-upload-${fileType}`}>
        {fileType === 'image' ? 'Фото' : 'Інші файли'} {` (${files.length})`}
      </label>
      <input
        id={`file-upload-${fileType}`}
        type="file"
        accept={fileType === 'image' ? 'image/*' : '*/*'}
        onChange={handleFileSelect}
        multiple={true}
        
        style={{ display: 'none' }}
      />
      
    </div>
  );
}

export default FileUploadButton;
