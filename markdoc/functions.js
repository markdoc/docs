export const upper = {
  render(parameters) {
    const string = parameters['0'];

    return typeof string === 'string' ? string.toUpperCase() : string;
  }
};
