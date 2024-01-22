import { GridApi } from "ag-grid-community";
import styled from "styled-components";

export const CustomDatatableTooltip = <T,>({
  api,
  rowIndex,
  color,
  fieldsToDisplay,
}: CustomDatatableTooltipProps<T>) => {
  const data = api?.getDisplayedRowAtIndex(rowIndex)?.data as any;

  const infoToDisplay = (): JSX.Element[] => {
    const info: JSX.Element[] = [];
    for (let property in data)
      if (fieldsToDisplay.includes(property))
        info.push(<div key={property}>{data[property]}</div>);
    return info;
  };

  return (
    <StyledTooltip
      className="p-1"
      style={{ backgroundColor: color || "white" }}
    >
      {infoToDisplay()}
    </StyledTooltip>
  );
};

const StyledTooltip = styled.div`
  width: 150px;
  border: 1px solid rgb(128, 130, 134);
  border-radius: 0.375rem;
  overflow: hidden;
`;

interface CustomDatatableTooltipProps<T> {
  api: GridApi<T>;
  rowIndex: number;
  color: string;
  fieldsToDisplay: string[];
}
