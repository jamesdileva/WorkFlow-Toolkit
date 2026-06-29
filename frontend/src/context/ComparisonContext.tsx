import {
    createContext,
    useContext,
    useState,
} from "react";

import type { ReactNode } from "react";

import type { DatasetComparison } from "../types/DatasetComparison";

interface ComparisonContextType {

    comparison: DatasetComparison;

    setComparison: (
        comparison: DatasetComparison
    ) => void;

}

const ComparisonContext =
    createContext<
        ComparisonContextType | undefined
    >(undefined);

interface ProviderProps {
    children: ReactNode;
}

export function ComparisonProvider({
    children,
}: ProviderProps) {

    const [comparison, setComparison] =
        useState<DatasetComparison>({
            leftDatasetId: null,
            rightDatasetId: null,
        });

    return (

        <ComparisonContext.Provider
            value={{
                comparison,
                setComparison,
            }}
        >
            {children}
        </ComparisonContext.Provider>

    );

}

export function useComparison() {

    const context =
        useContext(
            ComparisonContext
        );

    if (!context) {

        throw new Error(
            "useComparison must be used within ComparisonProvider"
        );

    }

    return context;

}