import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const labelString = {
  noRowsLabel: 'No hay datos',
  MuiTablePagination: {
    labelRowsPerPage: 'Filas por página',
    labelDisplayedRows: ({ from, to, count }) => {
      return `${from}–${to} de ${count !== -1 ? count : `mas de ${to}`}`;
    },
    nextIconButtonProps: {
      title: 'Siguiente página',
    },
    backIconButtonProps: {
      title: 'Página anterior',
    },
  },
  toolbarFiltersTooltipActive: 'Filtros activos',
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuManageColumns: 'Administrar Columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Orden ASC',
  columnMenuSortDesc: 'Orden DESC',
  columnsPanelTextFieldLabel: 'Buscar columna',
  columnsPanelTextFieldPlaceholder: 'Buscar columna',
  columnsPanelDragIconLabel: 'Reordenar columna',
  columnsPanelShowAllButton: 'Mostrar todo',
  columnsPanelHideAllButton: 'Ocultar todo',
  columnHeaderSortIconLabel: 'Ordenar',
  filterPanelAddFilter: 'Agregar filro',
  filterPanelRemoveAll: 'Remover todo',
  filterPanelDeleteIconLabel: 'Borrar',
  filterPanelLogicOperator: 'Operador lógico',
  filterPanelOperator: 'Operador',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: 'Columnas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor a filtrar',
  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'es igual',
  filterOperatorStartsWith: 'comienza con',
  filterOperatorEndsWith: 'termina con',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: 'esta vacio',
  filterOperatorIsNotEmpty: 'no esta vacio',
  filterOperatorIsAnyOf: 'es alguno de',
}

export default function TableDataGrid({ columns = [], rows = [], rowIdName }) {

  return (

    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row[rowIdName]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20]}
      autoHeight
      localeText={labelString}
    />
  )
}
