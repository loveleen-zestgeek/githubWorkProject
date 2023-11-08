import logo from "./logo.svg";
import "./App.css";
import "./Main.css";
import Searchbar from "./component/Searchbar";
import DataGrid from "./component/DataGrid";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [fetchedData, setfetchedData] = useState([]);
  useEffect(() => {
    fetchDetailsDefault();
  }, []);

  useEffect(() => {
    if (searchItem === "") {
      fetchDetailsDefault();
    } else {
      fetchDetails();
    }
  }, [searchItem]);

  const fetchDetailsDefault = async () => {
    try {
      let response = await axios.get(`https://api.github.com/users`);
      response = response.data;
      setfetchedData(response);
      console.log("fetchDetailsDefault RUN");

      console.log("FethcedData:", fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetails = async () => {
    try {
      let response = await axios.get(
        `https://api.github.com/search/users?q=${searchItem}`
      );
      console.log(response);
      response = response.data.items;
      setfetchedData(response || []);

      console.log("FethcedData:", fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-center text-3xl py-3">Github Users Data</h1>
        </div>
        <Searchbar searchItem={searchItem} setSearchItem={setSearchItem} />
        {<DataGrid fetchedData={fetchedData} />}
      </div>
    </>
  );
}

export default App;
