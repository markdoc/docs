import { SideBySide } from '../../components/SideBySide';

export default {
  render: SideBySide,
  attributes: {
    appearance: { type: String, matches: ['none', 'box'], default: 'box' }
  }
};
