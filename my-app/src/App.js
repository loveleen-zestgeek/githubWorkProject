import logo from "./logo.svg";
import "./App.css";
import "./Main.css";
import Searchbar from "./component/Searchbar";
import DataGrid from "./component/DataGrid";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import Loader from "react-js-loader";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [fetchedData, setfetchedData] = useState([]);
  const [loader, setloader] = useState(true);
  const [userNotExist, setuserNotExist] = useState(false);
  const [maxLimit, setmaxLimit] = useState(false);
  const client = axios.create({
    baseURL: "https://api.github.com",
  });
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
    }, 1);
    return () => clearTimeout(delayDebounceFn);
  }, [searchItem]);

  const fetchDetailsDefault = async () => {
    try {
      setloader(true);
      let response = await client.get(`/users`);
      response = response.data;
      setfetchedData(response);
      console.log("fetchDetailsDefault RUN");
      setloader(false);
      setmaxLimit(false);
      console.log("FethcedData:", fetchedData);
    } catch (error) {
      console.log("Errrrrrrr", error);
    }
  };

  const fetchDetails = async () => {
    try {
      setloader(true);
      let response = await client.get(`/search/users?q=${searchItem}`);
      console.log(response);
      let itemsResponse = response.data.items;
      if (itemsResponse.length == 0) {
        setuserNotExist(true);
      } else {
        setuserNotExist(false);
      }

      setfetchedData(itemsResponse || []);
      setloader(false);
      setmaxLimit(false);
    } catch (error) {
      console.log("dd", error.response.status);
      if (error.response.status === 403) {
        setmaxLimit(true);
      } else {
        setmaxLimit(false);
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-center text-3xl py-3">Github Users Data</h1>
      </div>
      <Searchbar searchItem={searchItem} setSearchItem={setSearchItem} />
      {maxLimit ? (
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
      ) : userNotExist ? (
        <div className="flex justify-center items-center flex-col">
          <p className="my-6 text-gray-600 text-2xl">user not found</p>
          <img
            src="./noUserFound.webp"
            alt="user not exist"
            className="w-[350px]"
          ></img>
        </div>
      ) : (
        <DataGrid fetchedData={fetchedData} />
      )}
      {/* {Skeleton && <Skeleton />} */}
    </>
  );
}

export default App;
