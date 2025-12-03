import { useNavigate } from 'react-router-dom';
import mui from '../libs/module';
import SelfHelpUpload from '../components/library/SelfHelpUpload';

export default function SelfHelpUploadPage() {
  const nav = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <mui.Button onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
        ← 목록으로
      </mui.Button>
      <div>
        <SelfHelpUpload />
      </div>
    </div>
  );
}
