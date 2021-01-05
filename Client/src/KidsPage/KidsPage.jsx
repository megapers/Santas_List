import React from 'react';
import { userService, authenticationService } from '@/_services';
import DeleteDialog from '../_services/DeleteDialog'

class KidsPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {data: []};
      this.user = authenticationService.currentUserValue;
   }

   componentDidMount() {
   userService.getAll()
      .then((response) => {
         this.setState({ data: response });
      });
   }

   //Pass 
   handleChangeValue = e => this.setState({data: e});

   renderTableData() {
      return this.state.data.map((kid, index) => {
         const delButton = <DeleteDialog 
            userData = {kid} 
            buttonText = {""} 
            buttonSize = {"small"} 
            kidIndex = {index}
            kids={this.state.data}
            onChangeValue={this.handleChangeValue}
         />;

         const {id, username, firstName, lastName, isNaughty } = kid //destructuring
         if(kid.id != this.user.id){
            return (
               <tr key={id} onClick={() => { this.props.history.push({
                  pathname: '/editUser',
                  state : id 
                  })}}>
                  <td>{id}</td>
                  <td>{username}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>
                     <input
                        type="checkbox"
                        defaultChecked={kid.isNaughty}
                        onChange={
                           () =>{
                              kid.isNaughty = !kid.isNaughty;
                              userService.updateNaughty(kid);
                           }
                        }
                        onClick={(e) => e.stopPropagation()}
                     />
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                     {delButton} 
                  </td>
               </tr>
            )
         }
      });
   }
     
   renderTableHeader() {
      if (!this.state.data === undefined || !this.state.data.length == 0){
      let header = Object.keys(this.state.data[0]);
         return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         });
      }
   }
    
   render() {
      return (
         <div className="row">
            <div className="col">
               <h3 id='title'>List of kids</h3>
               <table id='kids'>
                  <tbody>
                  <tr>
                     <th>Id</th>
                     <th>UserName</th>
                     <th>FirstName</th>
                     <th>LastName</th>
                     <th>Is naughty?</th>
                     <th>Remove kid?</th>
                  </tr>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
         </div>

      );
   }
}

export { KidsPage };