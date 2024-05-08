import { Snackbar, Alert, Slide } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  message: any;
};

const WarningSnackbar = ({ open, handleClose, message }: Props) => {
  function TransitionLeft(props: any) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{
          marginTop: "0px",
        }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "330px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default WarningSnackbar;
