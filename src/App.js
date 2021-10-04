import { useState, useEffect } from 'react';
import AppAuthenticated from './components/AppAuthenticated';

const Web3 = require("web3");

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState("Waiting for connection with wallet...");

  useEffect(() => {
    const connectWallet = async () => {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        setInstruction("");
      } catch (error) {
        setInstruction("Wallet connection denied, reload the page to try again.");
        return;
      }
      setWalletConnected(true);
    };
    connectWallet();
  }, []);

  return (<>
    {window.ethereum ?
      (walletConnected ?
        <AppAuthenticated />
        : instruction)
      : "Metamask or other EIP-1102 / EIP-1193 compliant wallet not found."
    }
  </>);
}

export default App;
