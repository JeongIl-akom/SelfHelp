import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

//이거는 수정페이지임!
export default function SelfHelpModifi() {
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

  return (
    <mui.Stack>
      <mui.CardActionArea>
        <mui.CardContent>
          <mui.Chip label="id 받아서 여기다가 넣어주면 되낭"></mui.Chip>
        </mui.CardContent>
      </mui.CardActionArea>
    </mui.Stack>
  );
}
