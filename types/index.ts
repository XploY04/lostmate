export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  contact: string;
  image: string;
  status: 'active' | 'claimed';
  userId: string; // Mock user who posted it
}

export interface User {
  id: string;
  name: string;
  email: string;
}
