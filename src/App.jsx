// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import { TokenLaunchpad } from './TokenLaunchpad'

function App() {


  return (
    <>
      <div>
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton />
              <TokenLaunchpad />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>

    </>
  )
}

export default App
