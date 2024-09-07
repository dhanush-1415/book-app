import { top20 } from "./config";


export const getToken = async () => {
    const url = `${top20.baseUrl}/api/Token/GenerateToken`;
    const credentials = {
      Username: 'admin',
      Password: 'admin54321',
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.Jwt_Token) {
          return data.Jwt_Token;
        } else {
          throw new Error('Token generation failed');
        }
      })
      .catch((error) => {
        console.error('Error fetching token:', error);
        throw error;
      });
  };
  


  
  export const getBannerData = async () => {

    const token = await getToken();
  
    const url = `${top20.baseUrl}/api/BannerImage/GetAll?OrganizationId=${top20.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };


  
  export const getBusinessCategoriesData = async (data) => {

    const token = await getToken();
  
    const url = `${top20.baseUrl}/api/BusinessCategory/GetAll?OrganizationId=${top20.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };


    
  export const getBusinessServiceData = async (data) => {

    const token = await getToken();
  
    const url = `${top20.baseUrl}/api/BusinessService/GetAll?OrganizationId=${top20.orgId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };


  export const getBusinessData = async (data) => {

    const token = await getToken();
    
    let url ;
  
    if(data.service){

      if(data.role === "service"){
        url = `${top20.baseUrl}/api/Top10Business/GetAll?OrganizationId=${top20.orgId}&Service=${data.service}`;
      }else{
        url = `${top20.baseUrl}/api/Top10Business/GetAll?OrganizationId=${top20.orgId}&BusinessCategory=${data.service}`;
      }

    }else{
       url = `${top20.baseUrl}/api/Top10Business/GetAll?OrganizationId=${top20.orgId}`;
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };



  export const getSpecialistData = async (data) => {

    const token = await getToken();
  
    let url ;
  
    if(data.service){
      if(data.role === "service"){
        url = `${top20.baseUrl}/api/Specialist/GetAll?OrganizationId=${top20.orgId}&Service=${data.service}`;
      }else{
        url = `${top20.baseUrl}/api/Specialist/GetAll?OrganizationId=${top20.orgId}&BusinessCategoryId=${data.service}`;
      }
    }else{
       url = `${top20.baseUrl}/api/Specialist/GetAll?OrganizationId=${top20.orgId}`;
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };


  export const getBusinessIdData = async (id) => {

    const token = await getToken();
  
    const url = `${top20.baseUrl}/api/Top10Business/GetBusinessByCode?OrganizationId=${top20.orgId}&BusinessId=${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };


  export const getSpecialistIdData = async (id) => {

    const token = await getToken();
  
    const url = `${top20.baseUrl}/api/Specialist/GetByCode?OrganizationId=${top20.orgId}&SpecialistId=${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  
    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching wishlist data:', error);
        throw error;
      });
  };



  
export const userRegistration = async (data) => {

  const token = await getToken();

  const url = `${top20.baseUrl}/api/MemberRegistration/Create`;


  const extendedData = {
    ...data,
    MemberId: "",
    FilePath: "string"
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,

    },
    body: JSON.stringify(extendedData),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching token:', error);
      throw error;
    });
};


export const userReview = async (data) => {

  const token = await getToken();

  const url = `${top20.baseUrl}/api/MemberReviewInfo/Create`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,

    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching token:', error);
      throw error;
    });
};



export const getreviewData = async (data) => {

  const token = await getToken();

  let url ;

  if(data.type === "business"){
     url = `${top20.baseUrl}/api/MemberReviewInfo/GetAll?OrganizationId=${top20.orgId}&BusinessId=${data.profile}`;
  }else{
     url = `${top20.baseUrl}/api/MemberReviewInfo/GetAll?OrganizationId=${top20.orgId}&SpecialistId=${data.profile}`;
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching wishlist data:', error);
      throw error;
    });
};




export const userLogin = async (data) => {

  const token = await getToken();

  const url = `${top20.baseUrl}/api/MemberRegistration/Login`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,

    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching token:', error);
      throw error;
    });
};


export const bookAppointment = async (data) => {

  const token = await getToken();

  const url = `${top20.baseUrl}/api/MemberRegistration/BookAppoinment`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,

    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching token:', error);
      throw error;
    });
};
