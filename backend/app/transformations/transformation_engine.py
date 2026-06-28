from pathlib import Path


class TransformationEngine:

    @staticmethod
    def execute(
        dataset_path: str,
        output_path: str,
        operation,
    ):
        """
        Executes a transformation operation.

        Parameters
        ----------
        dataset_path:
            Input dataset.

        output_path:
            Output dataset.

        operation:
            Callable transformation.
        """

        return operation(
            dataset_path,
            output_path,
        )