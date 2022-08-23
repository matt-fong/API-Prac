import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotDetails = () => {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);

  return (
    <div>
      {spot.name}
    </div>
  )
}

export default SpotDetails;
