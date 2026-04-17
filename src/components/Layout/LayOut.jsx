import { Outlet } from "react-router-dom";
import Nav from "./../Nav/Nav";
import Home from "../Home/Home";

export default function LayOut() {
  return (
    <>
      <main>
        <Nav />
        <section className="w-full h-screen ">
          <Outlet />
        </section>
      </main>
    </>
  );
}
