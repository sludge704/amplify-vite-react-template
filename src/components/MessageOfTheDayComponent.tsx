import React from 'react';
import { useGetMessageOfTheDayQuery } from '../store/messageOfTheDayApi';

export const MessageOfTheDayComponent: React.FC = () => {
  const { data: message, error, isLoading, refetch } = useGetMessageOfTheDayQuery();

  if (isLoading) return <div>Loading message of the day...</div>;
  
  if (error) {
    return (
      <div>
        <p>Error loading message of the day</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px 0', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>💭 Message of the Day</h3>
      {message && (
        <>
          <blockquote style={{ fontSize: '18px', fontStyle: 'italic', margin: '10px 0' }}>
            "{message.message}"
          </blockquote>
          {message.author && (
            <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
              — {message.author}
            </p>
          )}
          <p style={{ fontSize: '12px', color: '#666' }}>
            Date: {message.date}
          </p>
          <button 
            onClick={() => refetch()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Get New Message
          </button>
        </>
      )}
    </div>
  );
};