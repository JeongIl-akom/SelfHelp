import { useState } from "react";
import axios from "axios";
import { Button, Input, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function UploadDocument() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      message.error("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("file", file);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/library/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      message.success("업로드 완료!");
      setTitle("");
      setDesc("");
      setFile(null);
    } catch {
      message.error("업로드 실패!");
    }
  };

  return (
    <Card title="📤 자료 업로드" style={{ marginBottom: 20 }}>
      <Input
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Input.TextArea
        placeholder="설명 입력"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ marginBottom: 10 }}
        rows={3}
      />

      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false; // 자동 업로드 방지
        }}
        maxCount={1}
      >
        
        <Button icon={<UploadOutlined />}>파일 선택</Button>
      </Upload>

      <Button
        type="primary"
        style={{ marginTop: 15 }}
        onClick={handleUpload}
      >
        업로드
      </Button>
    </Card>
  );
}
