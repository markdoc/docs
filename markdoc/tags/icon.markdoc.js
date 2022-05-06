import { Icon } from '../../components/Icon';

export default {
  render: Icon,
  attributes: {
    icon: {
      type: String,
      description:
        'Name of the icon being used. See https://ionic.io/ionicons for icon names.',
      required: true
    },
    color: {
      type: String
    }
  }
};
