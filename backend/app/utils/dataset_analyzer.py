import csv


class DatasetAnalyzer:

    @staticmethod
    def analyze(file_path: str):
        with open(
            file_path,
            newline="",
            encoding="utf-8",
        ) as csvfile:

            reader = list(csv.reader(csvfile))

        if not reader:
            return {
                "rows": 0,
                "columns": 0,
                "headers": [],
                "preview": [],
            }

        headers = reader[0]

        preview = reader[1:101]

        return {
            "rows": max(len(reader) - 1, 0),
            "columns": len(headers),
            "headers": headers,
            "preview": preview,
        }