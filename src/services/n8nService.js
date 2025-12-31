import axios from 'axios';

const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL;

// Envoyer les données de commande à n8n
export const sendOrderToN8n = async (orderData) => {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, {
      orderId: orderData.id,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      total: orderData.total,
      items: orderData.items,
      createdAt: orderData.createdAt,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi à n8n:', error);
    throw error;
  }
};