import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import UploadDocument from "../components/common/UploadDocument";

export default function LibraryUploadPage() {
  const nav = useNavigate()
  return (    
    <div style={{ padding: 4 }}>
      <div>
        <Button style={{marginBottom:0}} onClick={() => nav(-1)}>
          ← 목록으로
        </Button>
      </div>
      <UploadDocument />
    </div>
  );
}