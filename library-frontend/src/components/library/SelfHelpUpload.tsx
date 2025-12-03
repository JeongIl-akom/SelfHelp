import React, { useState } from 'react';
import axios from 'axios';
import mui from '../../libs/module';

export default function SelfHelpUpload() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImage(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const onSubmit = async () => {
    if (!title.trim()) {
      showSnackbar('제목은 필수입니다.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('category', category);
    if (image) formData.append('image', image);
    if (file) formData.append('attach_file', file);

    try {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/selfhelp/upload/', formData);

      showSnackbar('SelfHelp 항목 등록 완료 ✨', 'success');

      setTitle('');
      setDesc('');
      setCategory('');
      setImage(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      showSnackbar('업로드 실패!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <mui.Container maxWidth={false} sx={{ py: 4 }}>
      <mui.Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <mui.CardContent>
          <mui.Typography variant="h6" fontWeight={600} gutterBottom>
            📝 게시판 항목 등록
          </mui.Typography>

          <mui.Stack spacing={2} sx={{ mt: 1 }}>
            {/* 제목 */}
            <mui.TextField
              label="제목"
              placeholder="예) 접수 오류 발생 시 조치 방법"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size="small"
            />

            {/* 설명 */}
            <mui.TextField
              label="설명"
              placeholder="내용을 입력해주세요"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
              multiline
              minRows={4}
            />

            {/* 카테고리 */}
            <mui.TextField
              label="카테고리"
              placeholder="예) 접수 / 진료 / 수납 등"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              size="small"
            />

            {/* 이미지 업로드 */}
            <mui.Box>
              <mui.Button variant="outlined" component="label" size="small">
                🖼 이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </mui.Button>
              {image && (
                <mui.Typography variant="caption" sx={{ ml: 1 }}>
                  {image.name}
                </mui.Typography>
              )}
            </mui.Box>

            {/* 첨부파일 업로드 */}
            <mui.Box>
              <mui.Button variant="outlined" component="label" size="small">
                📎 첨부파일 선택
                <input type="file" hidden onChange={handleFileChange} />
              </mui.Button>
              {file && (
                <mui.Typography variant="caption" sx={{ ml: 1 }}>
                  {file.name}
                </mui.Typography>
              )}
            </mui.Box>

            {/* 등록 버튼 */}
            <mui.Box textAlign="right" sx={{ mt: 1 }}>
              <mui.Button
                variant="contained"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록하기'}
              </mui.Button>
            </mui.Box>
          </mui.Stack>
        </mui.CardContent>
      </mui.Card>

      {/* MUI 스낵바 알림 */}
      <mui.Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <mui.Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </mui.Alert>
      </mui.Snackbar>
    </mui.Container>
  );
}
