import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from './pages/TVSeries/TVSeries';
import Popular from "./pages/Popular/Popular";
import MyList from './pages/MyList/MyList';
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Category from "./pages/Category/Category";
import DetailModal from "./components/DetailModal/DetailModal";
import SplashAnimation from "./components/SplashAnimation/SplashAnimation";
import PlayAnimation from "./components/PlayAnimation/PlayAnimation";
import { selectCurrentUser } from './redux/auth/auth.selectors';
import { selectSearchResults } from "./redux/search/search.selectors";
import { checkUserSession } from "./redux/auth/auth.actions";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector(selectCurrentUser);
    const searchResults = useSelector(selectSearchResults);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkUserSession());
            setIsLoading(false);
        };
        checkAuth();
    }, [dispatch]);

    // Show nothing until auth is checked
    if (isLoading) {
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

    // If user is logged in and on login page, redirect to splash
    if (currentUser && location.pathname === '/login') {
        return <Redirect to="/splash" />;
    }

    return (
        <div className="App">
            {currentUser && (
                <>
                    <Navbar />
                    <DetailModal />
                </>
            )}
            <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                    <Route
                        exact
                        path="/"
                    >
                        <Redirect to={currentUser ? "/splash" : "/login"} />
                    </Route>
                    <Route
                        path="/splash"
                        component={SplashAnimation}
                    />
                    <Route
                        path="/play"
                        component={PlayAnimation}
                    />
                    <Route
                        path="/search"
                        render={() => currentUser
                            ? (searchResults && <Search results={searchResults}/>)
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/browse"
                        render={() => currentUser
                            ? <Homepage />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/browse/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/tvseries"
                        render={() => currentUser ? <TVSeries /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/tvseries/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/movies"
                        render={() => currentUser ? <Movies /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/movies/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/popular"
                        render={() => currentUser ? <Popular /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/popular/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/mylist"
                        render={() => currentUser ? <MyList /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => currentUser ? <Redirect to="/splash"/> : <Auth />}
                    />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default App;
