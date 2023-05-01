import { useEffect, useState } from "react";
import { BaseEntry, Diagnosis } from "../../types"
import patientService from "../../services/patients"

const Base: React.FC<{entry: BaseEntry}> = ({entry}) => {

    const [diagnosisCodes, setdiagnosisCodes] = useState<Diagnosis[]>()

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await patientService.getDiagnosis()
            setdiagnosisCodes(diagnoses)
            };
            void fetchDiagnoses();
    }, [])
    
  return (
    
    <>
        <p>
            <span>{entry.date}</span> {" "}
            <span style={{fontStyle: "italic"}}>{entry.description}</span>
        </p>
        <ul>
            {
                entry.diagnosisCodes?.map(d => {
                    return <li>{`${d} ${diagnosisCodes?.find(ele => ele.code === d)?.name}`}</li>
                })
            }
        </ul>
        <p>Diagnosed By: {entry.specialist}</p> 
    </>
  )
}

export default Base