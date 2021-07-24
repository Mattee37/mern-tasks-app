import React from "react";

import NewProject from "../projects/NewProject";
import List from "../projects/List";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN<span> Tasks</span>
        <NewProject />
        <div className="proyectos">
          <h2>Tus Proyectos</h2>
          <List />
        </div>
      </h1>
    </aside>
  );
};

export default Sidebar;
