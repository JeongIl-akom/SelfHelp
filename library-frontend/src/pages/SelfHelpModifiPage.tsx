import SelfHelpModifi from '../components/library/SelfHelpModifi';
import mui from '../libs/module';
import { useNavigate } from 'react-router-dom';

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
      <mui.Button onClick={() => nav(-1)}>← 이전으로</mui.Button>
      <SelfHelpModifi />
      <div style={{ padding: 0 }}>
        <mui.Button>수정</mui.Button>
        <mui.Button>삭제</mui.Button>
      </div>
    </div>
  );
}
