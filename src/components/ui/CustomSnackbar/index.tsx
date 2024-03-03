import { Snackbar, Alert, Slide } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  message: string;
};

const CustomSnackbar = ({ open, handleClose, message }: Props) => {
  function TransitionLeft(props: any) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
          severity="success"
          variant="filled"
          sx={{ width: "330px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CustomSnackbar;
