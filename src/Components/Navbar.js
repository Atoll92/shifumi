import React, { useState } from "react";
import logo from '../Assets/svgs/logo.svg'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="container relative m-auto p-3 flex justify-between items-center">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-4xl font-bold text-sky-800">SHIFUMI</h1>
      </div>
      <nav className={mobileMenuOpen ? ("flex") : (" hidden md:flex")}>
        <ul className="flex bg-white absolute md:relative flex-col md:flex-row w-full shadow md:shadow-none text-center top-28 z-10 left-0 md:top-0 md:flex">
          <li className="px-3 py-2 cursor-pointer rounded hover:text-sky-700" onClick={() => setPage("rules")}>
            The rules
          </li>
          <li className="px-3 py-2 cursor-pointer rounded hover:text-sky-700" onClick={() => setPage("about")}>
            About
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button className="flex justify-center items-center" onClick={toggleMobileMenu}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={mobileMenuOpen ? ("hidden") : ("flex")}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={mobileMenuOpen ? ("flex") : ("hidden")}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <Modal
        open={page === "rules"}
        onClose={() => setPage()}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The rules
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            I think you know the rules, don&lsquo;t you ?
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={page === "about"}
        onClose={() => setPage()}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            My entry for the Play/Makers challenge featuring a Three.js scene for the 3D shifumi game and detailted stats using D3.js and Recharts.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Navbar;