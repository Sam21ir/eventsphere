import React, { useState } from 'react';
import '../styles/ImageUpload.css';

const ImageUpload = ({ onImageUploaded, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      alert('❌ Veuillez sélectionner une image');
      return;
    }

    // Vérification de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ L\'image est trop grande (max 5MB)');
      return;
    }

    // Prévisualisation locale
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload vers Cloudinary
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'eventsphere');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onImageUploaded(data.secure_url);
        alert('✅ Image uploadée avec succès !');
      } else {
        alert('❌ Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('❌ Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUploaded('');
  };

  return (
    <div className="image-upload-container">
      <label className="upload-label">
        Image de l'événement {uploading && '(Upload en cours...)'}
      </label>

      {!preview ? (
        <label htmlFor="image-input" className="upload-box">
          <div className="upload-content">
            <div className="upload-icon">📸</div>
            <p className="upload-text">
              {uploading 
                ? 'Upload en cours...' 
                : 'Cliquez pour sélectionner une image'}
            </p>
            <p className="upload-hint">PNG, JPG, JPEG (max 5MB)</p>
          </div>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      ) : (
        <div className="image-preview-container">
          <img src={preview} alt="Aperçu" className="uploaded-image" />
          <div className="image-actions">
            <label htmlFor="image-input" className="btn-change">
            Changer l'image
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </label>
            <button 
              type="button" 
              className="btn-remove" 
              onClick={handleRemoveImage}
              disabled={uploading}
            >
            Supprimer
            </button>
          </div>
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;