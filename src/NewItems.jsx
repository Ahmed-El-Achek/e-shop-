import React, { Component } from "react";
class NewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      images: [],
      categories: "items",
      addToItems: null
    };
  }


  handleChange = (event, name) => {
    if (name === 'images') {
      let image = event.target.files
      let newImages = []
      for (let i = 0; i < image.length; i++) {
        let img = image[i]
        let imgName = '/upload/' + img.name
        newImages.push(imgName)
      }
      this.setState({
        [name]: newImages
      })
    } else {
      this.setState({
        [name]: event.target.value
      })
    }
  }

  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("descrpition", this.state.description);
    data.append("price", this.state.price);
    data.append("images", this.state.images);
    data.append("categories", this.state.categories);
    let response = await fetch("/newItem", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    let responseBody = await response.text();
    console.log("responseBody form signup", responseBody);
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ addToItems: false });
      return;
    }
    console.log("parsed body", body);
    this.setState({ addToItems: true });
  };

  render = () => {
    if (this.state.addToItems === true) {
      return (
        <div>
          <h2>Add to Items success!</h2>
        </div>
      );
    } else if (this.state.addToItems === false) {
      return (
        <div>
          <h2> Please try again!</h2>
        </div>
      );
    } else {
      return (
        <div>
          <form id="newItem" enctype="multipart/form-data" >
            {/* onSubmit={this.submitHandler}> */}
            <h3>Title</h3>
            <input type="text" onChange={(e) => this.handleChange(e, 'title')} />
            <h3>Description </h3>
            <input type="text" onChange={(e) => this.handleChange(e, 'description')} />
            <h3>Price</h3>
            <input type="number" min="0" onChange={(e) => this.handleChange(e, 'price')} />
            <h3>Choose Images</h3>
            <input type="file" name="images" onChange={(e) => this.handleChange(e, 'images')} multiple="multiple" />
            <h3>Select Categories</h3>
            <select name="categerylist" form="newItem" onChange={(e) => this.handleChange(e, 'categories')}>
              <option value="Mens">Items</option>
              <option value="Womens">Womens</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
            <div>
              <input type="submit" value="Add to Items" onClick={this.submitHandler} />
            </div>
          </form >
        </div >
      );
    }
  };
}
export default NewItems