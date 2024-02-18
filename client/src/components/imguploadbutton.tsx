import React, { useRef } from 'react';
import { Button } from './ui/button';
function ImageUploadButton() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    console.log('Uploading image...');
    try {
      const response = await fetch('http://localhost:8000/api/ocr/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log('Image uploaded successfully');
        console.log("test is: ")
        console.log(data.text)
        await navigator.clipboard.writeText(data.text);
        alert('Text copied to clipboard!');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <Button variant="outline" onClick={handleButtonClick} >📸</Button>
    </div>
  );
}

export default ImageUploadButton;