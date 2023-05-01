import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import patientService from '../services/patients'
import { EntryWithoutId, Patient } from "../types"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetail from "./EntryDetail";
import AddEntryForm from "./EntryDetail/AddEntryForm";
import Notification from "./Notification";
import { Button } from '@mui/material';

const PatientDetail = () => {
    const [data, setData] = useState<Patient>()
    const [not, setNot] = useState<string>('')
    const [notSts, setNotSts] = useState<string>('')
    const [showform, setShowform] = useState<boolean>(false)

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

    const check = (values: EntryWithoutId) => {
            if (values.type === undefined) throw new Error('Invalid Type')
            if (values.date === '') throw new Error('Invalid Date')
            if (values.description === '') throw new Error('Invalid Description')
            if (values.specialist === '') throw new Error('Invalid Specialist')
            if (values.type === 'Hospital') {
                if (values.discharge === undefined || values.discharge === null) throw new Error('Invalid Discharge')
                if (values.discharge.date === '') throw new Error('Invalid Discharge Date')
                if (values.discharge.criteria === '') throw new Error('Invalid Discharge Criteria')
            }
            if (values.type === 'OccupationalHealthcare') {
                if (values.employerName === '') throw new Error('Invalid Employer Name')
                if (values.sickLeave === undefined || values.sickLeave === null) throw new Error('Invalid Sick Leave')
                if (values.sickLeave.startDate === '') throw new Error('Invalid Sick Leave Start Date')
                if (values.sickLeave.endDate === '') throw new Error('Invalid Sick Leave End Date')
            }
            if (values.type === 'HealthCheck') {
                if (values.healthCheckRating === null || values.healthCheckRating === undefined) throw new Error('Invalid Health Check Rating')
                if (values.healthCheckRating < 0 || values.healthCheckRating > 3) throw new Error('Invalid Health Check Rating')
            }
    }


    const submitForm = async (values: EntryWithoutId) => {
        if (id === undefined) throw new Error('Invalid URI')
        try {
            check(values)
            const result = await patientService.addEntry(id, values)
            setData({...data, entries: data.entries.concat(result)})
            setNot('Entry Added')
            setNotSts('success')
            setTimeout(() => {
                setNot('')
                setNotSts('')
            }, 5000)
            setShowform(false)
        } catch (error) {
            if (error instanceof Error) {
                if ("response" in error && error.response && typeof error.response === 'object' && "data" in error.response && typeof error.response.data === 'string') {
                    console.log(error.response.data)
                    setNot(error.response.data)
                    setNotSts('error')
                    setTimeout(() => {
                        setNot('')
                        setNotSts('')
                    }, 5000)
                } else {
                    setNot(error.message)
                    setNotSts('error')
                    setTimeout(() => {
                        setNot('')
                        setNotSts('')
                    }, 5000)
                }
            }
        }
    }

    const cancelForm = async () => {
        setShowform(false)
    }

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
            <Notification msg={not} sts={notSts} />
            { !showform ?
                <><Button
                    variant="contained"
                    style={{ float: "left", backgroundColor: "green" }}
                    type="button"
                    onClick={() => setShowform(true)}
                > Add New Entry </Button> <br/></>:
                <AddEntryForm onSubmit={submitForm} onCancel={cancelForm}/>
            }
            <div>
                <h3>entries</h3>
                {
                    data.entries.map(e => {
                        return (
                            <EntryDetail entry={e} key={e.id} />
                        )
                    })
                }
            </div>
        </div> 
        );
}
 
export default PatientDetail;