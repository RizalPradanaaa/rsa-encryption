import React, { useState } from 'react';
import JSEncrypt from 'jsencrypt';

function App() {
  const [encryptionText, setEncryptionText] = useState('');
  const [encryptionResult, setEncryptionResult] = useState('');
  const [decryptionText, setDecryptionText] = useState('');
  const [decryptionResult, setDecryptionResult] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  // Fungsi untuk menangani enkripsi
  const handleEncryption = (e) => {
    e.preventDefault();

    // Menghasilkan kunci RSA
    const encryptor = new JSEncrypt({ default_key_size: 512 });
    const publicKey = encryptor.getKey().getPublicKey();
    const privateKey = encryptor.getKey().getPrivateKey();

    // Mengatur kunci publik untuk enkripsi
    encryptor.setPublicKey(publicKey);

    // Mengenkripsi teks
    const encrypted = encryptor.encrypt(encryptionText);

    // Menyimpan teks terenkripsi dan kunci privat ke dalam state
    setEncryptionResult(encrypted);
    setPrivateKey(privateKey);
  };

  // Fungsi untuk menangani dekripsi
  const handleDecryption = (e) => {
    e.preventDefault();

    // Inisialisasi dekriptor dengan kunci privat
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);

    // Mendekripsi teks
    const decrypted = decryptor.decrypt(decryptionText);

    // Menyimpan teks yang sudah didekripsi ke dalam state
    setDecryptionResult(decrypted);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form className="row g-3 mx-2" onSubmit={handleEncryption}>
            <label className="form-label" htmlFor="encryption">Enkripsi</label>
            <input
              className="form-control"
              type="text"
              id="encryption"
              name="encryption"
              value={encryptionText}
              onChange={(e) => setEncryptionText(e.target.value)}
            />
            <div className="text-end">
              <button type="submit" className="btn btn-primary">Enkripsi</button>
            </div>
          </form>
          <div className="form-floating mx-2 mt-3">
            <textarea
              className="form-control"
              id="encryptionResult"
              value={encryptionResult}
              readOnly
            ></textarea>
            <label htmlFor="encryptionResult">Hasil Enkripsi</label>
          </div>
        </div>
        <div className="col-md-6">
          <form className="row g-3 mx-2" onSubmit={handleDecryption}>
            <label className="form-label" htmlFor="decryption">Dekripsi</label>
            <div className="form-floating mx-2 mt-3">
              <textarea
                className="form-control"
                id="decryption"
                value={decryptionText}
                onChange={(e) => setDecryptionText(e.target.value)}
              ></textarea>
              <label htmlFor="decryption">Masukkan Teks Terenkripsi</label>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">Dekripsi</button>
            </div>
          </form>
          <div className="form-floating mx-2 mt-3">
            <textarea
              className="form-control"
              id="decryptionResult"
              value={decryptionResult}
              readOnly
            ></textarea>
            <label htmlFor="decryptionResult">Hasil Dekripsi</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
