import css from "./DataTable3.module.scss"

export default {
  options: {
    // setCellHeaderProps: (value) => {
    //   return {
    //     style: {
    //       textDecoration: "underline",
    //     },
    //   }
    // },
    setCellProps: (value) => {
      return {
        className: css.test,
        style: {
          borderRight: "2px solid blue",
          display: "none",
        },
      }
    },
    setTableProps: () => {
      return {
        size: "small",
      }
    },
    pagination: false,
    filterType: "dropdown",
    enableNestedDataAccess: ".",
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: null,
    responsive: "vertical",
  },
}
