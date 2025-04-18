import "./splashAnimation.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL, LOGO_URL } from "../../requests";
import { motion, AnimatePresence } from "framer-motion";

const SplashAnimation = () => {
	const history = useHistory();
	const [showAnimation, setShowAnimation] = useState(false);

	useEffect(() => {
		// Create audio element programmatically
		const audio = new Audio(TADUM_SOUND_URL);
		audio.preload = "auto";
		
		// When audio is ready to play
		audio.addEventListener('canplaythrough', () => {
			setShowAnimation(true);
			// Play the sound
			audio.play().catch(err => console.error("Audio play failed:", err));
		});

		// Set a timer for the full animation duration
		const redirectTimer = setTimeout(() => {
			history.push("/browse");
		}, 5700);

		return () => {
			clearTimeout(redirectTimer);
			audio.removeEventListener('canplaythrough', () => {});
		};
	}, [history]);

	return (
		<div className="SplashAnimation__container">
			<AnimatePresence>
				{showAnimation && (
					<motion.div
						id="SplashAnimation__wrp"
						className="SplashAnimation"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="SplashAnimation__glow" />
						<div className="SplashAnimation__bars">
							<div className="SplashAnimation__bar left" />
							<div className="SplashAnimation__bar right" />
						</div>
						<img
							src={LOGO_URL}
							alt="Mockbuster Logo"
							className="SplashAnimation__logo"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SplashAnimation;