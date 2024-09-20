import { createMint } from '@solana/spl-token'
export function TokenLaunchpad() {

    function createToken () {

        const name = document.getElementById("name").value;
        const symbol = document.getElementById("symbol").value;
        const imageUrl = document.getElementById("image").value;
        const initialSupply = document.getElementById("supply").value;

        createMint();
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