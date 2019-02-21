import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import "./App.css";

class App extends Component {
  state = {
    input: {
      firstName: "",
      lastName: "",
      score: 0
    },
    data: [
      {
        firstName: "Geary",
        lastName: "Alice",
        score: 96
      },
      {
        firstName: "Junge",
        lastName: "John",
        score: 96
      },
      {
        firstName: "Vera",
        lastName: "Rob",
        score: 88
      }
    ]
  };

  onInputChange = inputName => e => {
    this.setState({
      input: {
        ...this.state.input,
        [inputName]: e.target.value
      }
    });
  };

  onAdd = e => {
    e.preventDefault();
    const { input } = this.state;

    if (input.firstName !== "" && input.lastName !== "" && input.score !== "") {
      this.setState(
        {
          data: this.state.data.concat(input)
        },
        () => {
          this.resetAddForm();
        }
      );
    } else {
      alert("Please input all fields");
    }
  };

  resetAddForm = () => {
    this.setState({
      input: {
        firstName: "",
        lastName: "",
        score: 0
      }
    });
  };

  onDelete = index => {
    this.setState(prevState => {
      prevState.data.splice(index, 1);
      return {
        data: prevState.data
      };
    });
  };

  render() {
    const { data, input } = this.state;
    const columns = [
      {
        Header: "Name",
        accessor: "lastName",
        Cell: props => (
          <span>
            {props.value}
            &nbsp;
            {props.original.firstName}
          </span>
        )
      },
      {
        Header: "Score",
        accessor: "score"
      },
      {
        Header: "",
        Cell: props => (
          <button onClick={() => this.onDelete(props.index)}>Delete</button>
        )
      }
    ];

    return (
      <div className="App">
        <header className="App-content">
          <p>Table</p>
          <form onSubmit={this.onAdd}>
            <input
              type="text"
              placeholder="First Name"
              value={input.firstName}
              onChange={this.onInputChange("firstName")}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={input.lastName}
              onChange={this.onInputChange("lastName")}
            />
            <input
              type="number"
              placeholder="Score"
              value={input.score}
              onChange={this.onInputChange("score")}
              min="0"
              max="100"
            />
            <button type="submit">Add</button>
          </form>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            defaultSorted={[
              {
                id: "score",
                desc: true
              },
              {
                id: "lastName",
                desc: false
              }
            ]}
          />
        </header>
      </div>
    );
  }
}

export default App;
