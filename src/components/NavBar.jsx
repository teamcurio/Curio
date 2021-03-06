import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Flex, Spacer, Input, Stack, IconButton, Text , InputGroup, InputRightElement} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const NavBar = (props) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setLogin] = useState(
    Boolean(localStorage.getItem("curioUser"))
  );
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    function handleLogStatus() {
      setLogin(Boolean(localStorage.getItem("curioUser")));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("curioUser");
    localStorage.removeItem("curioToken");
    // handleLogStatus();
    setLogin(Boolean(localStorage.getItem("curioUser")));
    history.push("/");
  };

  // console.log(localStorage.getItem("curioUser"));
  return (
    <Flex
      width="100%"
      color="white"
      h="40px"
      bg="black"
      padding="5px"
      boxShadow="lg"
      justifyContent="center"
      style={{ marginTop: "0px" }}
    >
      {localStorage.getItem("curioUser") ? (
        <Link to="/favorites">
          <Text
            float="left"
            type="submit"
            bg="black"
            color="white"
            justifyContent="center"
            height="30px"
            _hover={{ color: "#ebc765" }}
            style={{
              paddingLeft: "10px",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Favorites
          </Text>
        </Link>
      ) : (
        <Link to="/">
          <Text
            float="left"
            type="submit"
            bg="black"
            color="white"
            justifyContent="center"
            height="30px"
            _hover={{ color: "#ebc765" }}
            style={{
              paddingLeft: "10px",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            {""}Curio
          </Text>
        </Link>
      )}
      <Spacer />
      <Spacer />
      {props.displaySearch && (
        <form>
          <InputGroup className="inputTerm" pr="3.5rem" >
            <Stack direction={["column", "row"]}>
              <Input
                _placeholder={{ color: "black" }}
                align="center"
                pr="4rem"
                name="search"
                borderColor="white"
                bg="white"
                color="black"
                placeholder="Search"
                onChange={handleSearchTerm}
                size="xs"
                mt="5px"
              />
              <InputRightElement width="4.5rem">
                <Link to={{ pathname: "/images", state: { searchTerm } }}>
                  <IconButton
                    size="xs"
                    colorScheme="blackalpha"
                    type="submit"
                    aria-label="search"
                    icon={<SearchIcon />}
                    _hover={{ color: "#ebc765" }}
                    bg="black"
                    color="white"
                  mb="5px"
                  />
                </Link>
              </InputRightElement>
            </Stack>
          </InputGroup>
        </form>
      )}
      <Spacer/>
      <Spacer/>
      {!isLoggedIn ? (
        <Link to="/login">
          <Text
            float="right"
            type="submit"
            bg="black"
            color="white"
            justifyContent="center"
            height="30px"
            _hover={{ color: "#ebc765" }}
            style={{
              paddingRight: "10px",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Log In
          </Text>
        </Link>
      ) : (
        <Link to="/">
          <Text
            onClick={() => handleLogout()}
            float="right"
            type="submit"
            bg="black"
            color="white"
            justifyContent="center"
            height="30px"
            _hover={{ color: "#ebc765" }}
            style={{
              paddingRight: "10px",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Sign Out
          </Text>
        </Link>
      )}
    </Flex>
  );
};

export default NavBar;
