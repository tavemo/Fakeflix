import "./rowPoster.scss";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";

const RowPoster = result => {
	const { item, item: { title, original_name, original_title, name, genre_ids, poster_path, backdrop_path }, isLarge, isFavourite } = result;
	const fallbackTitle = title || original_title || name || original_name;
	const genresConverted = useGenreConversion(genre_ids);
	const dispatch = useDispatch();

	const handleAdd = event => {
		event.stopPropagation();
		dispatch(addToFavourites({ ...item, isFavourite }));
	};
	const handleRemove = event => {
		event.stopPropagation();
		dispatch(removeFromFavourites({ ...item, isFavourite }));
	};
	const handleModalOpening = event => {
		event.stopPropagation();
		dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
	}
	const handlePlayAction = event => {
		event.stopPropagation();
	};

	const handleKeyDown = (event, handler) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handler(event);
		}
	};

	const renderImage = () => {
		if (isLarge) {
			return poster_path ? (
				<img src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} onError={(e) => {
					e.target.onerror = null;
					e.target.src = FALLBACK_IMG_URL;
				}} />
			) : (
				<>
					<img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
					<div className="Row__poster__fallback">
						<span>{fallbackTitle}</span>
					</div>
				</>
			);
		}
		return backdrop_path ? (
			<img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} onError={(e) => {
				e.target.onerror = null;
				e.target.src = FALLBACK_IMG_URL;
			}} />
		) : (
			<>
				<img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
				<div className="Row__poster__fallback">
					<span>{fallbackTitle}</span>
				</div>
			</>
		);
	};

	return (
		<button
			type="button"
			className={`Row__poster ${isLarge && "Row__poster--big"}`}
			onClick={handleModalOpening}
			onKeyDown={(e) => handleKeyDown(e, handleModalOpening)}
		>
			{renderImage()}
			<div className="Row__poster-info">
				<div className="Row__poster-info--iconswrp">
					<Link
						className="Row__poster-info--icon icon--play"
						onClick={handlePlayAction}
						onKeyDown={(e) => handleKeyDown(e, handlePlayAction)}
						to={'/play'}
						tabIndex={0}
					>
						<FaPlay />
					</Link>
					{!isFavourite
						? (
							<button 
								type="button" 
								className='Row__poster-info--icon icon--favourite' 
								onClick={handleAdd}
								onKeyDown={(e) => handleKeyDown(e, handleAdd)}
								tabIndex={0}
							>
								<FaPlus />
							</button>
						): (
							<button 
								type="button" 
								className='Row__poster-info--icon icon--favourite' 
								onClick={handleRemove}
								onKeyDown={(e) => handleKeyDown(e, handleRemove)}
								tabIndex={0}
							>
								<FaMinus />
							</button>
						)}
					<button 
						type="button" 
						className='Row__poster-info--icon icon--toggleModal'
						onClick={handleModalOpening}
						onKeyDown={(e) => handleKeyDown(e, handleModalOpening)}
						tabIndex={0}
					>
						<FaChevronDown />
					</button>
				</div>
				<div className="Row__poster-info--title">
					<h3>{fallbackTitle}</h3>
				</div>
				<div className="Row__poster-info--genres">
					{genresConverted?.map(genre => (
						<span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
					))}
				</div>
			</div>
		</button>
	);
};

export default RowPoster;