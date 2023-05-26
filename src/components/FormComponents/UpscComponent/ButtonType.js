import React from 'react'
import { Button , Modal} from "@mui/material";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
function ButtonType({
    values,
    setValues,
    loading,
    handleSubmitClick,
    validateForm,
    errors,
    setTouched,
    handlePostData,
    handleOpen,
    open, 
    handleClose,
    style,
    handleReset
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",

        paddingLeft: "0px",
        paddingRight: "0px",
      }}
      className={` p-5 mt--1 `}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          style={{
            textTransform: "none",
            backgroundColor: "#E33900",
          }}
          variant="contained"
          onClick={async () => {
            handleSubmitClick();

            const isValid = await validateForm();

            if (Object.keys(isValid).length > 0) {
              const err = Object.keys(isValid);

              if (err.length) {
                const input = document.querySelector(
                  `label[for=${`${err[0]}`}]`
                );

                input.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "start",
                });
              }
              for (let key in isValid) {
                let newerrors = errors;

                newerrors[key] = isValid[key];
              }

              const touchedFields = {};
              Object.keys(errors).forEach((fieldName) => {
                touchedFields[fieldName] = true;
              });
              setTouched(touchedFields);
            } else {
              handlePostData(values, setValues);
            }
          }}
        >
          Submit
        </Button>
      )}

      <Button
        style={{
          textTransform: "none",
          color: "#E33900",
        }}
        variant="text"
        onClick={handleOpen}
      >
        Clear Form
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              fontWeight: "570",
            }}
          >
            Clear Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This will remove your answers from all questions, and cannot be
            undone.
          </Typography>

          <div
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              style={{
                marginRight: "6%",
                color: "#5b5b5b",
                textTransform: "none",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              style={{
                color: "#5b5b5b",
                textTransform: "none",
              }}
              onClick={handleReset}
            >
              Clear Form
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ButtonType