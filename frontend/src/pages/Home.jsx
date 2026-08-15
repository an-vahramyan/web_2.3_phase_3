import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <main className="home">
      <h1 className="home-title">Frontend Homeworks</h1>

      <section className="homeworks">
        <h2 className="homework-title">Homework 01</h2>
        <p className="homework-description">
          Table with user data and remove button
        </p>

        <Link
          to="/frontend/src/homeworks/Table_in_React"
          className="homework-btn"
        >
          Open homework
        </Link>
      </section>
      
    </main>
  );
}

export default Home;
