import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card } from "antd";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  category: { id: number; name: string };
  file: string;
  created_at: string;
}

export default function LibraryList() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/library/")
      .then((res) => setDocs(res.data));
  }, []);

  const columns = [
    { title: "제목", dataIndex: "title" },
    { title: "카테고리", dataIndex: ["category", "name"] },
    { title: "등록일", dataIndex: "created_at",
      render: (v: string) => new Date(v).toLocaleString()
    },
    { title: "다운로드",
      render: (_: any, record: DocumentItem) =>
        <a href={record.file} target="_blank">다운로드</a>
    },
  ];

  return (
    <Card title="📁 자료실">
      <Table
        dataSource={docs}
        
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
}
