import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Add from "./containers/Add/Add";
import EditPost from "./containers/EditPost/EditPost";
import Home from "./containers/Home/Home";
import Pages from "./containers/Pages/Pages";
import PostPage from "./containers/PostPage/PostPage";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="posts/:id" element={<PostPage />}>
              <Route path="edit" element={<EditPost />} />
            </Route>
          </Route>
          <Route path="/posts/" element={<Home />}>
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="/new-post" element={<Add />} />
          <Route path="/pages/:pageName" element={<Pages />} />
          <Route path="*" element={<h4>Not found!</h4>} />
        </Routes>
      </main>
    </>
  );
}

export default App;