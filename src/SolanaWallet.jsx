import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export function getSolanaPrivateKey(mnemonic) {
  const seed = mnemonicToSeedSync(mnemonic);
  const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);
  const privateKeyOnly = keypair.secretKey.slice(0, 32);
  return Buffer.from(privateKeyOnly).toString('hex');
}

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  function addWallet() {
    if (!mnemonic) {
      alert('Please create a seed phrase first.');
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);  // ✅ correct

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
    console.log(keypair);
  }

  return (
    <div>
      <button onClick={addWallet} className="create-btn">
        ➕ Add Wallet
      </button>
      {publicKeys.map((p, idx) => (
        <div key={idx}>
          {p.toBase58()}
        </div>
      ))}
    </div>
  );
}