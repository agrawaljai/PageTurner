import React, { useState } from 'react';

const UploadImage = () => {
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setUploadedUrl(data.url);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Uploading...</p>}
      {uploadedUrl && (
        <div>
          <p>Image Uploaded:</p>
          <img src={uploadedUrl} alt="Uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
