import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mui from '../libs/module';

interface SelfHelpItem {
  id: number;
  title: string;
  description: string;
  image: string;
  attach_file: string;
  category: string;
  created_at: string;
}

export default function SelfHelpDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<SelfHelpItem | null>(null);

  useEffect(() => {
    axios
      .get<SelfHelpItem>(`http://127.0.0.1:8000/api/selfhelp/${id}/`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!item) return <div style={{ padding: 20 }}>로딩중...</div>;

  return (
    <div style={{ padding: 20 }}>
      <mui.Button onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
        ← 목록으로
      </mui.Button>

      <mui.Card title={item.title}>
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }}
          />
        )}

        <div style={{ whiteSpace: 'pre-wrap', fontSize: 15 }}>
          {item.description}
        </div>

        {item.attach_file && (
          <div style={{ marginTop: 16 }}>
            <a href={item.attach_file} target="_blank">
              📎 관련 자료 다운로드
            </a>
          </div>
        )}

        <div style={{ marginTop: 12, color: '#888' }}>
          카테고리: {item.category || '-'} / 등록일:{' '}
          {new Date(item.created_at).toLocaleString()}
        </div>
      </mui.Card>
    </div>
  );
}
