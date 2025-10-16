import React, { useState } from 'react';
import {
  useLazyGetMessageOfTheDayQuery,
  useCreateMessageOfTheDayMutation,
  useLazyGetHealthCheckQuery,
  MessageOfTheDay,
} from '../store/messageOfTheDayApi';

export const ApiDemo: React.FC = () => {
  const [newContent, setNewContent] = useState('');
  const [createdMessage, setCreatedMessage] = useState<MessageOfTheDay | null>(
    null
  );
  const [showHealthData, setShowHealthData] = useState(false);
  const [showMessageData, setShowMessageData] = useState(false);

  // Lazy Query hooks
  const [
    getMessageOfTheDay,
    { data: messageData, error: messageError, isLoading: messageLoading },
  ] = useLazyGetMessageOfTheDayQuery();

  const [
    getHealthCheck,
    { data: healthData, error: healthError, isLoading: healthLoading },
  ] = useLazyGetHealthCheckQuery();

  // Mutation hook
  const [createMessage, { isLoading: createLoading, error: createError }] =
    useCreateMessageOfTheDayMutation();

  const handleCreateMessage = async () => {
    if (newContent.trim()) {
      try {
        const result = await createMessage(newContent).unwrap();
        setCreatedMessage(result);
        setNewContent('');
        // Optionally refetch the message list
        getMessageOfTheDay();
        setShowMessageData(true);
      } catch (error) {
        console.error('Failed to create message:', error);
        setCreatedMessage(null);
      }
    }
  };

  const handleHealthCheck = () => {
    getHealthCheck();
    setShowHealthData(true);
  };

  const handleGetMessage = () => {
    getMessageOfTheDay();
    setShowMessageData(true);
  };

  const clearHealthData = () => {
    setShowHealthData(false);
  };

  const clearMessageData = () => {
    setShowMessageData(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Amplify/API Gateway Demo - Three Endpoints</h2>

      {/* Health Check Section */}
      <div
        style={{
          marginBottom: '30px',
          padding: '15px',
          border: '1px solid #4CAF50',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h3>🏥 Health Check - GET /health</h3>
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={handleHealthCheck}
            disabled={healthLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            {healthLoading ? 'Checking...' : 'Check Health'}
          </button>
          {showHealthData && healthData && (
            <button
              onClick={clearHealthData}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {healthError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Error: {JSON.stringify(healthError)}
          </div>
        )}

        {showHealthData && healthData && (
          <div style={{ marginTop: '10px', fontFamily: 'monospace' }}>
            <strong>Status:</strong> {healthData.status}
            <br />
            <strong>Timestamp:</strong> {healthData.timestamp}
          </div>
        )}
      </div>

      {/* Get Message Section */}
      <div
        style={{
          marginBottom: '30px',
          padding: '15px',
          border: '1px solid #2196F3',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h3>📖 Get Message - GET /api/messageoftheday</h3>
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={handleGetMessage}
            disabled={messageLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            {messageLoading ? 'Loading...' : 'Get Message'}
          </button>
          {showMessageData && messageData && (
            <button
              onClick={clearMessageData}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {messageError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Error: {JSON.stringify(messageError)}
          </div>
        )}

        {showMessageData && messageData && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '4px',
            }}
          >
            <blockquote
              style={{
                fontSize: '16px',
                fontStyle: 'italic',
                margin: '0 0 10px 0',
              }}
            >
              "{messageData.content}"
            </blockquote>
            {messageData.userId && (
              <p
                style={{ textAlign: 'right', fontWeight: 'bold', margin: '0' }}
              >
                — User: {messageData.userId}
              </p>
            )}
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              ID: {messageData.id} | Created:{' '}
              {new Date(messageData.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Create Message Section */}
      <div
        style={{
          marginBottom: '30px',
          padding: '15px',
          border: '1px solid #FF9800',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h3>✍️ Create Message - POST /api/messageoftheday</h3>

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Message *
          </label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter your inspiring message..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={handleCreateMessage}
          disabled={createLoading || !newContent.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: newContent.trim() ? '#FF9800' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: newContent.trim() ? 'pointer' : 'not-allowed',
            fontSize: '14px',
          }}
        >
          {createLoading ? 'Creating...' : 'Create Message'}
        </button>

        {createError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Error: {JSON.stringify(createError)}
          </div>
        )}

        {/* Display successful creation response */}
        {createdMessage && (
          <div
            style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '4px',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              ✅ Message Created Successfully!
            </h4>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              <blockquote
                style={{
                  fontSize: '16px',
                  fontStyle: 'italic',
                  margin: '0 0 10px 0',
                  fontFamily: 'inherit',
                }}
              >
                "{createdMessage.content}"
              </blockquote>
              <div style={{ fontSize: '12px', color: '#666' }}>
                <strong>ID:</strong> {createdMessage.id} |{' '}
                <strong>User ID:</strong> {createdMessage.userId} |{' '}
                <strong>Created:</strong>{' '}
                {new Date(createdMessage.createdAt).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setCreatedMessage(null)}
              style={{
                marginTop: '10px',
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
