import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../presentational/Input';
import Service from '../../services/service';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seoTitle: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static setState() {
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seoTitle } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seoTitle}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}


// Service.getData('https://api.mcmakler.de/v1/advertisements').then((data) => {
//   console.log(data.data.slice(0, 10));
// });


// const wrapper = document.getElementById('create-article-form');
// if (wrapper) ReactDOM.render(<FormContainer />, wrapper);

// export default FormContainer;
