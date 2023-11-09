import logo from "./logo.svg";
import "./App.css";
import "./Main.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-js-loader";
import CustomPagination from "./component/CustomPagination";
import Searchbar from "./component/Searchbar";

const client = axios.create({
  baseURL: "https://api.github.com",
});

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [githubUserData, setgithubUserData] = useState([]);
  const [loader, setloader] = useState(true);
  const [isUserNotExist, setisUserNotExist] = useState(false);
  const [isMaxLimit, setisMaxLimit] = useState(false);

  useEffect(() => {
    fetchDetailsDefault();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchItem === "") {
        fetchDetailsDefault();
      } else {
        fetchDetails();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchItem]);

  const fetchDetailsDefault = async () => {
    try {
      setloader(true);
      let response = await client.get(`/users`);
      response = response.data;
      setgithubUserData(response);

      setloader(false);
      setisMaxLimit(false);
    } catch (error) {
      console.log("Error");
    }
  };

  const fetchDetails = async () => {
    try {
      setloader(true);
      let response = await client.get(
        `/search/users?q=${searchItem}&per_page=99`
      );

      let itemsResponse = response.data.items;
      if (itemsResponse.length == 0) {
        setisUserNotExist(true);
      } else {
        setisUserNotExist(false);
      }

      setgithubUserData(itemsResponse || []);
      setloader(false);
      setisMaxLimit(false);
    } catch (error) {
      console.log("Error Occured");
      if (error.response.status === 403) {
        setisMaxLimit(true);
      } else {
        setisMaxLimit(false);
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-center text-3xl py-3">Github Users Data</h1>
      </div>
      <Searchbar searchItem={searchItem} setSearchItem={setSearchItem} />
      {isMaxLimit ? (
        <p className="my-6 text-gray-600 text-2xl text-center">
          Maximum Limit Reached
        </p>
      ) : loader ? (
        <div className="my-10">
          <Loader
            className="my-5"
            type="bubble-scale"
            bgColor={"#3371FF"}
            color={"#3371FF"}
            title={"Loading"}
            size={100}
          />
        </div>
      ) : isUserNotExist ? (
        <div className="flex justify-center items-center flex-col">
          <p className="my-6 text-gray-600 text-2xl">user not found</p>
          <img
            src="./noUserFound.webp"
            alt="user not exist"
            className="w-[350px]"
          ></img>
        </div>
      ) : (
        <CustomPagination itemsPerPage={10} githubUserData={githubUserData} />
      )}
    </>
  );
}
export default App;
