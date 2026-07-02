from pathlib import Path

import pandas as pd

path = Path(
    r"C:\Users\j\WorkFlow-Toolkit\backend\storage\project_2\datasets\test.csv"
)

df = pd.read_csv(path)

print(df)
print(len(df))