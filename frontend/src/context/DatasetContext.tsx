import {
    createContext,
    useContext,
    useState,
} from "react";

import type { Dataset } from "../types/Dataset";

interface DatasetContextType {
    activeDataset: Dataset | null;

    setActiveDataset: (
        dataset: Dataset | null
    ) => void;
}

const DatasetContext =
    createContext<DatasetContextType | undefined>(
        undefined
    );

export function DatasetProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [activeDataset, setActiveDataset] =
        useState<Dataset | null>(null);

    return (
        <DatasetContext.Provider
            value={{
                activeDataset,
                setActiveDataset,
            }}
        >
            {children}
        </DatasetContext.Provider>
    );
}

export function useDataset() {
    const context = useContext(DatasetContext);

    if (!context) {
        throw new Error(
            "useDataset must be used within DatasetProvider"
        );
    }

    return context;
}