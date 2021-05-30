import React from 'react';
import API from '../API';

export default function container(Component) {
  return class ChoiceContainer extends React.Component {
    // the default state
    state = {
      choice: {},
    };

    // Get the choice by id from the API
    fetchChoice = async (id) => {
      // get the details of the choice
      const choice = await API.get(`/choices/${id}`);
      this.setState({ choice });
    };

    // Checks for a choice id, updates current choice if there is one,
    // otherwise creates a new choice
    saveChoice = async (choice) => {
      if (choice.id) {
        return API.put(`/choices/${choice.id}`, choice);
      }
      return API.post('/choices', choice);
    };

    // Deletes a choice by id
    deleteChoice = async (id) => {
      await API.delete(`/choices/${id}`);
    };

    render() {
      const { choice } = this.state;

      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          choice={choice}
          fetchChoice={this.fetchChoice}
          saveChoice={this.saveChoice}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };
}
