import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function UploadBox() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    setFiles(Array.from(event.target.files));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Documents
      </Typography>

      <Box
        sx={{
          border: "2px dashed #1976d2",
          borderRadius: 2,
          p: 6,
          textAlign: "center",
          mb: 3
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 60 }} />

        <Typography sx={{ mt: 2 }}>
          Drag & Drop Files Here
        </Typography>

        <Typography variant="body2">
          or
        </Typography>

        <Button
          component="label"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Select Files

          <input
            hidden
            multiple
            type="file"
            onChange={handleFileChange}
          />
        </Button>
      </Box>

      {files.length > 0 && (
        <>
          <Typography variant="h6">
            Selected Files
          </Typography>

          {files.map((file) => (
            <Typography key={file.name}>
              • {file.name}
            </Typography>
          ))}
        </>
      )}
    </Paper>
  );
}