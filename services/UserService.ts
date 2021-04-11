import axios, { AxiosResponse } from "axios";

/**
 * services/UserService
 * ----------------------------------------------------------------------
 * Fornece utilidades para solicitar dados da API de usuários.
 * 
 * @since 0.2.0
 */

/**
 * URL raíz para request.
 */
const USER_REQUEST_URL = "https://reqres.in/api/users";

/**
 * Carrega os dados de um único usuário.
 * 
 * @param userId 
 */
export const GetUser = async (userId: string|number): Promise<any> => {
  let request: AxiosResponse<any> = await axios.get(
    `${USER_REQUEST_URL}/${userId}`
  );
  
  if (request.status === 200) {
    return request.data.data;
  } else {
    return false;
  }
};

/**
 * Carrega dados de página com informações de usuários.
 * 
 * @param page 
 * @param perPage 
 */
export const GetUserPage = async (
  page: string|number = 1, 
  perPage: string|number = 3
): Promise<any> => {
  let params: URLSearchParams = new URLSearchParams();
  params.set("page", (page && page > 0) ? `${page}` : `1`);
  params.set("per_page", (perPage && perPage > 0) ? `${perPage}` : `3`);
  
  let request: AxiosResponse<any> = await axios.get(
    `${USER_REQUEST_URL}?${params.toString()}`
  );
  
  if (request.status === 200) {
    return {
      pageId: page,
      totalPages: request.data.total_pages,
      users: request.data.data
    };
  } else {
    return {
      pageId: page,
      totalPages: 0,
      users: []
    };
  }
};
