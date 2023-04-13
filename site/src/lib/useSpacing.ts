import theme from "./theme";

const useSpacing = (type: string) => theme.spacing[type] ?? [2, 3, 4];

export default useSpacing;
