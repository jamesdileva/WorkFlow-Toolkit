import { useEffect, useState } from "react";

import {
    getProjectCount,
} from "../../services/projectService";

import {
    datasetService,
} from "../../services/datasetService";

import {
    getRecentHistory,
    type TransformationHistory,
} from "../../services/transformationHistoryService";


import "./Dashboard.css";

export default function Dashboard() {

    const [projectCount, setProjectCount] =
    useState(0);

    const [datasetCount, setDatasetCount] =
    useState(0);  

    const [totalRows, setTotalRows] =
    useState(0);

    const [history, setHistory] = useState<
        TransformationHistory[]
    >([]);

    const [healthScore, setHealthScore] =
        useState<number | null>(null);

    const [datasetsNeedingAttention,
        setDatasetsNeedingAttention] =
        useState(0);

    const [healthyDatasets,
    setHealthyDatasets] =
    useState(0);

    const [warningDatasets,
        setWarningDatasets] =
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

        getRecentHistory()
            .then(setHistory)
            .catch(console.error);


        datasetService
            .getDatasets()
            .then(async datasets => {

                if (datasets.length === 0) {
                    return null;
                }

                const scores = await Promise.all(
                    datasets.map(dataset =>
                        datasetService.getDatasetHealth(
                            dataset.id
                        )
                    )
                );

                const healthy =
                    scores.filter(
                        score => score.health_score >= 90
                    ).length;

                const warning =
                    scores.filter(
                        score =>
                            score.health_score >= 75 &&
                            score.health_score < 90
                    ).length;

                const attention =
                    scores.filter(
                        score => score.health_score < 75
                    ).length;

                setHealthyDatasets(
                    healthy
                );

                setWarningDatasets(
                    warning
                );

                setDatasetsNeedingAttention(
                    attention
                );

                const average =
                    Math.round(
                        scores.reduce(
                            (sum, score) =>
                                sum + score.health_score,
                            0,
                        ) / scores.length
                    );

                return average;

            })
            .then(average => {

                if (average === null) {
                    return;
                }

                setHealthScore(
                    average
                );

            })
            .catch(console.error);

        }, []);




        function getHealthStatus(
            score: number | null,
        ) {

            if (score === null) {
                return "--";
            }

            if (score >= 90) {
                return "🟢 Healthy";
            }

            if (score >= 75) {
                return "🟡 Warning";
            }

            return "🔴 Needs Attention";

        }

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

            <section>
                <h2>Recent Activity</h2>

                <ul>
                    {history.map(item => (
                        <li key={item.id}>
                            <strong>{item.transformation}</strong>

                            <br />

                            <small>{item.details}</small>

                            <br />

                            <small>
                                {new Date(item.created_at).toLocaleString()}
                            </small>
                        </li>
                    ))}
                </ul>
            </section>

            <section>

                <h2>Dataset Health</h2>

               <p>
                    Average Dataset Health:
                    {" "}
                    {healthScore ?? "--"}
                </p>

                <p>
                    Status:
                    {" "}
                    {getHealthStatus(
                        healthScore
                    )}
                </p>


                <p>

                    Datasets Needing Attention:

                    {" "}

                    {datasetsNeedingAttention}

                </p>


                <p>
                    Healthy Datasets: {healthyDatasets}
                </p>

                <p>
                    Warning Datasets: {warningDatasets}
                </p>

                <p>
                    Datasets Needing Attention:
                    {" "}
                    {datasetsNeedingAttention}
                </p>
                

            </section>



        </div>

      </div>
  );
}