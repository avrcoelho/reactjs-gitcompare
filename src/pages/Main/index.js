import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  async componentDidMount() {
    let storageRepositoties = await localStorage.getItem('reactjs:andre');

    storageRepositoties = storageRepositoties ? JSON.parse(storageRepositoties) : [];

    this.setState({
      repositories: storageRepositoties
    });
  }

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      // melhor local de fazer a fomatação é antes de renderizar
      // faz a formatação da data
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const { repositories } = this.state;

      const findRepository = repositories.find(repo => repo.id === repository.id);

      if (findRepository) {

        this.handleUpdateRepositoty(findRepository.id)

      } else {
        // não pode usar push para adicionar elemento no state, pois ele é imutavel
        this.setState({
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
          repositoryInput: ''
        });

        let storageRepositoties = await localStorage.getItem('reactjs:andre');

        storageRepositoties = storageRepositoties ? JSON.parse(storageRepositoties) : [];

        storageRepositoties = [...storageRepositoties, repository];

        await localStorage.setItem('reactjs:andre', JSON.stringify(storageRepositoties));
      }
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleUpdateRepositoty = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('reactjs:andre', JSON.stringify(repositories)); 

    } catch (err) {
      this.setState({ repositoryError: true });
    }
  }

  handleRemoveRepositoty = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repo => repo.id !== id)

    this.setState({
      repositories: updatedRepositories
    });

    await localStorage.setItem('reactjs:andre', JSON.stringify(updatedRepositories)); 
  }

  render() {
    return (
      <Container>
        <img src={logo} alt="Github compare" />

        <Form error={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            placeholder="Usuário / Repositório"
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Buscar'}
          </button>
        </Form>

        <CompareList update={this.handleUpdateRepositoty} remove={this.handleRemoveRepositoty} repositories={this.state.repositories} />
      </Container>
    );
  }
}
