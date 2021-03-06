import React, { ChangeEvent } from "react"


type PropsType = {
  status:  string
  updateStatus:(status: string) => void
}

type StateType = {
  editMode: boolean
  status:  string
}

class ProfileStatus extends React.Component<PropsType,StateType> {
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
    onChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status:e.target.value
        })
    }
    componentDidUpdate(prevProps: PropsType,prevState: StateType) {
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
