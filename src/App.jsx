import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import AddYours from "./components/AddYours";
import NotFound from "./components/NotFound";
import Sidebar from "./components/Sidebar";

import "./style/blog.css";

export const RouterContext = createContext(null);
export const CommentsContext = createContext({
  comments: [],
  setComments: () => { },
  postId: null,
  setPostId: () => { },
});

const routes = [
  { id: crypto.randomUUID(), name: 'Home', url: '#/', element: <Home /> },
  { id: crypto.randomUUID(), name: 'About', url: '#/about', element: <About /> },
  { id: crypto.randomUUID(), name: 'Blog', url: '#/blog', element: <Blog /> },
  { id: crypto.randomUUID(), name: 'AddYours', url: '#/addyours', element: <AddYours /> },
];

const notFound = { name: 'Page not found', element: <NotFound /> };

function getRoute(routeUrl) {
  const route = routes.find((x) => x.url === routeUrl);
  return route ?? notFound;
}

const title = 'TCC';

function setTitle(pageTitle) {
  document.title = `${ pageTitle } - ${ title }`;
}

function App() {
  const [route, setRoute] = useState(() => {
    if (location.hash.length < 2) {
      return routes[0];
    }
    return getRoute(location.hash);
  });

  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    setTitle(route.name);
  }, [route]);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute(location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="container">
      <RouterContext.Provider value={route}>
        <CommentsContext.Provider value={{ comments, setComments, postId, setPostId }}>
          <Header />
          <Main />
          <Footer />
        </CommentsContext.Provider>
      </RouterContext.Provider>
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <Content />
      <Sidebar />
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="header">
      <a href="#/" className="logo">The Curious Corner</a>
      <button className="nav-toggle" onClick={toggleMenu}>☰</button>
      <Nav isOpen={isOpen} />
    </div>
  );
}

function Nav({ isOpen }) {
  const route = useContext(RouterContext);

  return (
    <ul className={`nav ${isOpen ? 'open' : ''}`}>
      {routes.map((x) => (
        <li key={x.id}>
          <a href={x.url} className={route.url === x.url ? 'selected' : ''}>
            {x.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Content() {
  const route = useContext(RouterContext);

  return (
    <div className="content">
      <h1>{route.name}</h1>
      {route.element}
    </div>
  );
}

function Footer() {
  return <div className="footer">&copy; 2024</div>;
}




export default App;