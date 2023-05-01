import { Entry } from "../../types"
import { assertNever } from "../../utils"
import Hospital from "./Hospital"
import OccupationalHealthcare from "./OccupationalHealthcare"
import HealthCheck from "./HealthCheck"

const EntryDetail: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "Hospital":
        return <Hospital entry={entry}/>
    case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry}/>
    case "HealthCheck":
        return <HealthCheck entry={entry}/>
    default:
        return assertNever(entry)
  }
}

export default EntryDetail