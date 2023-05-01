import Alert from '@mui/material/Alert';

interface Props {
    msg: string;
    sts: string;
  }

const Notification = ({msg, sts}: Props) => {
  return (
    sts === "success" ?
    <Alert severity="success" style={{marginBottom: 6}}>{msg}</Alert> : sts === "error" ?
        <Alert severity="error" style={{marginBottom: 6}}>{msg}</Alert> : null
  )
}

export default Notification