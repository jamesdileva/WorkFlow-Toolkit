import { useEffect, useState } from "react";

import {
    getProjectCount,
} from "../../services/projectService";

import {
    datasetService,
} from "../../services/datasetService";



import "./Dashboard.css";

export default function Dashboard() {

    const [projectCount, setProjectCount] =
    useState(0);

    const [datasetCount, setDatasetCount] =
    useState(0);  

    const [totalRows, setTotalRows] =
    useState(0);

  useEffect(() => {

      getProjectCount()
          .then(result => {

              setProjectCount(
                  result.count
              );

          })
          .catch(console.error);


        datasetService
            .getDatasetCount()
            .then(result => {

                setDatasetCount(
                    result.count
                );

            })
            .catch(console.error);
            
        datasetService
            .getTotalRows()
            .then(result => {

                setTotalRows(
                    result.rows
                );

            })
            .catch(console.error);

  }, []);

  return (
      <div className="dashboard-page">

          <h1>Dashboard</h1>

          <div className="dashboard-grid">

            <div className="dashboard-card">

                <h3>Projects</h3>

                <p className="dashboard-value">
                    {projectCount}
                </p>

            </div>

            <div className="dashboard-card">

                <h3>Datasets</h3>

                <p className="dashboard-value">
                    {datasetCount}
                </p>

            </div>

            <div className="dashboard-card">

                <h3>Rows Processed</h3>

                <p className="dashboard-value">
                    {totalRows.toLocaleString()}
                </p>

            </div>

        </div>

      </div>
  );
}