export default function LandingPageMainContentContainer({ children}: any) {
    return (
        <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
        >{children}</div>
    )
}