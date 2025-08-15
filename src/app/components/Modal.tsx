import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type ChildProps = {
  title: string;
  contents: string;
  btnTxt: string;
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

export const BasicModal: React.FC<ChildProps> = ({
  title,
  contents,
  btnTxt,
  isOpen,
  setIsOpen,
}) => {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {contents}
          </Typography>
          <Button onClick={handleClose}>{btnTxt}</Button>
        </Box>
      </Modal>
    </div>
  );
};
