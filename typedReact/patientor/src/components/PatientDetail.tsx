import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import patientService from '../services/patients'
import { Patient, Diagnosis } from "../types"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientDetail = () => {
    const [data, setData] = useState<Patient>()
    const [diagnosisCodes, setdiagnosisCodes] = useState<Diagnosis[]>()
    const { id } = useParams()

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await patientService.getDiagnosis()
            setdiagnosisCodes(diagnoses)
            };
            void fetchDiagnoses();
    }, [])

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
                            <>
                                <p>
                                    <span>{e.date}</span> {" "}
                                    <span style={{fontStyle: "italic"}}>{e.description}</span>
                                </p>
                                <ul>
                                    {
                                        e.diagnosisCodes?.map(d => {
                                            return <li>{`${d} ${diagnosisCodes?.find(ele => ele.code === d)?.name}`}</li>
                                        })
                                    }
                                </ul>
                            </>
                        )
                    })
                }
            </div>
        </div> 
        );
}
 
export default PatientDetail;