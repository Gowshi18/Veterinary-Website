import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); 
  const email = localStorage.getItem('email');// 'all', 'read', 'unread'

  useEffect(() => {
       const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/notifications', {
          params: { email }  // Pass the email as a query parameter
        });
        setNotifications(response.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [email]); 
  const markAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/notifications/mark-read/${id}`);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Failed to mark notification as read.');
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(n => 
          axios.post(`http://localhost:8080/api/notifications/mark-read/${n.id}`)
        )
      );
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError('Failed to mark all notifications as read.');
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'read') return notification.read;
    if (filter === 'unread') return !notification.read;
    return true; // 'all'
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">All Notifications</h2>
          <div className="d-flex gap-2">
            <div className="btn-group">
              <button 
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </button>
              <button 
                className={`btn btn-sm ${filter === 'read' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('read')}
              >
                Read
              </button>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="btn btn-sm btn-outline-success"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-5">
            <img
              src="/images/no-notifications.png"
              alt="No Notifications"
              style={{ width: '150px' }}
              className="mb-3"
            />
            <p className="text-muted">
              {filter === 'all' 
                ? 'There are no notifications' 
                : filter === 'read' 
                  ? 'No read notifications' 
                  : 'No unread notifications'}
            </p>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-10">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`card mb-3 shadow-sm ${notification.read ? 'bg-light' : 'bg-white border-primary'}`}
                >
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <p className={`mb-1 ${notification.read ? 'text-muted' : 'text-dark fw-bold'}`}>
                        {notification.message}
                      </p>
                      <div className="d-flex gap-3">
                        <small className="text-muted">
                          {new Date(notification.dateCreated).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                        <small className="text-muted">
                          {notification.email}
                        </small>
                      </div>
                    </div>
                    {!notification.read && (
                      <button
                        className="btn btn-sm btn-outline-primary ms-3"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;