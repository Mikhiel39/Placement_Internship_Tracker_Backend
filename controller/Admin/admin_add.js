const makeAddAdmin = ({addAdminToApp }) => {
    return async function addAdmin(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add user and send response
        const response = await addAdminToApp({ data: httpRequest.body });
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: 'Admin successfully added...',
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
  
  module.exports = makeAddAdmin;
  