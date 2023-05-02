import React, {Component} from "react";
class EditInfo extends Component{
    constructor(props){
        super(props);
        this.state={
          name:'',
          password:'',
          email:''
        }
    }
    userId=this.props.id
    onNameChange=(event)=>{
        this.setState({name:event.target.value})
      }
      onEmailChange=(event)=>{
        this.setState({email:event.target.value})
      }
      onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
      }

      onSubmitUPdate= async (e)=>{
        e.preventDefault()
        await fetch(`https://myapp-back-qhb6.onrender.com/update/${this.userId}`, {
          method:"put",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
          })
        }).then(responses=> responses.json())
        .then(data=>{
          if (data.id){
            this.props.loadUser(data);
            this.props.onRouteChange('home')
          }
        })
      }
    render(){
        return(
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f5 fw6 ph0 mh0">Update</legend>
                    <div className="mt3">
                       <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                       <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="Name"  id="Name"/>
                   </div>
                   <div className="mt3">
                       <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                       <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                   </div>
                   <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
      </fieldset>
      <div className="">
        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        type="submit" value="Update"
        onClick={this.onSubmitUPdate}/>
      </div>
    </form>
  </main>
  </article>
        )
    }
}
export default EditInfo;