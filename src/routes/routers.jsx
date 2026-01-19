import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Combat from '@/pages/Combat';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="editor" element={<Editor />} />
                <Route path="editor/:teamId" element={<Editor />} />
                <Route path="combat" element={<Combat />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
