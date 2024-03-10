import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Lern from "./components/Hero/Lern";
import Help from "./components/Help/Help";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminState from "./context/admin/AdminState";

function App() {
  const heading = "Welcome to FRAMS";
  const subtitle = "Facial Recongnication based Attendance Management System";
  const content =
    "Revolutionizing attendance tracking, our MERN-based system harnesses   FaceAPI's cutting-edge facial recognition. Seamlessly integrating facial authentication, it empowers organizations with unparalleled accuracy and efficiency in attendance management. Utilizing machine learning, it identifies individuals swiftly and accurately, automating the logging process. This system ensures secure and reliable tracking, enhancing productivity while respecting privacy. With real-time recognition, it optimizes administrative tasks, fostering a dynamic, future-ready approach to attendance management. Embracing innovation, our platform reshapes traditional systems, offering a futuristic, intelligent solution for workforce management in the digital age.";
  const nextTxt = "Let's Start";
  const extraTxt = "Lern More";
  const nextPath = "login";
  const extraPath = "lern";
  return (
    <>
      <AdminState>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Hero
                heading={heading}
                subtitle={subtitle}
                content={content}
                nextTxt={nextTxt}
                extraTxt={extraTxt}
                nextPath={nextPath}
                extraPath={extraPath}
              />
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/lern" element={<Lern />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/adminpanel" element={<AdminPanel />} />
        </Routes>
      </AdminState>
    </>
  );
}

export default App;
