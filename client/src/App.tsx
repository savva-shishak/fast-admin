import { Button, CircularProgress } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Page } from './render-page';
import { Login } from './login/Login';
import { useApp, socket } from './useApp';
import './App.css';

export { socket, sendAction } from './useApp';

function App() {
  const {
    loading,
    openLogin,
    menu,
    setOpenLeftMenu,
    openLeftMenu,
    setOpenLogin,
    paths,
    content,
  } = useApp()

  if (loading) {
    return <CircularProgress />
  }

  return (<>
    <div className="App">
      <div className="App__login" style={{ top: openLogin ? 0 : '-100vh' }}>
        <Login
          onSubmit={async (data) => {
            socket.emit('auth', data);

            return new Promise<number>((res) => socket.once('auth-error', res));
          }}
        />
      </div>
      <div className="App__header">
        {
          menu.length
          ? (
            <div className="App__toggle-menu" onClick={() => setOpenLeftMenu(!openLeftMenu)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )
          : (
            <div />
          )
        }
        <Button
          variant="text"
          type="button"
          style={{ color: 'white' }}
          onClick={() => {
            socket.emit('logout');
            setOpenLogin(true);
            localStorage.removeItem('token');
          }}
        >
          Выйти
        </Button>
      </div>
      <div className="App__left" style={{ width: openLeftMenu && menu.length ? 200 : 0 }}>
        <div className="App__left-menu">
          {menu.map(({ title, icon, path }) => (
            <Link
              className="App__left-menu-item"
              to={path}
              key={path}
            >
              {icon ? <img src={icon} /> : <div />}
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div className="App__body">
        <Routes>
          {paths.map((path) => (
            <Route
              key={path}
              path={path}
              element={<><Page content={content} path={path} /></>}
            />
          ))}
        </Routes>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default App
