import React from 'react';
// @ts-ignore
import {Container, Spinner, Alert} from 'reactstrap';
import sessionRequest from "sessionRequest";

import Select from './Select';

type TallyCounterUIProps = {}

class NavBar extends React.Component {
  render() {
    return <nav className="navbar navbar-dark bg-primary mb-2">
      <div className="w-25">
        <i className="material-icons bg-light text-primary rounded-circle p-1">calculate
        </i>
      </div>
      <div className="w-50 text-light text-center">
        <h5 className="mb-0">FVH Tally Counter</h5>
        <span className="small">Where every action counts</span>
      </div>
      <div className="w-25 d-flex justify-content-end">
        <img style={{maxHeight: 48, marginRight: -16}} src="images/FORUM_VIRIUM_logo_white.png"/>
      </div>
    </nav>;
  }
}

type State = {
  status: 'loading' | 'error' | 'ready',
  subjects?: any[],
  selectedSubjectId?: any
};

export default class TallyCounterUI extends React.Component<TallyCounterUIProps> {
  state: State = {status: 'loading'};

  componentDidMount() {
    this.loadSubjects();
  }

  loadSubjects() {
    sessionRequest('/api/tally_subjects/').then(response => {
      if (response.status >= 400) this.setState({status: 'error'});
      else response.json().then(subjects =>
        this.setState({
          status: 'ready', subjects,
          selectedSubjectId: this.state.selectedSubjectId || subjects[0].id}))
    }).catch(e => this.setState({status: 'error'}))
  }

  render() {
    const {status, subjects, selectedSubjectId} = this.state;
    const subject = this.getSubject();

    return <>
      <NavBar/>
      <Container>
        {status == 'error' && <Alert color="danger">Counter request failed. Reload maybe?</Alert>}
        {(status == 'loading') && <div className="m-4 text-center"><Spinner/></div>}
        {subjects &&
          <Select options={subjects.map(s => ({value: s.id, label: s.name}))} default={selectedSubjectId}
                  onSelect={(selectedSubjectId) => this.setState({selectedSubjectId})} />
        }
        {subject && <div className="flex-fill d-flex mt-4">
          <button className="btn btn-secondary m-2 flex-grow-1" onClick={this.decrease}>-</button>
          <h2 className="d-inline-block m-4">{subject.count}</h2>
          <button className="btn btn-primary m-2 flex-grow-1" onClick={this.increase}>+</button>
        </div>}
      </Container>
    </>;
  }

  getSubject() {
    const {subjects, selectedSubjectId} = this.state;
    return subjects && selectedSubjectId && subjects.find(s => s.id == selectedSubjectId);
  }

  decrease = () => this.changeCounter(-1);
  increase = () => this.changeCounter(1);

  changeCounter(increment: number) {
    const subject = this.getSubject();
    sessionRequest(`/api/tally_subjects/${subject.id}/count/`,
      {method: 'PUT', data: {count: subject.count + increment}})
      .then(response => {
        if (response.status >= 400) this.setState({status: 'error'});
        else this.loadSubjects()
      })
  }
}
