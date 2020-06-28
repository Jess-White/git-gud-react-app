import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;


// import React, { Component } from 'react';
// import axios from 'axios';

// class Dashboard extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       resources: []
//     }
//   }
//   componentDidMount() {
//     axios.get('http://localhost:3001/api/resources')
//     .then(response => {
//       console.log(response)
//       this.setState({resources: response.data})
//     })
//     .catch(error => console.log(error))
//   }
//   render() {
//     return (
//       <div>
//         <container style={{margin: 40, textAlign: "center"}}>
//           <div className="container resource">
//             {this.state.resources.map((resource) => {
//               return(
//                 <div style={{ margin: 40}} className="tile resource" key={resource.id} >
//                   <h2 className="top">{resource.name}</h2>
//                   <img style={{height: 700 , width: 800}} src={"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"} alt=""/>
//                   <h2 className="bottom">{resource.difficulty}</h2>
//                 </div>
//               )       
//             })}
//           </div>
//         </container>
//       </div>
//     )
//   }
// }

// export default Dashboard;