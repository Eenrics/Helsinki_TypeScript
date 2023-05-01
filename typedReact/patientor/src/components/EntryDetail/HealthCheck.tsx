import { HealthCheckEntry, HealthCheckRating } from "../../types"
import { style } from "../../utils/style"
import Base from "./Base"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const rate = (e: HealthCheckRating) => {
  switch(e) {
    case 0:
      return "green"
    case 1:
      return "yellow"
    case 2:
      return "orange"
    case 3:
      return "red"
    default:
      throw new Error("Invalid Health Check Rate")
  }
}

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  return (
    <div style={style}>
        <MedicalServicesIcon  style={{color: "orangered"}}/>
        <Base entry={entry} />
        <p>Health Check Rating: <FavoriteIcon style={{fontSize: 18, color: rate(entry.healthCheckRating)}}/></p>
    </div>
  )
}

export default HealthCheck