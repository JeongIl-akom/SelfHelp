import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "antd";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  category: { id: number; name: string } | null;
  file: string;
  created_at: string;
}

export default function LibraryDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doc, setDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    axios
      .get<DocumentItem>(`http://127.0.0.1:8000/api/library/${id}/`)
      .then((res) => setDoc(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!doc) return <div style={{ padding: 20 }}>로딩중...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => nav(-1)} style={{ marginBottom: 12 }}>
        ← 목록으로
      </Button>

      <Card title={doc.title}>
        <div style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
          {doc.description || "설명 없음"}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href={doc.file} target="_blank">
            📎 파일 다운로드
          </a>
        </div>

        <div style={{ marginTop: 12, color: "#888" }}>
          카테고리: {doc.category?.name || "-"} / 등록일:{" "}
          {new Date(doc.created_at).toLocaleString()}
        </div>
      </Card>
    </div>
  );
}
