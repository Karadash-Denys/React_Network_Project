import React from "react";
// import s from "../profile.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  disactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
      this.props.updateStatus(this.state.status)
    };
    onChangeStatus = (e) => {
        this.setState({
            status:e.target.value
        })
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status:this.props.status
            })
        }
    }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || '----'}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
                        autoFocus={true}
                        onChange={this.onChangeStatus}
              onBlur={this.disactivateEditMode}
              value={this.state.status }
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
