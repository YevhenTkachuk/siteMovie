import React from "react"


class PlussPage extends React.Component {
    
    render(){
        const {pages , updatePlussPage} = this.props;

        const handleClick = (value) => {
            return(event) => {
              updatePlussPage(value);
            }
          }
x`
  return(
    <div><buttton type="button" className="btn btn-success" onClick={handleClick(5)}>goToSecondList</buttton></div>
  )


    }
}

export default PlussPage;