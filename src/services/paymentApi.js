import { conf } from '../conf/conf';
import { apiProcessor } from './apiProcessor';

const payment_end_point = conf.baseUrl + '/api/v1/payment';


export const checkoutSessionApi = async () => {
  try {
    const res = await apiProcessor({
      method: 'POST',
      url: payment_end_point + '/create-checkout-session',
      isPrivate: true,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
