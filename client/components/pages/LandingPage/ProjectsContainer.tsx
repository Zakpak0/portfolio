export default function LandingPageProjectsContainer({children}: any) {
   return( <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
      margin: 10,
      marginTop: 0,
      boxSizing: "border-box",
      backgroundColor: "whitesmoke",
      boxShadow: "0px 8.76px 26.28px rgba(31, 31, 51, 0.06)",
    }}
    >{children }</div>)
}