import { OccupationalHealthcareEntry } from "../../types"
import { style } from "../../utils/style"
import Base from "./Base"
import BadgeIcon from '@mui/icons-material/Badge';

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return (
    <div style={style}>
        <BadgeIcon style={{color: "blueviolet"}}/>
        <Base entry={entry} />
        <p>Employer Name: {entry.employerName}</p>
        {entry.sickLeave && <>
            <p>Sick Leave Start Date: {entry.sickLeave.startDate}</p>
            <p>Sick Leave End Date: {entry.sickLeave.endDate}</p>
        </>}
    </div>
  )
}

export default OccupationalHealthcare