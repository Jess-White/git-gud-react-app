import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

function Header() {
  return (
          <header>
          <div>
            <Jumbotron fluid style={{backgroundColor: "#00008b"}}>
              <Container fluid>
                <div className="row">
                  <img style={{margin: 20, marginLeft: 200}} src="https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F012%2F982%2F039.jpg" alt=""/>
                  <h1 style={{
                    marginLeft: 80, 
                    marginTop: 200, 
                    color: "#39ff14", 
                    fontWeight: "bold",
                    fontFamily: "courier",
                    fontStretch: "expanded",
                    fontSize: 150
                  }}className="display-1">Git Gud</h1>
                  <h2 style={{
                    margin: "auto", 
                    color: "#39ff14", 
                    fontWeight: "bold",
                    fontFamily: "courier",
                    fontStretch: "expanded",
                    fontSize: 50
                  }}>need slogan....</h2>
                </div>
              </Container>
            </Jumbotron>
          </div>
          </header>
    )
}

export default Header
