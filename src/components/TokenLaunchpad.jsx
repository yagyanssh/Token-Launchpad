import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptAccount, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';



export function TokenLaunchpad() {

    const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken () {
        const name = document.getElementById("name").value;
        const symbol = document.getElementById("symbol").value;
        const imageUrl = document.getElementById("image").value;
        const initialSupply = document.getElementById("supply").value;

        // createMint();
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, TOKEN_PROGRAM_ID)
        );
        
        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;
        transaction.partialSign(mintKeypair);

        let response = await wallet.sendTransaction(transaction, connection);
        console.log(response);

    }

    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className="inputText" type="text" placeholder="Name" /> <br />
        <input id="symbol" className="inputText" type="text" placeholder="Symbot" /> <br />
        <input id="image" className="inputText" type="text" placeholder="ImageURL" /> <br />
        <input id="supply" className="inputText" type="text" placeholder="Initial Supply" /> <br />
        <button onClick={createToken} className="btn">Create a Token</button>
    </div>
}