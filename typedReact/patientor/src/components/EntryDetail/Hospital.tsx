import { HospitalEntry } from "../../types"
import { style } from "../../utils/style"
import Base from "./Base"
import VaccinesIcon from '@mui/icons-material/Vaccines';

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return (
    <div style={style}>
        <VaccinesIcon style={{color: "green"}} />
        <Base entry={entry} />
        <p>Discharge Date: {entry.discharge.date}</p>
        <p>Discharge Criteria: {entry.discharge.criteria}</p>
    </div>
  )
}

export default Hospital