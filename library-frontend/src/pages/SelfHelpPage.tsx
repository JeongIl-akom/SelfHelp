import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import SelfHelpList from "../components/library/SelfHelpList";

export default function SelfHelpPage() {
  const nav = useNavigate();
  return (    
    <div style={{ padding: 0 }}>        
      <SelfHelpList />      
      <div style={{marginTop:16, textAlign: "right"}}>
        <Button style={{ backgroundColor: "#01499a",borderColor: "#01499a",color: "#fff",margin:"6px"}} 
                  onClick={() => nav("/selfhelp/upload") }>
          등록
        </Button>        
        <Button style={{ backgroundColor: "#b11116",borderColor: "#b11116",color: "#fff",}}
                onClick={() => nav("/selfhelp/modifi")}>          
          수정/삭제
        </Button>
      </div>
    </div>            
  );
}