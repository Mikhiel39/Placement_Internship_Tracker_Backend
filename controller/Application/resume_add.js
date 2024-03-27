const makeAddResume = ({ addResumeToApp }) => {
    return async function addResume(httpRequest) {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        // Add resume and send response
        console.log(httpRequest.body);
        const response = await addResumeToApp({ data: httpRequest.body });
  
        return {
          headers,
          statusCode: 200,
          body: {
            statusCode: 200,
            message: "Resume added successfully",
            data: {id: response._id},
          },
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
  
  module.exports = makeAddResume;
  