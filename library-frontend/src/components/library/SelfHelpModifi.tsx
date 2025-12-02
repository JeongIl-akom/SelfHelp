import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Stack, Chip, CardActionArea, CardContent, Button } from "@mui/material";

//이거는 수정페이지임!
export default function SelfHelpModifi() {
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

    return (
        <Stack>
            <CardActionArea>
                <CardContent>
                    <Chip
                    label="이제 여기에 목록이 뜨는거임">
                    </Chip>                                  
                </CardContent>                
            </CardActionArea>            
        </Stack>
    )    
}
