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
        <Link to="table" className="homework-btn">
          Open homework
        </Link>
      </section>

      <section className="homeworks">
        <h2 className="homework-title">Homework 02</h2>
        <p className="homework-description">
          Shop implementation with busket and product cards
        </p>
        <Link to="shop" className="homework-btn">
          Open homework
        </Link>
      </section>

      <section className="homeworks">
        <h2 className="homework-title">Homework 03</h2>
        <p className="homework-description">
          Counter with typescript
        </p>

        <Link to="counter" className="homework-btn">
          Open homework
        </Link>
      </section>
    </main>
  );
}

export default Home;
