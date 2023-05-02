import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import SignIN from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import EditInfo from './components/EditInfo/EditInfo';
import './App.css';


const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signIn',
  isSignedIn:false,
  update:false,
  user:{
    id: "",
    name: '',
    email:"",
    entries: 0,
   joined:''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state=initialState;
  }
 

  loadUser=(data)=>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})

  }
  faceSideDetermination= (res)=>{
    const response=res.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('imageHead');
    const width= Number(image.width);
    const height= Number(image.height);
    return({
      leftCol:response.left_col *width,
      topRow :response.top_row * height,
      rightCol: width - (response.right_col*width),
      bottomRow: height - (response.bottom_row*height)
    }
    )
  }

displayFace=(row)=>{
  this.setState({box: row})
 
}
  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  };

  onButtonClick=()=>{
    this.setState({imageUrl: this.state.input})
    fetch("https://myapp-back-qhb6.onrender.com/image",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
      input:this.state.input
    })
  }).then(response=>response.json())
    .then(response=>{
      console.log(response, 'test')
      if (response){
        fetch("https://myapp-back-qhb6.onrender.com/image",{
          method:"put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response=>response.json()).then(re=>console.log(re))
        .then(count=>{
          this.setState(Object.assign(this.state.user,  { entries:count }))
          })
      }
      this.displayFace(this.faceSideDetermination(response))
    })
      .catch(err=>{
        console.log(err, 'this is an issue')
      })
    }
    onRouteChange=(route)=>{
      if (route==='signout'){
        this.setState(initialState)
      }else if (route=== 'home'){
        this.setState({isSignedIn:true})
      }else if (route==='update'){
        this.setState({update:true})
      }
      this.setState({route:route})
    }
  render(){
    return(
      <div className='App'>
        <ParticlesBg className="particles" type="circle" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route=== 'home'?
        <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        
        </div>
        :(
          this.state.route==='signIn'?
        <SignIN loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        :this.state.route==='update'? 
        <EditInfo id={this.state.user.id} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

        )
  }
        </div>
        )
  }}

export default App;
