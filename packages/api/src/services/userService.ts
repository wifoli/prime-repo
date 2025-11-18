import { createResource } from '../client/resource';
import { axiosInstance } from '../client/axios';
import { User, CreateUserDto, UpdateUserDto } from '../types';

// Create user resource with custom methods
export const userService = createResource<User>(
  '/users',
  {
    // Custom method: Activate user
    activate: async (id: string): Promise<User> => {
      const response = await axiosInstance.put<User>(`/users/${id}/activate`);
      return response.data;
    },

    // Custom method: Deactivate user
    deactivate: async (id: string): Promise<User> => {
      const response = await axiosInstance.put<User>(`/users/${id}/deactivate`);
      return response.data;
    },

    // Custom method: Send email to user
    sendEmail: async (id: string, emailData: { subject: string; body: string }): Promise<void> => {
      await axiosInstance.post(`/users/${id}/send-email`, emailData);
    },

    // Custom method: Get user statistics
    getStatistics: async (id: string): Promise<{ totalPosts: number; totalComments: number }> => {
      const response = await axiosInstance.get(`/users/${id}/statistics`);
      return response.data;
    },

    // Custom method: Search users
    search: async (query: string): Promise<User[]> => {
      const response = await axiosInstance.get<User[]>('/users/search', {
        params: { q: query }
      });
      return response.data;
    },

    // Custom method: Bulk delete
    bulkDelete: async (ids: string[]): Promise<void> => {
      await axiosInstance.post('/users/bulk-delete', { ids });
    }
  },
  {
    loadingKey: 'users',
    trackLoading: true
  }
);

// Usage examples (for documentation):
/*
// REST methods (automatic)
const users = await userService.list();
const user = await userService.get('123');
const newUser = await userService.create({ name: 'John', email: 'john@example.com', password: '123' });
const updated = await userService.update('123', { name: 'Jane' });
await userService.delete('123');

// Custom methods
await userService.activate('123');
await userService.deactivate('123');
await userService.sendEmail('123', { subject: 'Hi', body: 'Hello!' });
const stats = await userService.getStatistics('123');
const results = await userService.search('john');
await userService.bulkDelete(['1', '2', '3']);
*/
