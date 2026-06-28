import pandas as pd


def remove_duplicates(
    dataset_path: str,
    output_path: str,
):
    """
    Remove duplicate rows from a dataset.
    """

    dataframe = pd.read_csv(dataset_path)

    dataframe = dataframe.drop_duplicates()

    dataframe.to_csv(
        output_path,
        index=False,
    )

    return {
        "rows": len(dataframe),
        "columns": len(dataframe.columns),
    }