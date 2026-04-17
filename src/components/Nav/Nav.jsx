import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bezier } from "iconsax-reactjs";
import { AuthContext } from "../../context/AuthContextProvider/AuthContextProvider";
export default function Nav() {
  const {userData,logout,userName} = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  function Logout(){
    localStorage.removeItem("token");
    logout();
    navigate("/login");

  }
  function changePfp() {
    navigate("/ChangePfp");
  }
  function changePassword() {
    navigate("/ChangePassword");
  }
  return (
    <>
      <Navbar
        className="bg-fuchsia-200 fixed top-0 left-0 right-0 z-50 shadow-md"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand as={Link} to={userData ? "/posts" : "/login"}>
            <Bezier size="32" color="#ba68c8" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarBrand as={Link} to={userData ? "/posts" : "/login"}>
            <Bezier size="32" color="#ba68c8" />
          </NavbarBrand>
          {userData && (
            <NavbarItem isActive>
              <NavLink
                aria-current="page"
                to="/posts"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 text-2xl first-letter::via-fuchsia-950"
                    : "text-gray-700 hover:text-purple-700 first-letter::via-fuchsia-950"
                }
              >
                <span className="">Posts</span>
              </NavLink>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          {!userData ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-bold first-letter:text-fuchsia-950"
                  : "text-gray-700 hover:text-purple-700"
              }
            >
              Login
            </NavLink>
          ) : null}{" "}
          {!userData ? (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-bold first-letter:text-fuchsia-950"
                  : "text-gray-700 hover:text-purple-700 "
              }
            >
              SignUP
            </NavLink>
          ) : (
            ""
          )}
          {userData ? (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform cursor-pointer hover:scale-110"
                    color="secondary"
                    name={userName}
                    size="sm"
                    src={userData.user.photo? userData.user.photo : `./images/default-pfp.png`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" classNames={{ base: "w-56" }} textValue="Profile Actions">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">HI !</p>
                    <p className="font-semibold">{userName}</p>
                  </DropdownItem>
                  <DropdownItem key="change-pfp" onClick={changePfp}>
                    Change profile pic
                  </DropdownItem>
                  <DropdownItem key="change-password" onClick={changePassword}>
                    Change password
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    onClick={function () {
                      Logout();
                    }}
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            " "
          )}
        </NavbarContent>

        <NavbarMenu>
          {userData ? (
            <NavbarMenuItem>
              <Link to="/posts" className="text-gray-700 hover:text-purple-700">
                Posts
              </Link>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Link to="/login" className="text-gray-700 hover:text-purple-700">
                login
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
        
      </Navbar>
    </>
  );
}
