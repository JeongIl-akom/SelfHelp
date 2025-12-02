import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

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
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const nav = useNavigate();

  const loadData = () => {
    axios
      .get("http://127.0.0.1:8000/api/selfhelp/", { params: { q } })
      .then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadData();
  }, [q]);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Container maxWidth="md" sx={{ py: 1, mb :5 }}>
      {/* 헤더 + 검색 영역 */}
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={900}>
          🛠 Q&A / 셀프 헬프
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mb: 5 }}>
            <TextField
          label="🔎 검색어" //여기에 돋보기 넣어보고싶은데..
          placeholder="접수 오류, 차트 조회 불가 등으로 검색해보세요"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loadData();
            }
          }}
          size="small"
          fullWidth
        />      
        </Stack>
      </Stack>

      {/* 카드 리스트 */}
      {items.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            검색 결과가 없습니다.
          </Typography>
        </Box>
      ) : (  
      <Stack spacing={2}>
        {items.map((item) => (
          <Card
            key={item.id}
            elevation={1}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              transition: "box-shadow 0.2s, transform 0.1s",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
            }}
            onClick={() => handleToggle(item.id)}
          >
            <CardActionArea disableRipple>
              <CardContent>                                                                      
                    <Chip
                      label={item.category || "공통"}
                      size="small"
                      variant="outlined"
                      sx={{ mb: 1 }} // 이게 여백
                    />                         
                <Stack direction="row" justifyContent="space-between" alignItems="center">                                    
                  <Stack direction="row" spacing={1} alignItems="center">                    
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title}
                    </Typography>                    
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                      {dayjs(item.created_at).format("YYYY.MM.DD")}
                    </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>

            <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  {item.image && (
                    <CardMedia
                      component="img"
                      image={item.image}
                      sx={{
                        maxHeight: 400,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                  )}

                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap" }}
                  >
                    {item.description}
                  </Typography>

                  {item.attach_file && (
                    <Box>
                      <a href={item.attach_file} target="_blank" rel="noreferrer">
                        📎 관련 자료 다운로드
                      </a>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Stack>
      )}
    </Container>
  );
}
