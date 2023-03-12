import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import { v4 } from 'uuid';

export const socket = io('http://localhost:8080');

export function sendAction(actionId: string, params: any) {
  return new Promise((res) => {
    const id = v4();
    socket.emit('admin-message', { target: 'action', actionId, respondId: id, params })
    
    socket.on('admin-message', onAction)

    function onAction(data: any) {
      if (data.target === 'action' && data.action === id) {
        socket.off('admin-message', onAction);
        res(data.data);
      }
    }
  });
}

export function useApp() {
  const [openLeftMenu, setOpenLeftMenu] = useState(true);
  const [openLogin, setOpenLogin] = useState(!localStorage.getItem('token'));
  const [paths, setPaths] = useState<string[]>([]);
  const [menu, setMenu] = useState<{ title: string, icon?: string, path: string }[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(!localStorage.getItem('token'))
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('auth-success', (token) => {
      localStorage.setItem('token', token)
      socket.emit('admin-message', { target: 'get-paths' });
      setOpenLogin(false);
      setLoading(false);
    });
    socket.on('auth-error', () => {
      setOpenLogin(true);
      localStorage.removeItem('token');
    });

    socket.on('admin-message', ({ target, ...data }) => {
      if (target === 'paths') {
        setPaths(data.paths.map(({ path }: any) => path));
        setMenu(
          data
            .paths
            .filter((page: any) => page.menu)
            .map(({ menu, path }: any) => ({ ...menu, path }))
        );
      }
      if (target === 'page') {
        document.title = data.title;
        setContent(data.content);
      }
      if (target === 'navigate') {
        navigate(data.href)
      }
      if (target === 'notify') {
        console.log(target);
        toast(data.message, data.options)
      }
    });

    socket.on('disconnect', () => {
      setLoading(true);
      setContent([]);
      setPaths([]);
    });

    socket.on('connect', () => {
      setLoading(false);
      if (localStorage.getItem('token')) {
        socket.emit('auth', { authCase: 'token', token: localStorage.getItem('token') });
      }
    });
  }, []);

  return {
    loading,
    openLogin,
    menu,
    setOpenLeftMenu,
    openLeftMenu,
    setOpenLogin,
    paths,
    content,
  };
}
