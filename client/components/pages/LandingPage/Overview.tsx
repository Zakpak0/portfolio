export default function LandingPageOverview() {
    return (
        <div
            style={{
                position: "sticky",
                top: 20,
                display: "flex",
                flexDirection: "column",
                height: 800,
                width: "20%",
                padding: 20,
                margin: 10,
                border: "1px solid rgba(1, 128, 0, 0.5)",
                borderRadius: "10px",
            }}
        >
            <div
                className='font-bold text-2xl'
                style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex"
                }}>
                <h3>
                    Overview
                </h3>
            </div>
            <div
                style={{
                    marginBottom: 5
                }}
            >
                <h4
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        padding: 10
                    }}
                >Biography</h4>
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                    }}
                >Diverse Software Engineer cultured in the agile process with a strong command of in demand skill sets.
                    Contributed ideas and solutions that consistently impressed seniors by combining their critique with initiative
                    and knowledge to create polished final products. Created internal and external tools using web programming
                    technologies such as Javascript, React, HTML/HTML5, CSS/CSS3, Node.js, JSON and Mongodb. Cracked
                    challenging problems for seniors by analysing and applying documentation to live code. Has been instrumental
                    in identifying requirements and meeting production standards of code implementation, documentation and
                    demonstration.</p>
            </div>
            <div
                style={{
                    marginBottom: 5
                }}
            >
                <h4
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        padding: 10
                    }}
                >What I'm Looking for in an Employer</h4>
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                    }}
                >
                    I'm looking for an employer that will allow me to grow along with the company's oppertunities.
                    I'm never afraid of change, in fact, I welcome it. That's what drives my passion for coding.
                    My ideal employer would be encouraging me to take new courses and learn new tools.
                </p>
            </div>
            <div
                style={{
                    marginBottom: 5
                }}
            >
                <h4
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        padding: 10
                    }}
                >Where I see myself in 5 years</h4>
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                    }}
                >
                    I want my skills to grow with me. 5 years from now I can see myself coding a lot more than stylish websites.
                    I want to learn languages like Go, C, C++ and Solidity so that I make enter different markets. My impact in the
                    development field should extend far beyond web developement.
                </p>
            </div>
            <div
                style={{
                    marginTop: "auto",
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    padding: 5
                }}
            >
                <h4
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "18px",
                        marginBottom: 5,
                        marginRight: "auto"
                    }}
                >Email Address</h4>
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                    }}
                >
                    ZakharyOliver808@gmail.com
                </p>
            </div>
        </div>
    )
}
