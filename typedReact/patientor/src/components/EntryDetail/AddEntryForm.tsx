import { useState } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import { EntryWithoutId } from "../../types";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
  }

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {

    const theme = useTheme();

    const [type, setType] = useState<string>('OccupationalHealthcare')
    const [description, setDiscription] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [specialist, setSpecialist] = useState<string>('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0)
    const [dischargeDate, setDischargeDate] = useState<string>('')
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('')
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('')
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('')
    const [employerName, setEmployerName] = useState<string>('')

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        switch (type) {
            case "OccupationalHealthcare":
                onSubmit({
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                })
                break;
            case "Hospital":
                onSubmit({
                    type,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                })
                break;
            case "HealthCheck":
                if (healthCheckRating !== null) {
                    onSubmit({
                        type,
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        healthCheckRating
                    })
                }
                break;
            default:
                break;
        }
    }

    const typeOptions: string[] = ["OccupationalHealthcare", "Hospital", "HealthCheck"]
    const diagnosisCodeOptions: string[] = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", "Z74.3", "L20", "F43.2", "S62.5", "H35.29"]

    const ontypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          if (typeOptions.includes(value)) {
            setType(value);
          }
        }
      };
    const ondiagnosisCodeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value[0] === "string") {
            const {
                target: { value },
              } = event;
              setDiagnosisCodes(diagnosisCodes.concat(value));
        }
      };


  return (
    <div style={{padding: 5, paddingBottom: 50, borderWidth: 4, borderColor: "black", borderStyle: "dashed", borderRadius: 10}}>
        <h3>New {type} entry</h3>
        <form onSubmit={addEntry}>

        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          style={{marginBottom: 10}}
          label="Type"
          fullWidth
          value={type}
          onChange={ontypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option
          }</MenuItem>
        )}
        </Select>

        <TextField
          style={{marginBottom: 10}}
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDiscription(target.value)}
        />
        <InputLabel>Date</InputLabel>
        <TextField
          style={{marginBottom: 10}}
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          style={{marginBottom: 10}}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id="diagnosiscode">Diagnosis Codes</InputLabel>
        <Select
          style={{marginBottom: 10}}
          labelId="diagnosiscode"
          id="multiple-name"
          multiple
          fullWidth
          // @ts-ignore
          value={diagnosisCodes as string[]}
          onChange={ondiagnosisCodeChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {diagnosisCodeOptions.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, diagnosisCodeOptions, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
        {type === "HealthCheck" && <>
        <TextField
          style={{marginBottom: 10}}
          label="Health Checking Rate"
          fullWidth
          type="number"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
        />
        </>}
        {type === "Hospital" && <>
        <InputLabel>Discharge Date</InputLabel>
        <TextField
          style={{marginBottom: 10}}
          fullWidth
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          style={{marginBottom: 10}}
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        </>}
        {type === "OccupationalHealthcare" && <>
        <InputLabel>Sick Leave Start Date</InputLabel>
        <TextField
          style={{marginBottom: 10}}
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <InputLabel>Sick Leave End Date</InputLabel>
        <TextField
          style={{marginBottom: 10}}
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
        <TextField
          style={{marginBottom: 10}}
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        </>}


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddEntryForm