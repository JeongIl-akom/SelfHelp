import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import mui from '../../libs/module';

interface SelfHelpItem {
  id: number;
  title: string;
  description: string;
  image: string;
  attach_file: string;
  category: string;
  created_at: string;
}

export default function SelfHelpList() {
  const [items, setItems] = useState<SelfHelpItem[]>([]);
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const nav = useNavigate();

  const loadData = () => {
    axios
      .get('http://127.0.0.1:8000/api/selfhelp/', { params: { q } })
      .then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadData();
  }, [q]);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <mui.Container maxWidth={false} sx={{ py: 1, mb: 5 }}>
      {/* 헤더 + 검색 영역 */}
      <mui.Stack spacing={2} sx={{ mb: 5 }}>
        <mui.Typography variant="h5" fontWeight={900}>
          🛠 Q&A
        </mui.Typography>
        <mui.Stack direction="row" spacing={3} sx={{ mb: 5 }}>
          <mui.TextField
            label="🔎 검색어"
            placeholder="접수 오류, 차트 조회 불가 등으로 검색해보세요"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                loadData();
              }
            }}
            size="small"
          />
        </mui.Stack>
      </mui.Stack>

      {/* 카드 리스트 */}
      {items.length === 0 ? (
        <mui.Box sx={{ mt: 4, textAlign: 'center' }}>
          <mui.Typography variant="body2" color="text.secondary">
            검색 결과가 없습니다.
          </mui.Typography>
        </mui.Box>
      ) : (
        <mui.Stack spacing={2}>
          {items.map((item) => (
            <mui.Card
              key={item.id}
              elevation={1}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.1s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={() => handleToggle(item.id)}
            >
              <mui.CardActionArea disableRipple>
                <mui.CardContent>
                  <mui.Chip
                    label={item.category || '공통'}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }} // 이게 여백
                  />
                  <mui.Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <mui.Stack direction="row" spacing={1} alignItems="center">
                      <mui.Typography variant="subtitle1" fontWeight={600}>
                        {item.title}
                      </mui.Typography>
                    </mui.Stack>
                    <mui.Typography variant="caption" color="text.secondary">
                      {dayjs(item.created_at).format('YYYY.MM.DD')}
                    </mui.Typography>
                  </mui.Stack>
                </mui.CardContent>
              </mui.CardActionArea>

              <mui.Collapse
                in={openId === item.id}
                timeout="auto"
                unmountOnExit
              >
                <mui.Divider />
                <mui.CardContent>
                  <mui.Stack spacing={2}>
                    {item.image && (
                      <mui.CardMedia
                        component="img"
                        image={item.image}
                        sx={{
                          width: '100%',
                          height: { xs: 180, md: 260 },
                          objectFit: 'contain', // << 전체이미지 보이기
                          borderRadius: 1,
                          backgroundColor: '#f5f5f5', // 비는 공간이 보이지 않도록 추가
                        }}
                      />
                    )}

                    <mui.Typography
                      variant="body2"
                      sx={{ whiteSpace: 'pre-wrap' }}
                    >
                      {item.description}
                    </mui.Typography>

                    {item.attach_file && (
                      <mui.Box>
                        <a
                          href={item.attach_file}
                          target="_blank"
                          rel="noreferrer"
                        >
                          📎 관련 자료 다운로드
                        </a>
                      </mui.Box>
                    )}
                  </mui.Stack>
                </mui.CardContent>
              </mui.Collapse>
            </mui.Card>
          ))}
        </mui.Stack>
      )}
    </mui.Container>
  );
}
