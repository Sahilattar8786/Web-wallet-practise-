import { useState } from 'react';
import { generateMnemonic } from "bip39";
import './App.css';
import { getSolanaPrivateKey, SolanaWallet } from './SolanaWallet';
import { EthWallet } from './ ETHwallet';

export default function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  async function handleCreateSeed() {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    setShowModal(true);
    setShowPrivateKey(false); // Hide private key initially
  }

  return (
    <>
     <input type="text" value={mnemonic} />
      <button onClick={handleCreateSeed} className="create-btn">
        Create Seed Phrase
      </button>
   
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🪙 Your Seed Phrase</h2>
            <p className="mnemonic">{mnemonic}</p>

            {showPrivateKey ? (
              <p className="private-key">🔐 Private Key:{getSolanaPrivateKey(mnemonic)}</p>
            ) : (
              <button onClick={() => setShowPrivateKey(true)} className="private-btn">
                Show Private Key 
              </button>
            )}

            <button onClick={() => setShowModal(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Your Wallets */}
      <SolanaWallet mnemonic ={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </>
  );
}