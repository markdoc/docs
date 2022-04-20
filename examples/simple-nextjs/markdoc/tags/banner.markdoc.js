import { Banner } from '../../components/Banner';

export const banner = {
  render: Banner,
  attributes: {
    type: {
      type: String,
      required: true
    }
  }
};
