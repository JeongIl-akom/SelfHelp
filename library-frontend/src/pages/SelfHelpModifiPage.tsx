import SelfHelpModifi from "../components/library/SelfHelpModifi";
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";



export default function ModifiPage() {

  const nav = useNavigate();

  return (
    //페이지 구성을 어떻게 잡지 흠...
    /*
      < 이전으로
      상세목록
        수정 / 삭제
    */   

    <div style={{ padding: 20 }}>            
      <Button
        onClick={() => nav(-1)  }>
        ← 이전으로
      </Button>      
      <SelfHelpModifi/>
      <div style={{ padding: 0 }} >
        <Button> 
            수정 
        </Button>      
        <Button>
            삭제
        </Button>
      </div>        
    </div>
  );
}