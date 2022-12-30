import { createTheme } from "@mui/material/styles";


const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundImage: "linear-gradient(#09C6F9, #045DE9 )",
            borderRadius: "5px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundImage: "linear-gradient(#09C6F9, #045DE9 )",
            color: "white",
          },
        },
      },
    },
  },
});


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundImage: "linear-gradient(to top, #4b6cb7, #182848)",
            borderRadius: "5px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundImage: "linear-gradient(to top, #4b6cb7, #182848)",
            color: "white",
          },
          "& .MuiIconButton-root":{
            color: "white",
          },
          "& .MuiButtonBase-root": {
            color: "white",
          },
          "& .MuiTypography-root": {
            color: "white",
          }
        },
      },
    },
  },
});

export {
  lightTheme,
  darkTheme
};
