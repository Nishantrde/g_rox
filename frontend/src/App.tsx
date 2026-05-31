import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";

function App() {
  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <UploadBox />
      </Container>
    </>
  );
}

export default App;