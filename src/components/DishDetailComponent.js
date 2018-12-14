import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, FormFeedback  } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';


class CommentForm extends Component{
    render(){
      return (
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback</h3>
          </div>
         <div className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
            </Row>
          </LocalForm>
        </div>
        </div>
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
  const dish = props.dish;
  if(dish!=null)
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
          </div>
      </div>
      </div>
    );
  else return (<div></div>);
}

export default DishDetail;
