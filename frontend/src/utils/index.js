export function formatCurrency(amount) {
  return `₹${amount} LPA`;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
