import "./splashAnimation.scss";
import { useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL, LOGO_URL } from "../../requests";
import { motion } from "framer-motion";

const SplashAnimation = () => {
	const history = useHistory();
	const soundRef = useRef(null);

	const playSound = useCallback(() => {
		if (soundRef.current) {
			soundRef.current.currentTime = 0;
			const promise = soundRef.current.play();
			if (promise !== undefined) {
				promise.catch((err) => console.error("Sound playback failed:", err));
			}
		}
	}, []);

	useEffect(() => {
		const timer1 = setTimeout(() => {
			playSound();
		}, 300);

		const timer2 = setTimeout(() => {
			history.push("/browse");
		}, 5700);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [history, playSound]);

	return (
		<motion.div
			id="SplashAnimation__wrp"
			className="SplashAnimation"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<audio ref={soundRef} preload="auto">
				<source src={TADUM_SOUND_URL} type="audio/mpeg" />
			</audio>

			<div className="SplashAnimation__bars">
				<div className="SplashAnimation__bar left" />
				<div className="SplashAnimation__bar right" />
			</div>

			<motion.img
				src={LOGO_URL}
				alt="Mockbuster Logo"
				className="SplashAnimation__logo"
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
			/>
		</motion.div>
	);
};

export default SplashAnimation;