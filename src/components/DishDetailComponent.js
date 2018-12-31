import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col, FormFeedback  } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
      super(props);

      this.state={
        isModalOpen:false,
        rating:'',
        author:'',
        comment:'',
        touched:{
          author: false
        }
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleInputChange(event){
      const target = event.target;
      const value = target.value ==='checkbox'? target.checked : target.value;
      const name = target.name;
      this.setState(
          {[name]:value}
      );
    }

    handleBlur=(field)=>(evt)=>{
      this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }
    
    handleSubmit(values){
      //console.log('Current State is ' + JSON.stringify(values));
      //alert('Current State is: ' + JSON.stringify(values));
    }

    render(){


      return (
        <React.Fragment>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>  Submit Comment</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="Rating" md={2}>Rating</Label>
                    <Col md={10}>
                      <Control.select model=".rating" id="rating" name="rating" className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="author" md={2}>Your Name</Label>
                    <Col md={10}>
                      <Control.text model=".author" id="author" name="author"
                          placeholder="Your Name"
                          className="form-control"
                          validators={{
                            minLength:minLength(3) , maxLength: maxLength(15)
                          }}           
                      /> 
                      <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                          minLength: 'Must be greater than 3 characters',
                          maxLength: 'Must be 15 characters or less'
                        }}
                      />         
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comment" md={2}>Comment</Label>
                    <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                      className="form-control" rows={6}/>
                    </Col>
                </Row>
                <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
          </React.Fragment>
      );
    }
}

function RenderDish({dish}){
  if(dish!=null)
    return (
      <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
    );
    else return (<div></div>);
}

function RenderComments({comments}){
  if(comments!=null){
    const commentList = comments.map((selectedComment)=>{
      return(
        <li className="list-unstyled" key={selectedComment.id} >
          <p>{selectedComment.comment}</p>
          <p>-- {selectedComment.author},
              {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', date:'2-digit'}).format(new Date(Date.parse(selectedComment.date)))}
          </p>
        </li>
      );
    });

    return(
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {commentList}
        </ul>
      </div>
    );
  } else return(<div></div>);
}

const DishDetail= (props)=>{
  if(props.dish!=null)
    {console.log(props.comments);
    return(
      <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>                
      </div>
      <div className="row">
          <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
              <CommentForm />
          </div>
      </div>
      </div>
      
    );
    }
  else return (<div></div>);
}

export default DishDetail;
