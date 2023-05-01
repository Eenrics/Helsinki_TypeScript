import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import patientService from '../services/patients'
import { Patient } from "../types"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetail from "./EntryDetail";

const PatientDetail = () => {
    const [data, setData] = useState<Patient>()
    const { id } = useParams()

    useEffect(() => {
        if (id !== undefined) {
            const fetchPatient = async () => {
                const result = await patientService.getOne(id)
                setData(result)
              };
              void fetchPatient();
        }
    }, [id])

    if (!data && typeof data !== 'object') return <p>Invalid URI</p>

    return ( 
        <div>
            <span style={{display: 'flex'}}>
            <h2>{data.name}</h2>
            <span style={{margin: 20}}>
            {
                data.gender === "male" ? <MaleIcon /> : <FemaleIcon />
            }
            </span>
            </span>
            <p>ssn: {data.ssn}</p>
            <p>occupation: {data.occupation}</p>
            <div>
                <h3>entries</h3>
                {
                    data.entries.map(e => {
                        return (
                            <EntryDetail entry={e} />
                        )
                    })
                }
            </div>
        </div> 
        );
}
 
export default PatientDetail;