export default function LandingPageContainer({ children }: any) {
   return (<div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        position: "relative"
      }}
    >{children}</div>)
}