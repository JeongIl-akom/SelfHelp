
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"
import SelfHelpUpload from "../components/library/SelfHelpUpload";

export default function SelfHelpUploadPage() {
  const nav = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
        ← 목록으로
        </Button>
        <div>
          <SelfHelpUpload />      
        </div>      
    </div>
  );
}
