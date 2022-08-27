import React, { useMemo } from "react";
// wallet-adapter-network is just an enumerable object for the available networks.
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// WalletModalProvider is a fancy React component that will prompt the user to select their wallet.
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// ConnectionProvider takes an RPC endpoint in and lets us talk directly to the nodes on the Solana blockchain
// WalletProvider gives us a standard interface for connecting to all sorts of wallets, so we don't have to bother reading docs for each wallet.
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
// clusterApiURL is just a function that generates an RPC endpoint for us based on the network we give it.
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <Component {...pageProps} />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
