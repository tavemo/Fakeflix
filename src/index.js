import "./index.scss"
import App from "./App"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"

const Root = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Wait for store to be hydrated and DOM to be ready
        const checkReady = () => {
            if (document.readyState === 'complete') {
                // Small delay to ensure everything is properly initialized
                setTimeout(() => {
                    setIsReady(true);
                }, 50);
            }
        };

        if (document.readyState === 'complete') {
            checkReady();
        } else {
            window.addEventListener('load', checkReady);
            return () => window.removeEventListener('load', checkReady);
        }
    }, []);

    if (!isReady) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: 9999
            }} />
        );
    }

    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));