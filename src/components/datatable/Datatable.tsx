import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_ES } from "../../assets/ag-grid/locale.es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { CustomDatatableTooltip } from "./CustomDatatableTooltip";
import { Button, Form } from "react-bootstrap";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { ArrowBarLeft, ArrowBarRight, ArrowRepeat } from "react-bootstrap-icons";
import { useMediaQuery } from "react-responsive";
import { DefaultComponentProps } from "../../ts/global.interfaces";
import styled from "styled-components";
import { CustomTooltip } from "../bootstrap/CustomTooltip";

export const Datatable = <T,>({
  className,
  definicionColumnas,
  data,
  recargarData,
  cargando,
  textoNoHayFilas,
}: DatatableProps<T>) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const gridRef = useRef<any>(null);

  const defaultColDef: ColDef<T> = {
    sortable: true,
    suppressMovable: true,
    minWidth: 90,
    resizable: true,
    tooltipComponent: CustomDatatableTooltip,
  };

  const irAPrimeraColumna = () => {
    if (
      definicionColumnas &&
      definicionColumnas.length > 0 &&
      (definicionColumnas[0] as ColDef).field
    )
      gridRef?.current?.api.ensureColumnVisible(
        (definicionColumnas[0] as ColDef).field
      );
  };

  const expandirColumas = async (): Promise<void> => {
    await gridRef?.current?.columnApi.autoSizeAllColumns();
    irAPrimeraColumna();
  };

  const contraerColumnas = async (): Promise<void> => {
    await gridRef?.current?.api.sizeColumnsToFit();
    irAPrimeraColumna();
  };

  const handleOnInputBuscar = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    gridRef.current.api.setQuickFilter(value);

  const handleOnChangeCantidadFilas = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>): void =>
    gridRef.current.api.paginationSetPageSize(Number(value));

  const handleOnClickRecargarData = async (): Promise<void> => {
    gridRef.current.api.showLoadingOverlay();
    await recargarData();
    if (data && data.length > 0) gridRef.current.api.hideOverlay();
    else gridRef.current.api.showNoRowsOverlay();
  };

  const handleOnDataModificada = () => {
    if (gridRef?.current?.api)
      if (cargando) gridRef.current.api.showLoadingOverlay();
      else if (data && data.length > 0) gridRef.current.api.hideOverlay();
      else gridRef.current.api.showNoRowsOverlay();
  };

  return (
    <div className={`${className} d-flex flex-column`}>
      <div
        className={`d-flex ${
          isTabletOrMobile ? "flex-column-reverse gap-1" : "flex-row gap-3"
        } mb-1`}
      >
        <Form.Group className="w-100">
          <Form.Control
            type="text"
            placeholder="Buscar..."
            onInput={handleOnInputBuscar}
          />
        </Form.Group>
        <Form.Group
          className={`d-flex gap-3 ${isTabletOrMobile ? "w-100" : "w-25"}`}
        >
          <Form.Label
            className={`flex-grow-1 mb-0 d-flex justify-content-center
              align-items-center`}
          >
            Filas:
          </Form.Label>
          <Form.Select className="" onChange={handleOnChangeCantidadFilas}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-between gap-3">
          {isTabletOrMobile && (
            <>
              <CustomTooltip className="w-100" texto="Contraer">
                <Button
                  variant="outline-gray"
                  size="lg"
                  className={`w-100 h-100 d-flex justify-content-center
                  align-items-center`}
                  onClick={contraerColumnas}
                >
                  <ArrowBarLeft className="fs-5" />
                </Button>
              </CustomTooltip>
              <CustomTooltip className="w-100" texto="Expandir">
                <Button
                  variant="outline-gray"
                  size="lg"
                  className={`w-100 h-100 d-flex justify-content-center
                  align-items-center`}
                  onClick={expandirColumas}
                >
                  <ArrowBarRight className="fs-5" />
                </Button>
              </CustomTooltip>
            </>
          )}
          <CustomTooltip className="w-100" texto="Recargar">
            <Button
              variant="outline-gray"
              size={isTabletOrMobile ? "lg" : undefined}
              className={`w-100 h-100 d-flex justify-content-center
                align-items-center`}
              onClick={handleOnClickRecargarData}
            >
              <ArrowRepeat className="fs-5" />
            </Button>
          </CustomTooltip>
        </div>
      </div>
      <StyledAgGridReactWrapper
        className={`ag-theme-alpine ${
          data && data.length > 0 ? "" : "no-data"
        }`}
      >
        <AgGridReact<T>
          ref={gridRef}
          rowData={data}
          columnDefs={definicionColumnas}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          localeText={AG_GRID_LOCALE_ES}
          tooltipShowDelay={0}
          tooltipHideDelay={5000}
          onRowDataUpdated={handleOnDataModificada}
          onGridColumnsChanged={isTabletOrMobile ? expandirColumas : undefined}
          overlayNoRowsTemplate={`
            <span class="ag-overlay-loading-center">
              ${textoNoHayFilas ?? "No hay datos"}
            </span>`}
        />
      </StyledAgGridReactWrapper>
    </div>
  );
};

const StyledAgGridReactWrapper = styled.div`
  --ag-border-color: #ced4da;
  .ag-root-wrapper-body.ag-layout-normal.ag-focus-managed {
    height: 100%;
  }
  .ag-root-wrapper {
    border-radius: 0.375rem;
  }
  &.no-data {
    .ag-overlay {
      position: relative;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
`;

interface DatatableProps<T> extends DefaultComponentProps {
  definicionColumnas: (ColDef<T> | ColGroupDef<T>)[] | null;
  data: T[] | undefined;
  recargarData: () => Promise<void>;
  cargando: boolean;
  textoNoHayFilas?: string;
}
