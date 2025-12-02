import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/selfhelp/Layout";

import SelfHelpPage from "./pages/SelfHelpPage";
import SelfHelpUploadPage from "./pages/SelfHelpUploadPage";
import LibraryPage from "./pages/LibraryPage";
import LibraryUploadPage from "./pages/LibraryUploadPage";

import SelfHelpDetailPage from "./pages/SelfHelpDetailPage";
import LibraryDetailPage from "./pages/LibraryDetailPage.tsx";
import SelfHelpModifiPage from "./pages/SelfHelpModifiPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 레이아웃 아래에 페이지들을 넣을거임 */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/selfhelp" replace />} />

          <Route path="/selfhelp" element={<SelfHelpPage />} />
          <Route path="/selfhelp/upload" element={<SelfHelpUploadPage />} />
          <Route path="/selfhelp/modifi" element={<SelfHelpModifiPage />} />

          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/upload" element={<LibraryUploadPage />} />

          <Route path="/selfhelp/:id" element={<SelfHelpDetailPage />} />
          <Route path="/library/:id" element={<LibraryDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
