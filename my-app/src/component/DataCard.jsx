import React from "react";
import RightArrow from "../icons/RightArrow";

export default function DataCard({ githubUserData }) {
  return (
    <>
      <div className=" w-[180px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg"
          src={githubUserData.avatar_url || "noImage.png"}
          alt=""
        />

        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap ">
            Name:{githubUserData.login}{" "}
          </p>
          <a
            href={githubUserData.html_url}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            rel="noreferrer"
          >
            Repo Url
            <RightArrow />
          </a>
        </div>
      </div>
    </>
  );
}
