const makeAdminDashboard = ({adminDashboardToApp }) => {
    return async function adminDashboard(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add user and send response
        const response = await adminDashboardToApp();
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: 'Dashboard Details Fetched...',
            data: response
        }
        };
      } catch (e) {
        return {
          headers,
          statusCode: 400,
          body: {
            statusCode: 400,
            error: e.message,
          },
        };
      }
    };
  };
  
  module.exports = makeAdminDashboard;
  