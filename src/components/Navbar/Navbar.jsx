import "./navbar.scss";
import { useState, useRef } from "react";
import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";
import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requests";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { signOutStart } from "../../redux/auth/auth.actions";

const Navbar = () => {
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	const handleSignOut = () => {
		dispatch(signOutStart());
		setProfileNav(false);
	};

	return (
		<>
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<Link to="/browse">
					<img className="Navbar__logo" src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL} alt="Fakeflix logo" />
				</Link>
				{width >= 1024 ? (
					<ul className="Navbar__primarynav Navbar__navlinks">
						<li className="Navbar__navlinks--link">
							<NavLink to="/browse" activeClassName="activeNavLink">
								Home
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/tvseries" activeClassName="activeNavLink">
								TV Series
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/movies" activeClassName="activeNavLink">
								Movies
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/popular" activeClassName="activeNavLink">
								New & Popular
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/mylist" activeClassName="activeNavLink">
								My list
							</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`Navbar__primarynav Navbar__navlinks ${isScrolled && "Navbar__primarynav--scrolled"}`}
					>
						<button
							className="Navbar__navlinks--button"
							onClick={() => setGenresNav(!genresNav)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setGenresNav(!genresNav);
								}
							}}
							type="button"
							aria-expanded={genresNav}
							aria-label="Toggle navigation menu"
						>
							<span className="Navbar__navlinks--link">Discover</span>
							<FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
						</button>
						<div
							className={`Navbar__primarynav--content ${genresNav ? "active" : ""}`}
						>
							{genresNav && (
								<ul
									className="Navbar__primarynav--content-wrp"
									ref={genresNavRef}
								>
									<li className="Navbar__navlinks--link">
										<NavLink to="/browse" activeClassName="activeNavLink">
											Home
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/tvseries" activeClassName="activeNavLink">
											TV Series
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/movies" activeClassName="activeNavLink">
											Movies
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/popular" activeClassName="activeNavLink">
											New & Popular
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/mylist" activeClassName="activeNavLink">
											My list
										</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				<div className="Navbar__secondarynav">
					<div className="Navbar__navitem">
						<Searchbar />
					</div>
					<div className="Navbar__navitem">
						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
						>
							<button
								className="Navbar__navprofile--button"
								onClick={() => setProfileNav(!profileNav)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setProfileNav(!profileNav);
									}
								}}
								type="button"
								aria-expanded={profileNav}
								aria-label="Toggle profile menu"
							>
								<img
									className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
									src={currentUser?.photoURL ?? PROFILE_PIC_URL}
									alt="Account menu"
								/>
								<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							</button>
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{currentUser && (
											<li className="Navbar__navlinks--link">
												<button
													className="Navbar__navprofile--btn"
													onClick={handleSignOut}
													onKeyDown={(e) => {
														if (e.key === 'Enter' || e.key === ' ') {
															handleSignOut();
														}
													}}
													type="button"
												>
													Sign Out
												</button>
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
