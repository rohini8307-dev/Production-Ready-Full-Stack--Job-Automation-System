import { useState } from 'react';

export function useBucket() {
  const [items, setItems] = useState([201, 202]);
  return { items, setItems };
}
