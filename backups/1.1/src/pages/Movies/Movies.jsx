import "./movies.scss"
import Banner from "../../components/Banner/Banner"
import Row from "../../components/Row/Row"
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";

const Movies = () => {
    const rows = useRetrieveData('movies');

    return (
        <motion.div
            className="Movies"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Banner type='movies' />
            {rows?.map(props => (
                <Row key={props.id} {...props} />
            ))}
        </motion.div>
    )
}

export default Movies
