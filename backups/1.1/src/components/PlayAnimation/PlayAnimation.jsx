import "./playAnimation.scss";
import { useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL } from "../../requests";

const PlayAnimation = () => {
	const history = useHistory();
	const soundRef = useRef(null);

	const handleTadum = useCallback(() => {
		if (soundRef.current) {
			soundRef.current.currentTime = 0;
			soundRef.current.play();
		}
	}, []);

	useEffect(() => {
		handleTadum();
		const timeout = setTimeout(() => {
			history.push("/browse");
		}, 4200);

		return () => clearTimeout(timeout); // cleanup just in case
	}, [history, handleTadum]);

	return (
		<div className="PlayAnimation__wrp">
			<audio ref={soundRef} src={TADUM_SOUND_URL} preload="auto" />
			<div className="PlayAnimation__text">
				MOCKBUSTER
			</div>
		</div>
	);
};

export default PlayAnimation;